import { estimateCageceBill } from "@/lib/supabase-rest";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");

  if (!secret || authorization !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 });
  }

  try {
    const estimate = await estimateCageceBill({
      category: "residencial_normal",
      consumptionM3: 10,
      hasSewer: false,
      city: "Fortaleza",
      state: "CE",
      neighborhood: "",
    });

    return Response.json({ ok: true, tariff: estimate.tariffName });
  } catch {
    return Response.json({ ok: false }, { status: 503 });
  }
}
