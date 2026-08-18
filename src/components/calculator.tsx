"use client";

import { useState, type FormEvent } from "react";
import { formatCep, formatCurrency, formatDecimal, parseBrazilianNumber } from "@/lib/format";
import {
  CATEGORY_OPTIONS,
  type Address,
  type CalculationRequest,
  type ConsumptionInputMode,
  type Estimate,
  type TariffCategory,
} from "@/lib/types";

type CalculationResponse = {
  address: Address;
  estimate: Estimate;
};

type FormState = {
  cep: string;
  number: string;
  complement: string;
  category: TariffCategory | "";
  inputMode: ConsumptionInputMode;
  previousReading: string;
  currentReading: string;
  consumption: string;
  billAmount: string;
  hasSewer: boolean;
};

const INITIAL_FORM: FormState = {
  cep: "",
  number: "",
  complement: "",
  category: "",
  inputMode: "meter",
  previousReading: "",
  currentReading: "",
  consumption: "",
  billAmount: "",
  hasSewer: true,
};

function parseMeterReading(value: string) {
  const trimmed = value.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const reading = Number(trimmed);
  return Number.isSafeInteger(reading) ? reading : null;
}

function formatIsoDate(value: string) {
  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}/${month}/${year}` : value;
}

async function readJson<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & { error?: string };
  if (!response.ok) {
    throw new Error(data.error || "Não foi possível concluir a solicitação.");
  }
  return data;
}

export function Calculator() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [address, setAddress] = useState<Address | null>(null);
  const [result, setResult] = useState<CalculationResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailStatus, setEmailStatus] = useState("");

  const previousReading = parseMeterReading(form.previousReading);
  const currentReading = parseMeterReading(form.currentReading);
  const meterConsumption = previousReading !== null
    && currentReading !== null
    && currentReading >= previousReading
    ? currentReading - previousReading
    : null;

  function updateForm<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function findAddress(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`/api/cep?cep=${form.cep.replace(/\D/g, "")}`);
      const found = await readJson<Address>(response);

      if (found.state !== "CE" || found.city.toLowerCase() !== "fortaleza") {
        throw new Error(
          "Neste primeiro momento, a consulta está disponível para endereços de Fortaleza/CE.",
        );
      }

      setAddress(found);
    } catch (caught) {
      setAddress(null);
      setError(caught instanceof Error ? caught.message : "CEP não encontrado.");
    } finally {
      setLoading(false);
    }
  }

  function continueToBill() {
    if (!address || !form.number.trim()) {
      setError("Confirme o endereço e informe o número da casa.");
      return;
    }
    setError("");
    setStep(2);
  }

  function makeCalculationPayload(): CalculationRequest {
    if (!form.category) {
      throw new Error("Selecione a tarifa da ligação antes de calcular.");
    }

    let consumptionM3 = parseBrazilianNumber(form.consumption);
    let previousReadingM3: number | null = null;
    let currentReadingM3: number | null = null;

    if (form.inputMode === "meter") {
      previousReadingM3 = parseMeterReading(form.previousReading);
      currentReadingM3 = parseMeterReading(form.currentReading);

      if (previousReadingM3 === null || currentReadingM3 === null) {
        throw new Error("Digite somente os números pretos das duas leituras.");
      }

      if (currentReadingM3 < previousReadingM3) {
        throw new Error(
          "A leitura atual não pode ser menor que a anterior. Se o hidrômetro foi trocado, confirme a leitura com a Cagece.",
        );
      }

      consumptionM3 = currentReadingM3 - previousReadingM3;
    }

    const billAmount = form.inputMode === "volume" && form.billAmount.trim()
      ? parseBrazilianNumber(form.billAmount)
      : null;

    if (!Number.isFinite(consumptionM3) || consumptionM3 < 0) {
      throw new Error("Informe o consumo em m³ que aparece na conta.");
    }

    if (billAmount !== null && (!Number.isFinite(billAmount) || billAmount < 0)) {
      throw new Error("Informe um valor válido para a conta.");
    }

    return {
      cep: form.cep.replace(/\D/g, ""),
      number: form.number.trim(),
      complement: form.complement.trim() || undefined,
      category: form.category,
      inputMode: form.inputMode,
      previousReadingM3,
      currentReadingM3,
      consumptionM3,
      billAmount,
      hasSewer: form.hasSewer,
    };
  }

  async function calculate(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = makeCalculationPayload();
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const calculation = await readJson<CalculationResponse>(response);
      setAddress(calculation.address);
      setResult(calculation);
      setStep(3);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Não foi possível calcular agora.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function sendEmail(event: FormEvent) {
    event.preventDefault();
    setEmailStatus("");
    setLoading(true);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          calculation: makeCalculationPayload(),
        }),
      });
      await readJson<{ ok: boolean }>(response);
      setEmailStatus("Resultado enviado. Confira também a caixa de spam.");
    } catch (caught) {
      setEmailStatus(
        caught instanceof Error ? caught.message : "Não foi possível enviar.",
      );
    } finally {
      setLoading(false);
    }
  }

  function restart() {
    setStep(1);
    setForm(INITIAL_FORM);
    setAddress(null);
    setResult(null);
    setError("");
    setEmailStatus("");
  }

  return (
    <section className="calculator-card" aria-labelledby="calculator-title">
      <div className="calculator-header">
        <div>
          <span className="calculator-kicker">Consulta gratuita</span>
          <h2 id="calculator-title">Faça seu tira-teima</h2>
        </div>
        <span className="secure-pill">● Seguro</span>
      </div>

      <div className="stepper" aria-label={`Etapa ${step} de 3`}>
        {[1, 2, 3].map((item) => (
          <span key={item} className={item <= step ? "active" : ""}>
            {item}
          </span>
        ))}
      </div>

      {step === 1 ? (
        <div className="calculator-body">
          <div className="step-heading">
            <span>Etapa 1 de 3</span>
            <h3>Onde fica o imóvel?</h3>
            <p>O CEP encontra a rua e o bairro automaticamente.</p>
          </div>

          <form onSubmit={findAddress} className="form-stack">
            <label htmlFor="cep">CEP</label>
            <div className="inline-field">
              <input
                id="cep"
                name="cep"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="00000-000"
                value={form.cep}
                onChange={(event) => {
                  updateForm("cep", formatCep(event.target.value));
                  setAddress(null);
                }}
                required
              />
              <button className="button secondary" type="submit" disabled={loading}>
                {loading ? "Buscando…" : "Buscar"}
              </button>
            </div>
          </form>

          {address ? (
            <div className="address-confirmation">
              <span className="address-pin" aria-hidden="true">⌖</span>
              <div>
                <strong>{address.street}</strong>
                <p>{address.neighborhood} · {address.city}/{address.state}</p>
              </div>
              <span className="address-check">✓</span>
            </div>
          ) : null}

          {address ? (
            <div className="field-grid">
              <div>
                <label htmlFor="number">Número da casa</label>
                <input
                  id="number"
                  inputMode="numeric"
                  autoComplete="address-line2"
                  placeholder="Ex.: 125"
                  value={form.number}
                  onChange={(event) => updateForm("number", event.target.value.slice(0, 20))}
                  required
                />
              </div>
              <div>
                <label htmlFor="complement">Complemento</label>
                <input
                  id="complement"
                  placeholder="Opcional"
                  value={form.complement}
                  onChange={(event) => updateForm("complement", event.target.value.slice(0, 60))}
                />
              </div>
            </div>
          ) : null}

          {error ? <p className="form-error" role="alert">{error}</p> : null}

          <button
            className="button primary full"
            type="button"
            onClick={continueToBill}
            disabled={!address || !form.number.trim()}
          >
            Confirmar endereço <span>→</span>
          </button>
        </div>
      ) : null}

      {step === 2 ? (
        <form className="calculator-body" onSubmit={calculate}>
          <div className="step-heading">
            <span>Etapa 2 de 3</span>
            <h3>Dados da conta</h3>
            <p>Use os números impressos na fatura que você quer conferir.</p>
          </div>

          <div className="form-stack">
            <fieldset className="input-mode-fieldset">
              <legend>Como você quer informar o consumo?</legend>
              <div className="input-mode-options">
                <label className={form.inputMode === "meter" ? "active" : ""}>
                  <input
                    type="radio"
                    name="input-mode"
                    value="meter"
                    checked={form.inputMode === "meter"}
                    onChange={() => updateForm("inputMode", "meter")}
                  />
                  <strong>Pelo hidrômetro</strong>
                  <small>Última conta e leitura de hoje</small>
                </label>
                <label className={form.inputMode === "volume" ? "active" : ""}>
                  <input
                    type="radio"
                    name="input-mode"
                    value="volume"
                    checked={form.inputMode === "volume"}
                    onChange={() => updateForm("inputMode", "volume")}
                  />
                  <strong>Já sei os m³</strong>
                  <small>Usar o consumo da conta</small>
                </label>
              </div>
            </fieldset>

            {form.inputMode === "meter" ? (
              <>
                <div className="meter-guide" role="note">
                  <span aria-hidden="true">◉</span>
                  <p>
                    <strong>Digite somente os números pretos do hidrômetro.</strong>
                    <small>
                      Ignore números vermelhos e ponteiros. Use o campo “Leitura atual” da última conta como base.
                    </small>
                  </p>
                </div>
                <div className="field-grid">
                  <div>
                    <label htmlFor="previous-reading">Leitura da última conta</label>
                    <input
                      id="previous-reading"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Ex.: 514"
                      value={form.previousReading}
                      onChange={(event) => updateForm(
                        "previousReading",
                        event.target.value.replace(/\D/g, "").slice(0, 9),
                      )}
                      required
                    />
                    <small className="field-help">Copie o campo “Leitura atual” em Dados do consumo</small>
                  </div>
                  <div>
                    <label htmlFor="current-reading">Leitura atual</label>
                    <input
                      id="current-reading"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Ex.: 530"
                      value={form.currentReading}
                      onChange={(event) => updateForm(
                        "currentReading",
                        event.target.value.replace(/\D/g, "").slice(0, 9),
                      )}
                      required
                    />
                    <small className="field-help">Numeração preta que aparece hoje no hidrômetro</small>
                  </div>
                </div>

                {meterConsumption !== null ? (
                  <div className="consumption-preview" aria-live="polite">
                    <span>Consumo até agora</span>
                    <strong>{formatDecimal(meterConsumption)} m³</strong>
                    <small>{currentReading} − {previousReading} = {meterConsumption}</small>
                  </div>
                ) : null}
              </>
            ) : (
              <div className="field-grid">
                <div>
                  <label htmlFor="consumption">Consumo faturado</label>
                  <div className="input-suffix">
                    <input
                      id="consumption"
                      inputMode="decimal"
                      placeholder="Ex.: 16"
                      value={form.consumption}
                      onChange={(event) => updateForm("consumption", event.target.value.slice(0, 12))}
                      required
                    />
                    <span>m³</span>
                  </div>
                </div>
                <div>
                  <label htmlFor="bill-amount">Valor cobrado</label>
                  <div className="input-prefix">
                    <span>R$</span>
                    <input
                      id="bill-amount"
                      inputMode="decimal"
                      placeholder="Opcional"
                      value={form.billAmount}
                      onChange={(event) => updateForm("billAmount", event.target.value.slice(0, 14))}
                    />
                  </div>
                </div>
              </div>
            )}

            <label htmlFor="category">Tarifa da ligação</label>
            <select
              id="category"
              value={form.category}
              onChange={(event) => updateForm("category", event.target.value as TariffCategory)}
              required
            >
              <option value="" disabled>Selecione a tarifa cadastrada</option>
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <small className="category-help">
              Importante: Popular e Normal usam valores diferentes. Se a fatura mostrar apenas
              “Residencial”, confirme a tarifa no cadastro da Cagece — o sistema não adivinha esse dado.
            </small>

            <label className="switch-row" htmlFor="has-sewer">
              <span>
                <strong>A conta cobra serviço de esgoto?</strong>
                <small>Confira se há uma linha de esgoto na fatura.</small>
              </span>
              <input
                id="has-sewer"
                type="checkbox"
                checked={form.hasSewer}
                onChange={(event) => updateForm("hasSewer", event.target.checked)}
              />
              <i aria-hidden="true" />
            </label>
          </div>

          {error ? <p className="form-error" role="alert">{error}</p> : null}

          <div className="button-row">
            <button className="button ghost" type="button" onClick={() => setStep(1)}>
              ← Voltar
            </button>
            <button className="button primary" type="submit" disabled={loading}>
              {loading ? "Calculando…" : "Ver resultado →"}
            </button>
          </div>
        </form>
      ) : null}

      {step === 3 && result ? (
        <div className="calculator-body result-body">
          <div className="result-heading">
            <span className={`result-status ${result.estimate.comparison}`}>
              {result.estimate.comparison === "above" ? "!" : "✓"}
            </span>
            <div>
              <span>Resultado da estimativa</span>
              <h3>{result.estimate.comparisonLabel}</h3>
            </div>
          </div>

          <div className="result-total">
            <span>Total estimado</span>
            <strong>{formatCurrency(result.estimate.estimatedTotal)}</strong>
            <small>
              {formatDecimal(result.estimate.consumptionM3)} m³ consumidos
              {form.inputMode === "meter" ? " até esta leitura" : " analisados"}
            </small>
          </div>

          {form.inputMode === "meter"
            && result.estimate.consumptionM3 === meterConsumption
            && previousReading !== null
            && currentReading !== null ? (
              <div className="reading-proof">
                <span>Como chegamos ao consumo</span>
                <strong>
                  Leitura de hoje {currentReading} − última conta {previousReading}
                  = {formatDecimal(result.estimate.consumptionM3)} m³
                </strong>
              </div>
            ) : null}

          <div className="result-breakdown">
            <div>
              <span>Água · {formatDecimal(result.estimate.waterBilledM3)} m³ faturados</span>
              <strong>{formatCurrency(result.estimate.waterAmount)}</strong>
            </div>
            <div>
              <span>
                Esgoto · {formatDecimal(result.estimate.sewerBilledM3)} m³ faturados
              </span>
              <strong>{formatCurrency(result.estimate.sewerAmount)}</strong>
            </div>
            {result.estimate.billAmount !== null ? (
              <div>
                <span>Valor informado</span>
                <strong>{formatCurrency(result.estimate.billAmount)}</strong>
              </div>
            ) : null}
          </div>

          {result.estimate.differenceAmount !== null ? (
            <p className={`difference-note ${result.estimate.comparison}`}>
              {Math.abs(result.estimate.differenceAmount) < 0.01 ? (
                <>Sem diferença entre o valor informado e a estimativa.</>
              ) : (
                <>
                  Diferença: <strong>{formatCurrency(Math.abs(result.estimate.differenceAmount))}</strong>
                  {result.estimate.differenceAmount > 0 ? " acima" : " abaixo"} da estimativa.
                </>
              )}
            </p>
          ) : null}

          <div className="tariff-summary">
            <div>
              <span>Tarifa aplicada</span>
              <strong>{result.estimate.tariffName}</strong>
              <small>Vigente desde {formatIsoDate(result.estimate.validFrom)}</small>
            </div>
            <a href={result.estimate.sourceUrl} target="_blank" rel="noreferrer">
              Ver fonte oficial ↗
            </a>
          </div>

          {form.hasSewer ? (
            <p className="sewer-rule-note">
              O volume de esgoto foi calculado em 80% do volume faturado de água,
              desprezando a parte decimal, conforme a regra publicada pela Cagece.
            </p>
          ) : null}

          <div className="result-address">
            <span>Imóvel conferido</span>
            <strong>
              {result.address.street}, {form.number}
              {form.complement ? ` — ${form.complement}` : ""} · {result.address.neighborhood}
            </strong>
          </div>

          <p className="result-disclaimer">
            {form.inputMode === "meter"
              ? "Este é o valor acumulado até a leitura digitada, não uma previsão do fechamento. "
              : "Estimativa informativa. "}
            O hidrômetro pode continuar avançando até a leitura oficial. Outros serviços,
            multas, juros, créditos e regras específicas da fatura podem alterar o valor final.
          </p>

          <form className="email-box" onSubmit={sendEmail}>
            <div>
              <strong>Receba este resultado por e-mail</strong>
              <small>Enviaremos somente o resumo desta consulta.</small>
            </div>
            <div className="field-grid">
              <input
                aria-label="Seu nome"
                autoComplete="name"
                placeholder="Seu nome"
                value={name}
                onChange={(event) => setName(event.target.value.slice(0, 80))}
              />
              <input
                aria-label="Seu e-mail"
                type="email"
                autoComplete="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value.slice(0, 254))}
                required
              />
            </div>
            <button className="button secondary full" type="submit" disabled={loading}>
              {loading ? "Enviando…" : "Enviar resultado"}
            </button>
            {emailStatus ? <p className="email-status" role="status">{emailStatus}</p> : null}
          </form>

          <button className="button ghost full" type="button" onClick={restart}>
            Fazer nova consulta
          </button>
        </div>
      ) : null}

      <div className="calculator-footer">
        <span aria-hidden="true">◈</span>
        Seus dados são usados somente para realizar esta consulta.
      </div>
    </section>
  );
}
