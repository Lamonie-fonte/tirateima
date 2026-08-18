import type { Address } from "@/lib/types";

type ViaCepResponse = {
  cep?: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
};

export async function lookupCep(rawCep: string): Promise<Address> {
  const cep = rawCep.replace(/\D/g, "");

  if (!/^\d{8}$/.test(cep)) {
    throw new Error("Informe um CEP válido com 8 números.");
  }

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 86_400 },
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    throw new Error("Não foi possível consultar o CEP agora.");
  }

  const data = (await response.json()) as ViaCepResponse;

  if (data.erro || !data.localidade || !data.uf) {
    throw new Error("CEP não encontrado.");
  }

  return {
    cep: data.cep || cep,
    street: data.logradouro?.trim() || "Logradouro não informado",
    neighborhood: data.bairro?.trim() || "Bairro não informado",
    city: data.localidade.trim(),
    state: data.uf.trim().toUpperCase(),
  };
}
