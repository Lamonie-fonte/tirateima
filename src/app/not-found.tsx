import Link from "next/link";

export default function NotFound() {
  return (
    <main className="error-page">
      <section className="error-card">
        <h1>Página não encontrada</h1>
        <p>O endereço acessado não existe ou foi alterado.</p>
        <Link className="button primary" href="/">
          Voltar ao início
        </Link>
      </section>
    </main>
  );
}
