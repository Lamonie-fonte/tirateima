import { Calculator } from "@/components/calculator";
import { Logo } from "@/components/logo";
import { OFFICIAL_TARIFF_SOURCE } from "@/lib/public-config";

export default function Home() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand-link" href="#inicio" aria-label="Tira-Teima Cagece — início">
            <Logo />
          </a>
          <nav className="header-nav" aria-label="Navegação principal">
            <a href="#como-funciona">Como funciona</a>
            <a href="#duvidas">Dúvidas</a>
            <a className="header-cta" href="#calcular">
              Conferir conta
            </a>
          </nav>
        </div>
      </header>

      <main id="inicio">
        <section className="hero-section">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Tarifa oficial vigente desde 05/11/2025
              </div>
              <h1>
                Sua conta de água
                <span> faz sentido?</span>
              </h1>
              <p className="hero-lead">
                Informe o CEP, confirme seu endereço e compare o valor da sua
                fatura com uma estimativa baseada na tabela oficial da Cagece.
              </p>
              <div className="hero-points" aria-label="Vantagens">
                <div>
                  <span className="point-icon">✓</span>
                  <p>
                    <strong>Endereço confirmado</strong>
                    <small>Rua e bairro localizados pelo CEP</small>
                  </p>
                </div>
                <div>
                  <span className="point-icon">✓</span>
                  <p>
                    <strong>Cálculo por faixa</strong>
                    <small>Água e esgoto detalhados separadamente</small>
                  </p>
                </div>
                <div>
                  <span className="point-icon">✓</span>
                  <p>
                    <strong>Sem custo</strong>
                    <small>Resultado rápido e fácil de entender</small>
                  </p>
                </div>
              </div>
            </div>

            <div id="calcular" className="calculator-anchor">
              <Calculator />
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Informações importantes">
          <div className="container trust-grid">
            <div>
              <strong>Tabela oficial</strong>
              <span>Fonte pública da Cagece</span>
            </div>
            <div>
              <strong>Fortaleza</strong>
              <span>Consulta inicial disponível na capital</span>
            </div>
            <div>
              <strong>Privacidade</strong>
              <span>Seu endereço não é publicado</span>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="section how-section">
          <div className="container">
            <div className="section-heading">
              <span>É simples</span>
              <h2>Confira em três passos</h2>
              <p>Você só precisa das informações que já aparecem na sua conta.</p>
            </div>
            <div className="how-grid">
              <article className="how-card">
                <span className="how-number">01</span>
                <h3>Confirme o imóvel</h3>
                <p>
                  Digite o CEP. O sistema encontra rua e bairro; você informa
                  somente o número da casa.
                </p>
              </article>
              <article className="how-card featured">
                <span className="how-number">02</span>
                <h3>Informe a fatura</h3>
                <p>
                  Selecione a categoria, o consumo em m³, a existência de esgoto
                  e, se quiser, o valor cobrado.
                </p>
              </article>
              <article className="how-card">
                <span className="how-number">03</span>
                <h3>Veja o tira-teima</h3>
                <p>
                  Receba a estimativa de água, esgoto e a diferença em relação ao
                  valor informado.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="duvidas" className="section faq-section">
          <div className="container faq-grid">
            <div className="faq-intro">
              <span>Antes de calcular</span>
              <h2>O que é importante saber</h2>
              <p>
                O Tira-Teima ajuda você a entender a tarifa, mas não substitui a
                análise oficial da companhia.
              </p>
              <a href={OFFICIAL_TARIFF_SOURCE} target="_blank" rel="noreferrer">
                Ver tabela oficial da Cagece ↗
              </a>
            </div>
            <div className="faq-list">
              <details open>
                <summary>A tarifa muda conforme o bairro?</summary>
                <p>
                  A tabela vigente é aplicada de forma linear nos municípios
                  operados pela Cagece. Mesmo assim, guardamos CEP e bairro para
                  identificar a localidade e permitir futuras regras específicas.
                </p>
              </details>
              <details>
                <summary>Por que o valor pode ficar diferente?</summary>
                <p>
                  Multas, juros, parcelamentos, serviços, créditos, arredondamentos
                  ou dados de leitura podem alterar o total final da fatura.
                </p>
              </details>
              <details>
                <summary>O site pertence à Cagece?</summary>
                <p>
                  Não. Este é um serviço independente de apoio ao consumidor e
                  utiliza informações tarifárias públicas.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <Logo compact />
          <p>
            Serviço independente. Em caso de divergência, consulte a Cagece pelos
            canais oficiais.
          </p>
          <span>© 2026 Tira-Teima Cagece</span>
        </div>
      </footer>
    </div>
  );
}
