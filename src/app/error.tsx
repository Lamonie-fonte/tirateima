"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="error-page">
      <section className="error-card">
        <h1>Algo não saiu como esperado</h1>
        <p>A consulta não foi perdida. Tente novamente em alguns instantes.</p>
        <button className="button primary" type="button" onClick={() => reset()}>
          Tentar novamente
        </button>
      </section>
    </main>
  );
}
