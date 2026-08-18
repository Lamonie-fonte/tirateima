import {
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_URL,
} from "@/lib/public-config";
import type { Estimate, TariffCategory } from "@/lib/types";

type EstimateInput = {
  category: TariffCategory;
  consumptionM3: number;
  hasSewer: boolean;
  city: string;
  state: string;
  neighborhood: string;
};

export async function estimateCageceBill(
  input: EstimateInput,
): Promise<Omit<Estimate, "billAmount" | "differenceAmount" | "comparison" | "comparisonLabel">> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/rpc/estimate_cagece_bill`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_category: input.category,
        p_consumption_m3: input.consumptionM3,
        p_has_sewer: input.hasSewer,
        p_reference_date: new Date().toISOString().slice(0, 10),
        p_city: input.city,
        p_state: input.state,
        p_neighborhood: input.neighborhood,
      }),
      cache: "no-store",
    },
  );

  const payload = (await response.json()) as
    | Omit<Estimate, "billAmount" | "differenceAmount" | "comparison" | "comparisonLabel">
    | { message?: string };

  if (!response.ok) {
    throw new Error(
      "message" in payload && payload.message
        ? payload.message
        : "Não foi possível calcular a estimativa.",
    );
  }

  return payload as Omit<
    Estimate,
    "billAmount" | "differenceAmount" | "comparison" | "comparisonLabel"
  >;
}
