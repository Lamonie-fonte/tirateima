import { calculateRequest } from "@/lib/calculation";
import type { CalculationRequest } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as Partial<CalculationRequest>;
    const { address, estimate } = await calculateRequest(input);
    return Response.json({ address, estimate });
  } catch (caught) {
    return Response.json(
      {
        error: caught instanceof Error
          ? caught.message
          : "Não foi possível realizar o cálculo.",
      },
      { status: 422 },
    );
  }
}
