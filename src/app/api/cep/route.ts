import { lookupCep } from "@/lib/cep";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cep = searchParams.get("cep") || "";

  try {
    const address = await lookupCep(cep);
    return Response.json(address, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
    });
  } catch (caught) {
    return Response.json(
      { error: caught instanceof Error ? caught.message : "CEP não encontrado." },
      { status: 400 },
    );
  }
}
