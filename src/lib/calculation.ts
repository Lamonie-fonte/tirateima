import { lookupCep } from "@/lib/cep";
import { estimateCageceBill } from "@/lib/supabase-rest";
import {
  CATEGORY_OPTIONS,
  type CalculationRequest,
  type ConsumptionInputMode,
  type Estimate,
} from "@/lib/types";

const validCategories = new Set<string>(CATEGORY_OPTIONS.map((option) => option.value));

function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateMeterConsumption(previousReadingM3: number, currentReadingM3: number) {
  if (
    !Number.isSafeInteger(previousReadingM3)
    || !Number.isSafeInteger(currentReadingM3)
    || previousReadingM3 < 0
    || currentReadingM3 < 0
  ) {
    throw new Error("Informe as leituras anterior e atual usando somente os números pretos.");
  }

  if (currentReadingM3 < previousReadingM3) {
    throw new Error(
      "A leitura atual não pode ser menor que a anterior. Se o hidrômetro foi trocado, confirme a nova leitura com a Cagece.",
    );
  }

  return currentReadingM3 - previousReadingM3;
}

function validateRequest(input: Partial<CalculationRequest>): CalculationRequest {
  const cep = String(input.cep || "").replace(/\D/g, "");
  const number = String(input.number || "").trim();
  const complement = String(input.complement || "").trim();
  const category = String(input.category || "");
  const inputMode: ConsumptionInputMode = input.inputMode === "meter" ? "meter" : "volume";
  const previousReadingM3 = input.previousReadingM3 === null || input.previousReadingM3 === undefined
    ? null
    : Number(input.previousReadingM3);
  const currentReadingM3 = input.currentReadingM3 === null || input.currentReadingM3 === undefined
    ? null
    : Number(input.currentReadingM3);
  let consumptionM3 = Number(input.consumptionM3);
  const billAmount = input.billAmount === null || input.billAmount === undefined
    ? null
    : Number(input.billAmount);

  if (!/^\d{8}$/.test(cep)) throw new Error("Informe um CEP válido.");
  if (!number || number.length > 20) throw new Error("Informe o número do imóvel.");
  if (complement.length > 60) throw new Error("O complemento do imóvel é muito longo.");
  if (!validCategories.has(category)) throw new Error("Selecione a tarifa da ligação.");

  if (inputMode === "meter") {
    if (previousReadingM3 === null || currentReadingM3 === null) {
      throw new Error("Informe as leituras anterior e atual usando somente os números pretos.");
    }
    consumptionM3 = calculateMeterConsumption(previousReadingM3, currentReadingM3);
  }

  if (!Number.isFinite(consumptionM3) || consumptionM3 < 0 || consumptionM3 > 10000) {
    throw new Error("Informe um consumo válido entre 0 e 10.000 m³.");
  }
  if (billAmount !== null && (!Number.isFinite(billAmount) || billAmount < 0 || billAmount > 1000000)) {
    throw new Error("O valor informado para a conta é inválido.");
  }

  return {
    cep,
    number,
    complement: complement || undefined,
    category: category as CalculationRequest["category"],
    inputMode,
    previousReadingM3: inputMode === "meter" ? previousReadingM3 : null,
    currentReadingM3: inputMode === "meter" ? currentReadingM3 : null,
    consumptionM3,
    billAmount,
    hasSewer: Boolean(input.hasSewer),
  };
}

export async function calculateRequest(input: Partial<CalculationRequest>) {
  const valid = validateRequest(input);
  const address = await lookupCep(valid.cep);

  if (address.state !== "CE" || address.city.toLowerCase() !== "fortaleza") {
    throw new Error("A consulta está disponível para imóveis de Fortaleza/CE.");
  }

  const baseEstimate = await estimateCageceBill({
    category: valid.category,
    consumptionM3: valid.consumptionM3,
    hasSewer: valid.hasSewer,
    city: address.city,
    state: address.state,
    neighborhood: address.neighborhood,
  });

  const differenceAmount = valid.billAmount === null
    ? null
    : roundMoney(valid.billAmount - baseEstimate.estimatedTotal);
  const tolerance = Math.max(2, baseEstimate.estimatedTotal * 0.05);

  let comparison: Estimate["comparison"] = "unavailable";
  let comparisonLabel = valid.inputMode === "meter"
    ? "Consumo calculado pelo hidrômetro"
    : "Estimativa concluída";

  if (differenceAmount !== null) {
    if (Math.abs(differenceAmount) < 0.01) {
      comparison = "close";
      comparisonLabel = "O valor confere com a estimativa";
    } else if (differenceAmount > tolerance) {
      comparison = "above";
      comparisonLabel = "O valor informado ficou acima";
    } else if (differenceAmount < -tolerance) {
      comparison = "below";
      comparisonLabel = "O valor informado ficou abaixo";
    } else {
      comparison = "close";
      comparisonLabel = "O valor está próximo da estimativa";
    }
  }

  const estimate: Estimate = {
    ...baseEstimate,
    billAmount: valid.billAmount,
    differenceAmount,
    comparison,
    comparisonLabel,
  };

  return { address, estimate, request: valid };
}
