import { calculateRequest } from "@/lib/calculation";
import { formatCurrency, formatDecimal } from "@/lib/format";
import { APPS_SCRIPT_URL, OFFICIAL_TARIFF_SOURCE } from "@/lib/public-config";
import type { CalculationRequest } from "@/lib/types";

type EmailPayload = {
  email?: string;
  name?: string;
  calculation?: Partial<CalculationRequest>;
};

type Attempt = { count: number; resetAt: number };
type GlobalWithRateLimit = typeof globalThis & {
  tirateimaEmailAttempts?: Map<string, Attempt>;
};

const rateLimitStore = globalThis as GlobalWithRateLimit;
const attempts = rateLimitStore.tirateimaEmailAttempts || new Map<string, Attempt>();
rateLimitStore.tirateimaEmailAttempts = attempts;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validEmail(value: string) {
  return value.length <= 254 && /^[^\s@,]+@[^\s@,]+\.[^\s@,]+$/.test(value);
}

function checkRateLimit(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") || "unknown";
  const key = forwarded.split(",")[0].trim();
  const now = Date.now();
  const previous = attempts.get(key);

  if (!previous || previous.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return true;
  }

  if (previous.count >= 3) return false;
  previous.count += 1;
  return true;
}

export async function POST(request: Request) {
  if (!checkRateLimit(request)) {
    return Response.json(
      { error: "Limite de envios atingido. Tente novamente em 15 minutos." },
      { status: 429 },
    );
  }

  try {
    const secret = process.env.APPS_SCRIPT_SECRET;
    if (!secret) {
      throw new Error("O envio de e-mail ainda está sendo configurado.");
    }

    const body = (await request.json()) as EmailPayload;
    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "Cliente").trim().slice(0, 80) || "Cliente";

    if (!validEmail(email)) throw new Error("Informe um endereço de e-mail válido.");
    if (!body.calculation) throw new Error("Os dados da consulta não foram encontrados.");

    const { address, estimate, request: valid } = await calculateRequest(body.calculation);
    const addressNumber = valid.complement
      ? `${valid.number} — ${valid.complement}`
      : valid.number;
    const fullAddress = `${address.street}, ${addressNumber} · ${address.neighborhood}, ${address.city}/${address.state}`;
    const differenceText = estimate.differenceAmount === null
      ? "Não informado"
      : Math.abs(estimate.differenceAmount) < 0.01
        ? "Sem diferença"
        : `${formatCurrency(Math.abs(estimate.differenceAmount))} ${estimate.differenceAmount > 0 ? "acima" : "abaixo"}`;
    const readingText = valid.inputMode === "meter"
      && valid.previousReadingM3 !== null
      && valid.currentReadingM3 !== null
      ? `${valid.currentReadingM3} − ${valid.previousReadingM3} = ${formatDecimal(estimate.consumptionM3)} m³`
      : "Consumo informado diretamente";

    const textBody = [
      `Olá, ${name}!`,
      "",
      "Este é o resultado do seu Tira-Teima Cagece:",
      `Imóvel: ${fullAddress}`,
      `Tarifa aplicada: ${estimate.tariffName}`,
      `Leitura: ${readingText}`,
      `Consumo: ${formatDecimal(estimate.consumptionM3)} m³`,
      `Água (${formatDecimal(estimate.waterBilledM3)} m³ faturados): ${formatCurrency(estimate.waterAmount)}`,
      `Esgoto (${formatDecimal(estimate.sewerBilledM3)} m³ faturados): ${formatCurrency(estimate.sewerAmount)}`,
      `Total estimado: ${formatCurrency(estimate.estimatedTotal)}`,
      `Diferença: ${differenceText}`,
      "",
      "Esta é uma estimativa informativa e não substitui a análise oficial da Cagece.",
      `Fonte: ${OFFICIAL_TARIFF_SOURCE}`,
    ].join("\n");

    const htmlBody = `
      <div style="margin:0;background:#f3f8fb;padding:28px;font-family:Arial,sans-serif;color:#17324d">
        <div style="max-width:620px;margin:auto;background:white;border:1px solid #dce7ef;border-radius:18px;overflow:hidden">
          <div style="padding:24px 28px;background:linear-gradient(135deg,#075da8,#0d8fd2);color:white">
            <div style="font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">Tira-Teima Cagece</div>
            <h1 style="margin:8px 0 0;font-size:25px">Resultado da sua consulta</h1>
          </div>
          <div style="padding:28px">
            <p style="margin-top:0">Olá, <strong>${escapeHtml(name)}</strong>!</p>
            <p style="color:#5f7487;line-height:1.6">Confira abaixo a estimativa calculada com a tabela tarifária oficial vigente.</p>
            <div style="padding:14px 16px;border-left:4px solid #0877c9;background:#f5fafd;border-radius:8px">
              <div style="font-size:12px;color:#6b8091">Imóvel conferido</div>
              <strong style="font-size:14px">${escapeHtml(fullAddress)}</strong>
            </div>
            <div style="margin-top:12px;padding:12px 16px;background:#f7fbfe;border:1px solid #dce8ef;border-radius:8px">
              <div style="font-size:11px;color:#6b8091">Tarifa aplicada: <strong>${escapeHtml(estimate.tariffName)}</strong></div>
              <div style="margin-top:4px;font-size:11px;color:#42637b">Leitura: <strong>${escapeHtml(readingText)}</strong></div>
            </div>
            <div style="margin:20px 0;padding:22px;text-align:center;background:#eaf7ff;border-radius:14px">
              <div style="font-size:12px;color:#60798c">Total estimado</div>
              <div style="margin:5px 0;color:#075da8;font-size:34px;font-weight:800">${formatCurrency(estimate.estimatedTotal)}</div>
              <div style="font-size:11px;color:#6b8192">${formatDecimal(estimate.consumptionM3)} m³ analisados</div>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:13px">
              <tr><td style="padding:10px;border-bottom:1px solid #e3ebf0">Água · ${formatDecimal(estimate.waterBilledM3)} m³</td><td style="padding:10px;border-bottom:1px solid #e3ebf0;text-align:right;font-weight:700">${formatCurrency(estimate.waterAmount)}</td></tr>
              <tr><td style="padding:10px;border-bottom:1px solid #e3ebf0">Esgoto · ${formatDecimal(estimate.sewerBilledM3)} m³</td><td style="padding:10px;border-bottom:1px solid #e3ebf0;text-align:right;font-weight:700">${formatCurrency(estimate.sewerAmount)}</td></tr>
              <tr><td style="padding:10px">Diferença</td><td style="padding:10px;text-align:right;font-weight:700">${differenceText}</td></tr>
            </table>
            <p style="margin:22px 0 0;color:#778b99;font-size:11px;line-height:1.6">Estimativa informativa. Multas, juros, parcelamentos, serviços, créditos e dados específicos da fatura podem alterar o total final. Este serviço é independente e não pertence à Cagece.</p>
          </div>
        </div>
      </div>`;

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chave: secret,
        para: email,
        assunto: "Seu resultado — Tira-Teima Cagece",
        texto: textBody,
        html: htmlBody,
      }),
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
    });

    const result = (await response.json()) as { ok?: boolean; erro?: string };
    if (!response.ok || !result.ok) {
      throw new Error(result.erro || "O e-mail não pôde ser enviado agora.");
    }

    return Response.json({ ok: true });
  } catch (caught) {
    return Response.json(
      { error: caught instanceof Error ? caught.message : "Não foi possível enviar o e-mail." },
      { status: 422 },
    );
  }
}
