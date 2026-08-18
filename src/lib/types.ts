export const CATEGORY_OPTIONS = [
  { value: "residencial_social", label: "Residencial Social" },
  { value: "residencial_popular", label: "Residencial Popular" },
  { value: "residencial_normal", label: "Residencial Normal" },
  { value: "comercial_popular", label: "Comercial Popular" },
  { value: "comercial_ii", label: "Comercial II" },
  { value: "industrial", label: "Industrial" },
  { value: "publica", label: "Pública" },
  { value: "filantropica", label: "Entidade Filantrópica" },
] as const;

export type TariffCategory = (typeof CATEGORY_OPTIONS)[number]["value"];

export type Address = {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
};

export type TariffTier = {
  fromM3: number;
  toM3: number | null;
  waterRate: number;
  sewerRate: number;
};

export type Estimate = {
  tariffId: string;
  tariffName: string;
  category: TariffCategory;
  validFrom: string;
  sourceUrl: string;
  consumptionM3: number;
  waterBilledM3: number;
  sewerBilledM3: number;
  waterAmount: number;
  sewerAmount: number;
  estimatedTotal: number;
  tiers: TariffTier[];
  billAmount: number | null;
  differenceAmount: number | null;
  comparison: "above" | "close" | "below" | "unavailable";
  comparisonLabel: string;
};

export type CalculationRequest = {
  cep: string;
  number: string;
  complement?: string;
  category: TariffCategory;
  consumptionM3: number;
  billAmount: number | null;
  hasSewer: boolean;
};
