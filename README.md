# Tira-Teima Cagece

Aplicação independente para conferir uma estimativa de contas de água e esgoto da Cagece em Fortaleza/CE.

## O que está incluído

- busca de endereço por CEP, com confirmação do número do imóvel;
- cálculo progressivo por categoria e faixa de consumo;
- detalhamento separado de água e esgoto;
- comparação opcional com o valor informado da fatura;
- envio do resultado por e-mail através de Google Apps Script;
- banco Supabase com RLS, tarifas versionadas e função pública de cálculo;
- verificação diária leve do Supabase através de Vercel Cron.

## Fonte tarifária

Os valores cadastrados são os da [estrutura tarifária oficial da Cagece](https://www.cagece.com.br/produtos-e-servicos/precos-e-prazos/estrutura-tarifaria/), válida desde 5 de novembro de 2025.

O resultado é uma estimativa informativa. Multas, juros, parcelamentos, serviços, créditos, regras específicas e dados de leitura podem alterar o total oficial da fatura.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
APPS_SCRIPT_URL=
APPS_SCRIPT_SECRET=
CRON_SECRET=
```

As variáveis `APPS_SCRIPT_SECRET` e `CRON_SECRET` são exclusivas do servidor e nunca devem receber o prefixo `NEXT_PUBLIC_`.

## Desenvolvimento

Requer Node.js 22 ou superior.

```bash
npm install
npm run dev
```

Verificações antes de publicar:

```bash
npm run lint
npm run typecheck
npm run build
```

## Banco de dados

As migrações aplicadas no projeto Supabase estão em `supabase/migrations`. Todas as tabelas expostas possuem RLS. A função `estimate_cagece_bill` pode ser executada com a chave publicável e lê somente as tarifas ativas.

## Segurança

- nenhuma chave administrativa do Supabase é usada;
- a chave do Google Apps Script fica somente no servidor;
- o endpoint de e-mail aceita apenas o modelo fixo do resultado e possui limite de tentativas;
- o cron exige o cabeçalho `Authorization: Bearer $CRON_SECRET`;
- o site informa claramente que não pertence à Cagece.
