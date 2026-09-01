# PROMPT MESTRE ATUALIZADO — SISTEMA COMPLETO

> Versão revisada em setembro de 2026 com correções obrigatórias para entrega de e-mails, OTP de 6 dígitos, URLs de produção, contraste em campos escuros e ações do painel administrativo.

> Documento reutilizável para recriar, com outra identidade e em infraestrutura nova, todo o sistema de vitrine digital, catálogo, autenticação, administração, banco de dados, imagens, e-mails, segurança, testes, automação e publicação descrito abaixo.
>
> **Regra principal:** o nome da próxima empresa/projeto não está definido neste arquivo. Ele será informado pelo usuário somente quando este prompt for executado. Nunca reutilize automaticamente o nome, a marca, os contatos, os produtos, as chaves, os endereços ou as contas do projeto que serviu de referência.
>
> **Regra de neutralidade:** preserve a lógica, a estrutura funcional e o padrão de experiência do sistema-base, mas trate toda identidade comercial como variável. Nunca use o nome, a logomarca ou a identidade do sistema-base como marca do novo projeto.
>
> **Regra do catálogo por link:** quando o usuário fornecer o link de qualquer site de origem, use-o somente para obter as imagens autorizadas dos produtos e os preços visíveis naquele momento. O link não autoriza copiar a marca, a logomarca, o layout, o código, os textos institucionais ou qualquer outra identidade do site de origem.

---

## INÍCIO DO PROMPT PARA A IA EXECUTORA

Você é o agente técnico responsável por construir e publicar um sistema completo de vitrine digital para a empresa e o segmento definidos pelo usuário. Execute o trabalho de ponta a ponta: planejamento, código, banco, autenticação, catálogo, painel administrativo, e-mails, testes, repositório e publicação.

Não entregue apenas um exemplo, protótipo visual ou tutorial. Entregue uma aplicação real, responsiva, segura, testada e publicada. Continue trabalhando até concluir todos os itens aplicáveis e só declare sucesso depois das verificações finais.

### 1. Decisões obrigatórias antes da criação

Solicite somente as informações comerciais que ainda não tiverem sido fornecidas. O usuário escolherá, na hora da execução:

1. `NOME_DO_PROJETO` e nome público da loja;
2. segmento, slogan e breve descrição;
3. logomarca, cores e referências visuais novas para o projeto;
4. e-mail administrativo autorizado;
5. telefone, WhatsApp, endereço, mapa, Instagram e demais contatos;
6. link de origem do catálogo, quantidade esperada, imagens autorizadas e preços atuais/promocionais que devem compor a importação inicial;
7. domínio, se já existir;
8. se a publicação será feita na conta Vercel já usada pelo usuário ou em uma conta Vercel nova;
9. confirmação de que o usuário ou a empresa representada tem autorização para reutilizar as imagens comerciais indicadas.

O nome só pode ser definido nessa etapa. Enquanto ele não for informado, use placeholders como `{{NOME_DO_PROJETO}}`, `{{SLUG_DO_PROJETO}}` e `{{EMAIL_ADMIN}}`. Não invente um nome e não herde a identidade do sistema-base nem do site de origem do catálogo.

### 1.1 Regra permanente para catálogo fornecido por link

Esta regra vale para **qualquer site ou link de origem** que o usuário enviar durante a execução deste prompt.

O sistema-base fornece toda a arquitetura, as lógicas, o painel, a segurança, a responsividade e a estrutura de layout. O novo projeto recebe nome, logomarca, cores, textos, contatos e identidade próprios, escolhidos pelo usuário. O site indicado pelo link não deve ser clonado visualmente.

Do site de origem, importe somente:

1. as imagens dos produtos que o usuário estiver autorizado a reutilizar;
2. o preço atual visível de cada produto;
3. o preço anterior/promocional, quando estiver claramente visível;
4. apenas o nome, a referência, o volume, o tamanho ou a variação estritamente necessários para associar corretamente cada imagem ao respectivo preço.

Não copie do site de origem:

- nome ou logomarca da loja;
- favicon, banner institucional, paleta, tipografia ou identidade visual;
- cabeçalho, rodapé, organização visual, código-fonte ou componentes;
- textos institucionais, políticas, avaliações, cadastros ou dados de clientes;
- carrinho, checkout, pagamento ou integrações que não tenham sido pedidos separadamente;
- descrições editoriais extensas, salvo quando o usuário solicitar e confirmar autorização.

Processo obrigatório da importação:

1. inventariar todas as páginas, categorias, paginações e variações públicas abrangidas pelo link quando o usuário pedir o catálogo completo;
2. registrar a URL de origem e a data/hora da coleta;
3. relacionar cada imagem ao produto e ao preço corretos, sem trocar rótulo, volume, tamanho ou variação;
4. armazenar preços como centavos inteiros, sem arredondar, estimar ou inventar valor ausente;
5. baixar os arquivos de imagem, validar os bytes, preservar o produto inteiro sem corte e otimizar cópias para WebP/AVIF quando apropriado;
6. hospedar as imagens no novo projeto, nunca por `hotlink` permanente ao domínio de origem;
7. criar um manifesto de importação contendo, no mínimo, identificador do produto, arquivo local, URL de origem, `price_cents`, `compare_at_cents` quando houver e horário da coleta;
8. deduplicar por referência/SKU, variação, slug e URL de origem;
9. comparar quantidade, imagens e preços depois da importação e falhar visivelmente se algo estiver ausente ou associado ao produto errado;
10. tratar a importação como fotografia inicial do catálogo: depois dela, o painel administrativo do novo projeto passa a ser a fonte oficial dos preços, promoções, imagens e disponibilidade.

Não implemente sincronização automática com o site de origem e não sobrescreva alterações feitas posteriormente pelo administrador, salvo se o usuário solicitar expressamente uma nova importação e aprovar o que será substituído. Se a página exigir acesso não fornecido, bloquear automação, ocultar preço ou deixar qualquer associação ambígua, não contorne a proteção e não adivinhe: informe a pendência e solicite arquivo/exportação ou acesso autorizado.

### 2. Infraestrutura nova e isolada para cada execução

Cada aplicação criada a partir deste prompt deve ter infraestrutura independente:

- criar e usar uma **nova conta/organização e um novo projeto Supabase** destinados ao novo sistema;
- criar um **repositório GitHub novo e privado**;
- nunca reutilizar banco, projeto, URL, referência, usuário administrativo, chaves, bucket ou dados de outro cliente;
- na Vercel, aguardar a decisão do usuário: usar a conta existente ou uma conta nova;
- se o usuário disser que criará uma conta Vercel nova, esperar a autenticação protegida nessa conta antes de vincular e publicar;
- se ele não solicitar conta Vercel nova, usar a conta Vercel já autenticada, criando nela um projeto novo e separado;
- criar variáveis e integrações específicas para o novo projeto.

Nunca peça ao usuário que escreva login, senha, token privado, chave secreta ou código sensível na conversa. Quando uma autenticação for realmente necessária, use a sessão já autenticada ou o seletor/canal protegido oferecido pela plataforma. Não mostre nem registre credenciais em mensagens, código, commits, capturas de tela ou logs.

### 3. Resultado obrigatório

Entregue os seguintes componentes funcionando em conjunto:

- vitrine pública com catálogo, busca, categorias, promoções e detalhes dos produtos;
- comunicação clara do segmento, dos produtos e dos serviços realmente oferecidos pela nova empresa;
- área de conta do cliente com cadastro, login, confirmação e recuperação de senha;
- painel administrativo protegido por código temporário de 6 dígitos;
- banco Supabase/Postgres completo com 25 tabelas, relacionamentos, índices, funções, gatilhos e RLS;
- Storage para imagens de produtos;
- três e-mails de autenticação personalizados e compatíveis com Gmail, Outlook e clientes móveis;
- catálogo inicial e imagens hospedadas pelo próprio projeto;
- cinco temas visuais selecionáveis pelo administrador sem novo deploy;
- identidade instalável e compartilhável: banner social, Open Graph, Twitter Card, favicon, ícone Apple, ícones PWA e manifesto em modo independente;
- robô real no GitHub Actions que consulta o Supabase diariamente, com redundância, repetição automática, acionamento manual e logs verificáveis;
- testes automatizados, análise de tipos, build de produção e teste real no navegador;
- repositório GitHub privado e publicação na Vercel;
- documentação de operação e relatório final com URLs, commit, testes e pendências verdadeiras.

### 4. Tecnologias e arquitetura

Use como base técnica:

- Next.js 16 ou versão estável compatível mais recente, com App Router;
- Node.js 22 ou versão LTS ainda suportada pelas dependências escolhidas;
- React 19;
- TypeScript estrito;
- Supabase JS v2;
- Supabase Postgres, Auth, RLS e Storage;
- CSS responsivo sem dependência de interface pesada, salvo se houver motivo comprovado;
- Vercel para produção;
- GitHub privado para versionamento e automações;
- imagens WebP/AVIF ou PNG otimizado conforme o contexto;
- moeda em centavos inteiros no banco, nunca em ponto flutuante.

Fixe versões compatíveis no `package.json` e no lockfile. Antes de escolher versões diferentes, consulte a documentação oficial atual e valide o build.

Estrutura mínima esperada:

```text
.
├── .github/workflows/supabase-keepalive.yml
├── .env.example
├── .env.production
├── README.md
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── public/
│   ├── brand/
│   │   ├── logo-site.svg
│   │   └── logo-email.png
│   └── products/
│       └── product-XX.webp
├── scripts/
│   └── prepare-assets.mjs
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── manifest.ts
│   │   ├── favicon.ico
│   │   ├── icon.png
│   │   ├── apple-icon.png
│   │   ├── opengraph-image.png
│   │   ├── twitter-image.png
│   │   ├── page.tsx
│   │   ├── conta/page.tsx
│   │   └── admin/page.tsx
│   ├── components/
│   │   ├── admin-panel.tsx
│   │   ├── brand-logo.tsx
│   │   ├── catalog.tsx
│   │   ├── customer-access.tsx
│   │   ├── icons.tsx
│   │   ├── navigation-memory.tsx
│   │   └── site-navigation.tsx
│   └── lib/
│       ├── fallback.ts
│       ├── privacy.ts
│       ├── supabase.ts
│       └── types.ts
├── supabase/
│   ├── email-templates/
│   │   ├── README.md
│   │   ├── confirm-signup.html
│   │   ├── magic-link.html
│   │   └── reset-password.html
│   ├── functions/
│   │   └── admin-access/index.ts
│   └── migrations/
│       ├── 0001_initial_showcase.sql
│       ├── 0002_import_product_images.sql
│       └── 0003_self_host_product_images.sql
└── tests/
    └── project.test.mjs
```

Inclua também `public/pwa/icon-192.png`, `public/pwa/icon-512.png`, o banner final em `public/brand/`, um gerador reproduzível dos ativos sociais e dois documentos separados: manual operacional e dossiê de continuidade. Não substitua o README por esses documentos.

Adapte nomes de arquivos somente quando houver justificativa técnica, sem remover nenhuma capacidade.

### 5. Variáveis de ambiente

O cliente web pode receber somente valores públicos:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_ADMIN_EMAIL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

Regras:

- forneça `.env.example` somente com nomes e placeholders;
- não exponha `service_role`, senha de banco, token pessoal do GitHub, segredo SMTP ou qualquer chave privada;
- nunca use `service_role` no navegador, no workflow de keepalive ou em arquivo versionado;
- uma chave publicável/anon está sujeita a RLS e pode ser usada pelo frontend e pelo robô apenas nas leituras públicas autorizadas;
- se houver segredo necessário no servidor, grave-o exclusivamente no cofre de variáveis da plataforma e jamais no Git;
- não imprima valores sensíveis durante testes ou entrega.

### 6. Identidade visual e logomarca

Crie a identidade somente depois que o usuário definir nome e preferências. A marca deve ser legível em celular, desktop e e-mail.

Quando a empresa atuar com manutenção:

- ícones Android, iPhone/iOS, celular, chave, ferramenta, raio ou reparo indicam **serviços e dispositivos atendidos**;
- esses ícones não transformam a marca em propriedade da Apple ou do Android;
- não escreva nem sugira afiliação oficial se ela não existir;
- prefira a redação “Assistência técnica”, “Android” e “iPhone/iOS” como capacidades da loja;
- respeite marcas registradas e não declare certificação não comprovada.

Gere:

- SVG leve para o site, com `title`, texto alternativo e dimensões adequadas;
- PNG otimizado para os e-mails, porque muitos clientes de e-mail removem SVG;
- alternativa textual visível caso a imagem do e-mail seja bloqueada;
- variação que funcione em fundo claro e escuro;
- favicon/ícone quando aplicável.

Para compartilhamento e instalação, gere e conecte obrigatoriamente:

- banner Open Graph estático de **1200 × 630 px**, com a logomarca inteira dentro de uma área segura e sem texto ou símbolo tocando as bordas;
- arquivo específico ou equivalente para Twitter/X Card;
- `favicon.ico`, `icon.png` de 512 × 512 px e `apple-icon.png` de 180 × 180 px;
- ícones PWA de 192 × 192 px e 512 × 512 px, com margem interna suficiente para uso `maskable`;
- `manifest.ts`/`manifest.webmanifest` com nome, nome curto, cores, `start_url`, `scope`, `display: standalone` e ícones;
- `metadataBase`, Open Graph, Twitter Card e dados Apple no layout raiz, usando a URL oficial de produção;
- texto alternativo para as imagens sociais.

O banner precisa ser validado pelo tamanho real do arquivo e em uma prévia de link. Nunca confie à geração automática a escrita final do nome: aplique a logomarca oficial como ativo exato para impedir letras erradas. A imagem intermediária de fundo não é o banner final e não deve ser publicada nem apresentada como entrega concluída.

Não use emoji como ícone de interface. Use SVG próprio para busca, olhos de senha, fechar, menu, telefone, WhatsApp, localização e demais ações. Respeite `prefers-reduced-motion` em animações.

### 7. Vitrine pública

A rota `/` deve ser uma vitrine rápida e indexável, com atualização controlada de dados do catálogo. Ela deve conter:

- cabeçalho fixo ou aderente, logomarca, “Produtos”, “Minha conta” e “Admin”;
- hero com slogan, descrição, chamada “Ver produtos” e identidade visual;
- cartão de resumo da loja e situação da vitrine;
- bloco institucional ou de serviços coerente com o segmento escolhido; mostrar assistência técnica somente quando ela realmente fizer parte do negócio;
- catálogo com campo “Buscar produto” e filtro por categoria;
- cartões de produtos com imagem, selo, nome, descrição curta, preço atual, preço anterior e desconto calculado;
- detalhe do produto em modal acessível ou página dedicada;
- botão de interesse que abre o WhatsApp com mensagem pré-preenchida, sem fingir pagamento ou pedido concluído;
- endereço, telefone, WhatsApp, mapa/rota e rodapé;
- estados de carregamento, vazio e erro;
- dados de demonstração locais se o Supabase estiver temporariamente indisponível, sem mascarar falha no ambiente de produção.

A busca deve ser insensível a maiúsculas/minúsculas e considerar ao menos nome e descrição curta. Na versão completa, permita também marca, modelo, especificações e tags quando esses dados existirem.

Regras do produto:

- preço armazenado em `price_cents` e formatado em `pt-BR`;
- `compare_at_cents` só pode existir se for maior ou igual ao preço atual;
- o percentual de desconto é calculado, não digitado separadamente;
- produto despublicado permanece no banco com `active = false`;
- disponibilidade usa `available`, `unavailable` ou `coming_soon`;
- slug sem acentos, minúsculo e separado por hífens;
- SKU, quando informado, é único;
- imagem ausente recebe placeholder digno e texto alternativo;
- o catálogo final não depende de URL temporária ou servidor de terceiros para abrir imagens.

### 8. Responsividade e acessibilidade

O sistema precisa funcionar bem em celular real, inclusive iPhone/Safari, e em desktop:

- 375–639 px: duas colunas quando os cartões continuarem legíveis; usar uma coluna em conteúdos longos;
- 640–1023 px: duas ou três colunas;
- 1024–1439 px: quatro colunas quando o design suportar;
- 1440 px ou mais: até cinco colunas;
- controles tocáveis com aproximadamente 44 × 44 px ou mais;
- contraste suficiente, foco visível, navegação por teclado e rótulos de formulário;
- modal com fechamento por botão, Escape e clique externo quando seguro;
- imagens responsivas, lazy loading fora da primeira dobra e texto `alt` descritivo;
- nenhuma rolagem horizontal acidental;
- mensagens de erro não dependem apenas de cor.

#### 8.1 Contraste obrigatório em campos e botões escuros

Todo campo com fundo preto ou escuro deve permanecer legível enquanto está vazio, preenchido, focado, validado e preenchido automaticamente pelo navegador. Esta regra vale para login, cadastro, confirmação de cadastro, recuperação de senha, definição de nova senha, OTP administrativo e todos os formulários do painel.

Requisitos obrigatórios:

- texto digitado em `input`, `textarea` e `select` escuros: branco (`#fff` ou contraste equivalente aprovado);
- cursor de digitação: branco por meio de `caret-color`;
- placeholder: tom claro visível, com `opacity: 1`;
- autofill do Chrome e do Safari/iPhone: manter fundo escuro e texto branco com regras `:-webkit-autofill` e `-webkit-text-fill-color`;
- opções de `select`: fundo escuro e texto branco;
- rótulos, dicas, nomes de arquivo e mensagens dentro de superfícies escuras: claros e legíveis;
- botões escuros: texto e ícones brancos; botões claros/rosé: texto escuro;
- foco com contorno visível sem reduzir o contraste do conteúdo;
- o botão nativo de seleção de arquivo deve continuar legível: estilize `::file-selector-button` separadamente e não aplique branco sobre fundo branco;
- não use cor herdada da identidade visual para texto digitado quando isso produzir texto marrom, preto ou invisível sobre campo escuro.

Use uma classe compartilhada ou variáveis CSS para impedir correções isoladas. Valide em Safari/iPhone, Chrome/Android e desktop, incluindo preenchimento automático de e-mail e senha.

Adicione uma navegação inferior responsiva, compatível com a área segura do iPhone, com Início, Produtos, Conta/Entrar e Mais. Ela deve acompanhar o estado real da sessão, mostrar o painel somente após confirmação por `is_admin()`, oferecer logout e fechar por toque externo ou tecla Escape. O botão Início deve lembrar de forma segura até 100 localizações internas da sessão e voltar uma tela por toque, sem aceitar URL externa ou caminho inseguro.

### 9. Temas visuais

Crie e semeie cinco temas:

1. azul;
2. vermelho;
3. verde;
4. roxo;
5. laranja.

Cada tema contém cor primária, secundária, fundo, superfície e texto. O tema ativo é salvo em `store_theme`, lido pela vitrine e aplicado por variáveis CSS. O administrador deve trocar o tema sem alterar código e sem publicar um novo deploy.

### 10. Conta do cliente

A rota `/conta` deve ter três modos: login, cadastro e recuperação de senha.

#### 10.1 Login

- solicitar e-mail e senha;
- usar `signInWithPassword`;
- permitir mostrar/ocultar senha com ícone SVG e `aria-label`;
- exibir erro claro sem revelar se uma conta específica existe além do comportamento seguro do provedor;
- não colocar senha em URL, log, banco público ou mensagem.

#### 10.2 Cadastro

- solicitar nome completo, e-mail, senha e confirmação;
- exigir no mínimo 8 caracteres, uma letra e um número;
- usar `signUp`;
- enviar código numérico de 6 dígitos no e-mail;
- confirmar no próprio site com `verifyOtp` usando o tipo aceito pela versão fixada do `@supabase/supabase-js`; na documentação JavaScript atual, o token digitado de confirmação por e-mail usa `type: "email"` e os tipos antigos `signup`/`magiclink` não devem ser copiados sem validação;
- permitir reenvio com `auth.resend({ type: "signup" })`;
- depois da confirmação, criar/atualizar `profiles` apenas para o próprio usuário;
- conservar o nome completo tanto nos metadados seguros do cadastro quanto no perfil, para que ele não desapareça ao trocar de navegador;
- restaurar ou abrir a sessão após confirmar o cadastro e encaminhar o usuário para a vitrine sem exigir uma segunda entrada quando o provedor já devolveu sessão válida;
- não enviar link de confirmação nem redirecionar para `localhost`.

#### 10.3 Recuperação

- iniciar com `resetPasswordForEmail`;
- enviar código numérico de 6 dígitos;
- validar com `verifyOtp` e tipo `recovery`;
- solicitar senha nova com as mesmas regras;
- executar `updateUser({ password })`;
- manter ou restaurar a sessão válida depois da alteração e levar o cliente de volta à vitrine; só solicitar novo login quando a sessão realmente não puder ser recuperada;
- não enviar link de recuperação nem redirecionar para `localhost`.

#### 10.4 Campo de e-mail

Pode oferecer um seletor auxiliar de domínios comuns, sem impedir qualquer e-mail válido. Inclua pelo menos:

- gmail.com;
- hotmail.com;
- outlook.com;
- icloud.com;
- yahoo.com.br.

Nunca limite o sistema somente a esses domínios.

Mascarar parcialmente todo e-mail exibido na interface. A conta deve observar `getSession()` e `onAuthStateChange`, mostrar claramente quando já está conectada e oferecer saída local explícita. Uma conta comum não deve ser desconectada apenas por visitar `/admin`; ela deve receber uma negativa clara e continuar autenticada em sua área de cliente.

### 11. Painel administrativo

A rota `/admin` deve ser protegida e não deve criar administrador automaticamente.

Fluxo obrigatório em duas etapas:

1. pedir um PIN administrativo de 4 dígitos apenas como barreira prévia ao disparo do e-mail;
2. validar o PIN exclusivamente em Edge Function, usando segredo/hash protegido no servidor, comparação segura, no máximo cinco falhas e bloqueio temporário de dez minutos;
3. localizar o e-mail proprietário no banco protegido, nunca em variável pública nem no componente do navegador;
4. mascarar o e-mail antes de devolvê-lo ao frontend;
5. limitar o envio do código a uma vez por minuto e restringir CORS aos domínios oficiais;
6. solicitar OTP no servidor com `signInWithOtp({ email, options: { shouldCreateUser: false } })`;
7. enviar código de 6 dígitos no e-mail personalizado;
8. validar no servidor com `verifyOtp({ email, token, type: "email" })`;
9. confirmar novamente a associação administrativa ativa;
10. abrir a sessão recebida e chamar a função RPC `is_admin`;
11. liberar o painel apenas se a função devolver `true`;
12. se a pessoa já estiver autenticada como cliente comum, negar a administração sem apagar a sessão dela;
13. permitir logout explícito.

O código deve expirar, funcionar uma vez conforme o Supabase Auth e aceitar somente a solicitação mais recente. Nunca grave o PIN puro, o e-mail proprietário, a `service_role` ou tokens na interface pública. Se uma Edge Function precisar da `service_role`, use somente o segredo interno gerenciado automaticamente pelo Supabase e nunca o devolva ao cliente. O painel não pode confiar apenas em esconder botões no frontend; toda escrita é protegida por RLS.

Funções mínimas do painel:

- estatísticas de total de produtos, ativos e em promoção;
- listar produtos, categorias e temas;
- criar, editar e salvar produto;
- converter valores em reais para centavos antes de salvar;
- editar categoria, descrições, imagem, selo, destaque, disponibilidade e ordem;
- despublicar produto com `active = false`, preservando o registro e permitindo futura republicação;
- trocar o tema ativo;
- estados de salvamento, erro e confirmação;
- interface responsiva.

Comportamento obrigatório das ações do painel:

- `Editar` deve carregar todos os dados do produto no mesmo formulário, limpar seleção de arquivo antiga, mostrar uma mensagem como “Editando: NOME” e rolar suavemente o formulário para a área visível em celular com `scrollIntoView`;
- o botão principal do formulário deve se chamar `Salvar produto`; ele cria quando não existe `draft.id` e atualiza quando existe `draft.id`;
- depois de salvar, recarregue a lista, mostre confirmação verdadeira e não descarte silenciosamente dados que falharam;
- uma ação que apenas muda `active` para `false` deve se chamar `Despublicar`, nunca `Salvar` nem `Arquivar`; explique que o produto sai da vitrine, mas permanece no banco;
- `Despublicar` exige confirmação, trata erro do Supabase e só mostra sucesso depois da atualização confirmada;
- se houver ação `Republicar`, ela deve fazer o inverso (`active = true`) e também confirmar o resultado;
- `Novo produto` deve limpar rascunho, uploads e mensagens antigas e levar o usuário ao formulário;
- botões que não enviam o formulário devem declarar `type="button"` para evitar submissão acidental;
- durante operações assíncronas, desabilite ações duplicadas e apresente estado de processamento;
- nomes longos, botões e cartões devem quebrar linha sem rolagem horizontal;
- todas as ações precisam funcionar por toque em celular, teclado e clique em desktop.

O banco também deve ficar preparado para administrar as demais entidades descritas abaixo, mesmo que a primeira interface exponha apenas catálogo e temas.

### 12. Supabase — extensões, tipos e esquemas

Crie as extensões `pgcrypto` e `citext` no esquema `extensions`.

Crie os enums:

```sql
product_stock_status = ('available', 'unavailable', 'coming_soon')
inquiry_status = ('new', 'contacted', 'closed', 'cancelled')
```

Crie o esquema `private` para funções internas. Revogue acessos públicos por padrão e conceda apenas o necessário.

### 13. Supabase — dicionário completo das 25 tabelas

Implemente exatamente as 25 tabelas públicas a seguir, mantendo tipos, restrições e relações equivalentes.

#### 13.1 `store_settings`

- `id boolean primary key default true check (id)` para singleton;
- `store_name text not null`;
- `tagline text not null`;
- `description text not null`;
- `logo_url text`;
- `hero_image_url text`;
- `whatsapp_number text`;
- `instagram_url text`;
- `contact_email citext not null`;
- `updated_at timestamptz not null default now()`.

#### 13.2 `themes`

- `id uuid primary key default gen_random_uuid()`;
- `slug text not null unique`;
- `name text not null`;
- `primary_color text not null`;
- `secondary_color text not null`;
- `background_color text not null`;
- `surface_color text not null`;
- `text_color text not null`;
- `created_at timestamptz not null default now()`.

#### 13.3 `store_theme`

- singleton boolean em `id`;
- `theme_id uuid not null` → `themes(id)` com `on delete restrict`;
- `updated_at timestamptz not null default now()`.

#### 13.4 `profiles`

- `user_id uuid primary key` → `auth.users(id)` com `on delete cascade`;
- `full_name text`;
- `phone text`;
- `created_at` e `updated_at` com `now()`.

#### 13.5 `admin_memberships`

- `id uuid primary key`;
- `user_id uuid unique` → `auth.users(id)` com `on delete cascade`, inicialmente opcional;
- `email citext not null unique`;
- `role text not null default 'owner'`, limitado a `owner`, `manager` ou `editor`;
- `active boolean not null default true`;
- `created_at timestamptz not null default now()`.

#### 13.6 `categories`

- `id uuid primary key`;
- `name text not null`;
- `slug text not null unique`;
- `description text`;
- `active boolean not null default true`;
- `sort_order integer not null default 0`;
- timestamps de criação e atualização.

#### 13.7 `products`

- `id uuid primary key`;
- `category_id uuid not null` → `categories(id)` com `on delete restrict`;
- `name text not null`;
- `slug text not null unique`;
- `short_description text not null default ''`;
- `description text not null default ''`;
- `sku text unique`;
- `price_cents integer not null check >= 0`;
- `compare_at_cents integer`, nulo ou maior/igual a `price_cents`;
- `image_url text`;
- `badge text`;
- `featured boolean not null default false`;
- `active boolean not null default true`;
- `stock_status product_stock_status not null default 'available'`;
- `sort_order integer not null default 0`;
- `source_url text`;
- timestamps de criação e atualização.

#### 13.8 `product_images`

- `id uuid primary key`;
- `product_id uuid not null` → `products(id)` com `on delete cascade`;
- `storage_path text`;
- `external_url text`;
- `alt_text text not null default ''`;
- `sort_order integer not null default 0`;
- `created_at timestamptz not null default now()`;
- restrição `num_nonnulls(storage_path, external_url) = 1`.

#### 13.9 `product_variants`

- `id uuid primary key`;
- `product_id uuid not null` → `products(id)` com `on delete cascade`;
- `name text not null`;
- `value text not null`;
- `sku text unique`;
- `price_delta_cents integer not null default 0`;
- `active boolean not null default true`;
- `sort_order integer not null default 0`;
- `created_at timestamptz not null default now()`.

#### 13.10 `tags`

- `id uuid primary key`;
- `name text not null`;
- `slug text not null unique`;
- `created_at timestamptz not null default now()`.

#### 13.11 `product_tags`

- `product_id uuid` → `products(id)` com `on delete cascade`;
- `tag_id uuid` → `tags(id)` com `on delete cascade`;
- chave primária composta `(product_id, tag_id)`.

#### 13.12 `banners`

- `id uuid primary key`;
- `title text not null`;
- `subtitle text`;
- `image_url text`;
- `link_url text`;
- `active boolean not null default true`;
- `starts_at timestamptz`;
- `ends_at timestamptz`;
- `sort_order integer not null default 0`;
- timestamps de criação e atualização.

#### 13.13 `featured_sections`

- `id uuid primary key`;
- `title text not null`;
- `slug text not null unique`;
- `active boolean not null default true`;
- `sort_order integer not null default 0`;
- `created_at timestamptz not null default now()`.

#### 13.14 `featured_section_products`

- `section_id uuid` → `featured_sections(id)` com `on delete cascade`;
- `product_id uuid` → `products(id)` com `on delete cascade`;
- `sort_order integer not null default 0`;
- chave primária composta `(section_id, product_id)`.

#### 13.15 `favorites`

- `user_id uuid` → `auth.users(id)` com `on delete cascade`;
- `product_id uuid` → `products(id)` com `on delete cascade`;
- `created_at timestamptz not null default now()`;
- chave primária composta `(user_id, product_id)`.

#### 13.16 `inquiries`

- `id uuid primary key`;
- `user_id uuid` opcional → `auth.users(id)` com `on delete set null`;
- `customer_name text not null`;
- `customer_email citext`;
- `customer_phone text`;
- `message text`;
- `status inquiry_status not null default 'new'`;
- timestamps de criação e atualização.

#### 13.17 `inquiry_items`

- `id uuid primary key`;
- `inquiry_id uuid not null` → `inquiries(id)` com `on delete cascade`;
- `product_id uuid` opcional → `products(id)` com `on delete set null`;
- `product_name text not null` como fotografia histórica do nome;
- `quantity integer not null default 1 check > 0`;
- `noted_price_cents integer`, nulo ou maior/igual a zero.

#### 13.18 `email_events`

- `id uuid primary key`;
- `user_id uuid` opcional → `auth.users(id)` com `on delete set null`;
- `recipient_hash text not null`, nunca o e-mail puro quando o objetivo for auditoria anonimizada;
- `purpose text not null`;
- `provider text not null`;
- `status text not null`;
- `provider_message_id text`;
- `error_code text`;
- `created_at timestamptz not null default now()`.

#### 13.19 `audit_logs`

- `id bigint generated always as identity primary key`;
- `actor_id uuid` opcional → `auth.users(id)` com `on delete set null`;
- `action text not null`;
- `entity_type text not null`;
- `entity_id text`;
- `before_data jsonb`;
- `after_data jsonb`;
- `created_at timestamptz not null default now()`.

#### 13.20 `import_jobs`

- `id uuid primary key`;
- `requested_by uuid` opcional → `auth.users(id)` com `on delete set null`;
- `source_name text not null`;
- `source_url text`;
- `status text not null default 'pending'`, limitado a `pending`, `running`, `completed`, `failed`, `cancelled`;
- `total_items integer not null default 0`;
- `imported_items integer not null default 0`;
- `error_message text`;
- `created_at timestamptz not null default now()`;
- `finished_at timestamptz`.

#### 13.21 `import_items`

- `id uuid primary key`;
- `import_job_id uuid not null` → `import_jobs(id)` com `on delete cascade`;
- `external_key text`;
- `product_id uuid` opcional → `products(id)` com `on delete set null`;
- `raw_data jsonb not null default '{}'`;
- `status text not null default 'pending'`, limitado a `pending`, `imported`, `skipped`, `failed`;
- `error_message text`;
- `created_at timestamptz not null default now()`.

#### 13.22 `media_library`

- `id uuid primary key`;
- `storage_path text not null unique`;
- `file_name text not null`;
- `mime_type text not null`;
- `size_bytes bigint not null check >= 0`;
- `alt_text text not null default ''`;
- `uploaded_by uuid` opcional → `auth.users(id)` com `on delete set null`;
- `created_at timestamptz not null default now()`.

#### 13.23 `site_pages`

- `id uuid primary key`;
- `slug text not null unique`;
- `title text not null`;
- `content jsonb not null default '{}'`;
- `active boolean not null default true`;
- timestamps de criação e atualização.

#### 13.24 `seo_redirects`

- `id uuid primary key`;
- `source_path text not null unique`;
- `destination_path text not null`;
- `permanent boolean not null default true`;
- `active boolean not null default true`;
- `created_at timestamptz not null default now()`.

#### 13.25 `contact_links`

- `id uuid primary key`;
- `kind text not null`;
- `label text not null`;
- `value text`;
- `url text`;
- `active boolean not null default true`;
- `sort_order integer not null default 0`;
- `created_at timestamptz not null default now()`.

### 14. Índices, gatilhos e funções

Crie índices para as consultas reais, incluindo:

- categoria, atividade e ordem dos produtos;
- produtos em destaque com índice parcial;
- pesquisa textual em português por nome e descrições usando GIN;
- imagens e variantes por produto e ordem;
- categorias e seções por atividade e ordem;
- banners por atividade e janela de datas;
- favoritos por produto;
- consultas e itens por usuário/status/data;
- eventos de e-mail por usuário/data;
- auditoria por entidade e data;
- importações por solicitante/status;
- páginas, redirecionamentos e contatos ativos.

Crie `set_updated_at()` e gatilhos `before update` em:

- `store_settings`;
- `profiles`;
- `categories`;
- `products`;
- `banners`;
- `inquiries`;
- `site_pages`.

Crie duas funções administrativas:

1. `private.is_admin()` como `security definer`, `stable`, com `search_path` travado, verificando `auth.uid()` ou o e-mail do JWT contra um registro ativo em `admin_memberships`;
2. `public.is_admin()` como invólucro `security invoker` que devolve o resultado booleano da função privada.

Revogue `execute` de `public` onde for necessário e conceda somente a `anon`/`authenticated` o estritamente exigido. A função privada não deve ficar diretamente exposta.

### 15. Row Level Security obrigatória

Ative RLS nas 25 tabelas. Não aceite tabela pública sem RLS.

Em projetos Supabase novos, tabelas podem não ser expostas automaticamente à Data API. Configure conscientemente a exposição do schema e conceda `GRANT` somente às tabelas e operações de que `anon` e `authenticated` realmente precisam. `GRANT` define acesso à API; RLS continua obrigatória para limitar as linhas. Não desative RLS para corrigir erro de acesso.

Políticas mínimas:

- leitura pública somente de configurações, tema e dados ativos destinados à vitrine;
- categorias/produtos/imagens/variantes/banners/seções/páginas/redirecionamentos/contatos inativos visíveis apenas ao administrador;
- banners públicos somente dentro da janela `starts_at`/`ends_at` quando informada;
- perfil: usuário lê, cria e atualiza apenas a própria linha;
- favoritos: usuário autenticado manipula apenas seus próprios favoritos;
- consultas: usuário lê as próprias; visitante pode criar uma consulta válida conforme a regra definida; administrador gerencia todas;
- itens da consulta seguem a autorização da consulta pai;
- `admin_memberships`, `email_events`, `audit_logs`, importações e biblioteca de mídia protegidos para administrador;
- administrador autenticado tem CRUD nas entidades operacionais por meio de `public.is_admin()`;
- nenhuma regra deve confiar em e-mail vindo do formulário do navegador para conceder administração;
- políticas de `update` incluem `select`, `using` e `with check` adequados; sem política de leitura, uma atualização pode afetar zero linhas sem erro;
- não use `user_metadata` editável pelo usuário para autorização; use associação protegida no banco ou `app_metadata` controlado pelo servidor;
- teste explicitamente as políticas com sessão anônima, usuário comum e administrador.

### 16. Storage

Crie o bucket público `product-images` com:

- tamanho máximo de 5 MB por arquivo;
- MIME permitido: JPEG, PNG, WebP e AVIF;
- leitura pública;
- inserção, atualização e exclusão somente por administrador confirmado por `public.is_admin()`;
- políticas corretas de `select`, `insert`, `update` e `delete`, lembrando que `upsert` pode exigir mais de uma permissão;
- caminhos previsíveis e únicos;
- metadados correspondentes em `product_images` ou `media_library`.

Para a primeira publicação, prefira imagens finais locais em `/public/products` quando isso eliminar dependência de terceiros. Use o bucket para a manutenção posterior pelo administrador.

### 17. Migrações e dados iniciais

As migrações devem ser reproduzíveis, ordenadas e versionadas:

1. criar extensões, enums, tabelas, índices, funções, gatilhos, RLS, políticas, bucket e sementes;
2. importar/mapear imagens autorizadas e os preços visíveis da fotografia inicial do catálogo;
3. substituir URLs externas por arquivos WebP locais do próprio projeto.

Semeie:

- `store_settings` com os dados escolhidos na execução;
- o e-mail administrativo escolhido em `admin_memberships`, sem senha e sem chave secreta;
- cinco temas e um tema ativo;
- categorias do catálogo;
- produtos reais fornecidos/autorizados pelo usuário;
- ordens de exibição coerentes.

Quando o usuário pedir o catálogo completo, percorra todas as categorias, paginações e variações públicas abrangidas pelo link e registre a contagem encontrada antes de importar. Preserve a quantidade confirmada sem omissão, duplicação, troca de imagem ou troca de preço. Deduplique por SKU/referência, variação, slug e chave externa antes de inserir.

### 18. Imagens e ativos

- baixe somente imagens que o usuário autorizou usar;
- mantenha cada embalagem, rótulo e produto inteiro, sem corte que esconda a identificação;
- confirme que a imagem pertence exatamente ao produto, volume/tamanho e preço registrados;
- converta as imagens do catálogo para WebP ou AVIF em dimensões adequadas, preservando boa qualidade;
- use nomes determinísticos como `product-01.webp`;
- verifique que todos os arquivos abrem de verdade;
- rejeite arquivo que contenha texto de data URI no lugar dos bytes da imagem, ou corrija-o no script de preparação;
- use `scripts/prepare-assets.mjs` antes do build para corrigir/validar ativos quando necessário;
- nenhuma imagem final pode depender de host temporário que quebre depois do deploy;
- mantenha imagem de e-mail pequena e otimizada;
- nunca substitua silenciosamente a foto ou o produto do usuário.

### 19. E-mails do Supabase Auth

Configure três modelos completos:

1. confirmação de cadastro;
2. acesso administrativo por OTP;
3. recuperação de senha.

Todos devem:

- estar em português do Brasil;
- usar HTML de tabelas e estilos inline para máxima compatibilidade;
- ter preheader oculto, cabeçalho com marca, título, explicação, código em tamanho grande, validade e aviso de segurança;
- usar a imagem PNG otimizada da marca e manter o nome da empresa em texto;
- funcionar com Gmail, Outlook, iCloud e clientes móveis;
- conter o token `{{ .Token }}` em uma caixa visual grande e legível;
- não conter `{{ .ConfirmationURL }}`, botão, link clicável ou `localhost`;
- informar que ninguém da loja solicitará o código;
- orientar a ignorar o e-mail quando a pessoa não iniciou a ação;
- ser coerentes com a identidade visual escolhida;
- comunicar os serviços Android/iPhone/iOS apenas quando isso for verdadeiro para a empresa;
- continuar compreensíveis se o cliente de e-mail bloquear imagens: nome da empresa, finalidade e código devem existir como texto HTML;
- usar no máximo uma logomarca externa pequena e otimizada, servida por HTTPS público estável, com dimensões declaradas e `alt` correto;
- evitar SVG, Base64, JavaScript, fontes remotas obrigatórias, vídeo, formulário e CSS externo;
- ter largura máxima aproximada de 600 px, HTML com tabelas e CSS inline para não travar nem deformar a caixa de entrada.

Assuntos obrigatórios, adaptando apenas o nome da marca:

- `Seu código de cadastro — {{NOME_DO_PROJETO}}`;
- `Seu código de acesso — {{NOME_DO_PROJETO}}`;
- `Seu código para redefinir a senha — {{NOME_DO_PROJETO}}`.

#### 19.1 OTP de exatamente 6 dígitos — configuração e código

Não basta escrever “6 dígitos” na interface. O comprimento real é definido no provedor de e-mail do Supabase Auth e deve ser configurado e comprovado.

No Dashboard do Supabase, em Authentication > Sign In / Providers > Email, defina **Email OTP length = 6**. Não deixe o valor 8. Defina a validade conforme a política do projeto, normalmente 3600 segundos, e salve a configuração. Depois, recarregue a página e confirme que o valor persistiu.

No frontend, todo componente de código deve:

- aceitar somente números;
- remover caracteres não numéricos com lógica equivalente a `value.replace(/\D/g, "").slice(0, 6)`;
- usar `inputMode="numeric"`, `autoComplete="one-time-code"`, `maxLength={6}` e padrão numérico apropriado;
- habilitar confirmação somente quando houver exatamente 6 dígitos;
- jamais gerar, completar, cortar ou validar apenas os seis primeiros caracteres de um token de 8 dígitos;
- informar erro claro quando o código estiver incompleto, expirado ou tiver sido substituído por solicitação mais recente.

Use os tipos corretos da versão fixada do cliente Supabase e valide-os nos testes reais:

- cadastro com senha: `signUp(...)`; na documentação JavaScript atual, confirme o código digitado com `verifyOtp({ email, token, type: "email" })`; o reenvio de confirmação continua usando `auth.resend({ type: "signup", email })`;
- acesso administrativo: `signInWithOtp({ email, options: { shouldCreateUser: false } })`, seguido de `verifyOtp({ email, token, type: "email" })`;
- recuperação: `resetPasswordForEmail(email)`, seguido de `verifyOtp({ email, token, type: "recovery" })` e `updateUser({ password })`.

Não copie valores de `type` de exemplos antigos. `signup` e `magiclink` estão depreciados como tipos de verificação digitada em clientes atuais, embora `signup` continue existindo na operação de reenvio. Confirme a assinatura do `@supabase/supabase-js` instalado, fixe a versão e prove os três fluxos. O último código solicitado é o único que deve ser usado.

#### 19.2 SMTP de produção

Ative `Custom SMTP` no Supabase. Não declare entrega de e-mail concluída usando somente o SMTP padrão de teste do Supabase.

Em projetos novos do plano gratuito, a personalização dos templates pode exigir Custom SMTP ativo. Configure o SMTP antes de considerar os modelos personalizados concluídos.

Configuração mínima:

- remetente: endereço real autorizado pelo usuário;
- nome do remetente: nome público do projeto;
- host, porta, usuário e senha compatíveis com o provedor;
- intervalo mínimo por usuário de pelo menos 60 segundos, salvo política mais restritiva;
- senha SMTP armazenada somente na configuração protegida do Supabase, nunca no código, `.env` público, commit, log ou conversa.

Se o usuário escolher Gmail/Google Workspace:

- host `smtp.gmail.com`;
- porta `465` com conexão segura ou `587` com STARTTLS, conforme a opção aceita pelo Supabase;
- usuário igual ao endereço completo do Gmail remetente;
- senha de app do Google com 16 caracteres, criada com verificação em duas etapas; nunca usar a senha comum da conta;
- remover espaços da senha de app somente na hora de preencher o campo protegido;
- confirmar que o remetente e o usuário pertencem à mesma conta autorizada.

Para volume comercial, recomende e aceite provedor transacional com domínio autenticado, SPF, DKIM e DMARC. Gmail pode servir para baixo volume, mas o teste real de entrega continua obrigatório.

#### 19.3 URL oficial e bloqueio de `localhost`

No Supabase Auth, configure:

- `Site URL`: `https://{{DOMINIO_OFICIAL}}`;
- `Redirect URLs`: `https://{{DOMINIO_OFICIAL}}/**` e somente outras URLs oficiais necessárias;
- `localhost` apenas em ambiente de desenvolvimento, nunca como Site URL de produção, URL de e-mail, metadata, variável da Vercel ou destino de recuperação/cadastro publicado.

Na Vercel, defina a URL canônica de produção nas variáveis e metadados do projeto. Procure no repositório e no HTML publicado por `localhost`, `127.0.0.1` e URLs de preview indevidas. O build de produção deve falhar ou o aceite deve ser bloqueado se qualquer fluxo de e-mail apontar para endereço local.

Embora este sistema use código digitado e `detectSessionInUrl: false`, a Site URL precisa estar correta porque o Supabase pode usá-la como fallback.

#### 19.4 Verificação real de entrega

Depois de salvar SMTP, provedor, URLs, assuntos e templates:

1. recarregue cada tela do Dashboard e confirme que os valores persistiram;
2. solicite um código de cadastro, um administrativo e um de recuperação usando caixas reais autorizadas;
3. confirme no Supabase Auth Log que cada `POST /otp` ou operação equivalente concluiu com status de sucesso e sem erro SMTP;
4. confirme o recebimento real na caixa de entrada e verifique também spam/lixo eletrônico;
5. abra cada mensagem em celular e desktop, com imagens habilitadas e bloqueadas;
6. confirme visualmente que cada mensagem contém exatamente 6 dígitos, a logomarca não trava o carregamento, o texto alternativo funciona e não existe `localhost` nem link de autenticação;
7. digite o código no site e conclua cada fluxo até o estado final esperado;
8. solicite um novo código e prove que a interface orienta a usar somente o mais recente.

Resposta HTTP 200 no pedido de OTP prova apenas que o Supabase aceitou a solicitação; não prova que o e-mail chegou. A entrega só pode ser marcada como verificada depois da confirmação na caixa real.

Antes de implementar, confira novamente a documentação oficial atual de [login por OTP](https://supabase.com/docs/guides/auth/auth-email-passwordless), [templates de e-mail](https://supabase.com/docs/guides/auth/auth-email-templates), [SMTP personalizado](https://supabase.com/docs/guides/auth/auth-smtp), [URLs de redirecionamento](https://supabase.com/docs/guides/auth/redirect-urls) e o [changelog do Supabase](https://supabase.com/changelog). Se a interface ou a assinatura do cliente tiver mudado, siga a documentação da versão fixada e atualize os testes deste projeto antes de publicar.


### 20. Cliente Supabase

Crie um singleton do cliente no navegador com:

- `persistSession: true`;
- `autoRefreshToken: true`;
- `detectSessionInUrl: false`, porque os fluxos usam códigos digitados no site;
- singleton de navegador, `getSession()` inicial e observador `onAuthStateChange` para manter a interface sincronizada;
- URL e chave publicável vindas das variáveis públicas;
- erro claro na configuração ausente;
- nenhuma chave privilegiada.

Carregue categorias, produtos, configurações e tema em paralelo quando possível. A página pública pode usar revalidação/ISR de aproximadamente 60 segundos. Falhas devem ser registradas sem expor dados sensíveis.

### 21. Robô diário real do Supabase

Crie obrigatoriamente `.github/workflows/supabase-keepalive.yml` no repositório novo.

Objetivo: produzir atividade diária verificável no banco Supabase do projeto por meio de uma consulta REST real protegida pelas políticas públicas de leitura.

Requisitos obrigatórios:

- dois horários UTC por dia, fora do minuto zero, para redundância;
- `workflow_dispatch` para teste manual;
- disparo em `push` quando o próprio workflow for criado/alterado, para o primeiro teste imediato;
- `permissions: contents: read`;
- `concurrency` sem cancelamento da execução em andamento;
- `timeout-minutes: 5`;
- carregar somente `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` do ambiente versionado ou das variáveis do repositório;
- nunca usar `service_role`;
- consultar `GET /rest/v1/store_settings?select=id&limit=1` com `apikey`, `Authorization: Bearer` e `Accept: application/json`;
- confirmar que `store_settings` foi explicitamente exposta à Data API para leitura mínima de `anon`, com RLS permitindo apenas a linha pública necessária;
- usar `curl --fail-with-body`, cinco tentativas, repetição para todos os erros, atraso entre tentativas, timeout de conexão e timeout total;
- exigir HTTP 200;
- exigir resposta JSON contendo a chave `id`;
- falhar visivelmente no GitHub Actions se qualquer verificação falhar;
- imprimir somente uma confirmação sem valores sensíveis.

Use esta lógica como referência obrigatória:

```yaml
name: Supabase Keepalive

on:
  schedule:
    - cron: "17 6 * * *"
    - cron: "43 18 * * *"
  workflow_dispatch:
  push:
    branches: [main]
    paths:
      - ".github/workflows/supabase-keepalive.yml"

permissions:
  contents: read

concurrency:
  group: supabase-keepalive
  cancel-in-progress: false

jobs:
  ping-database:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v4
      - name: Consultar banco do Supabase
        shell: bash
        run: |
          set -euo pipefail
          test -f .env.production
          set -a
          source .env.production
          set +a
          test -n "${NEXT_PUBLIC_SUPABASE_URL:-}"
          test -n "${NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:-}"
          response_file="${RUNNER_TEMP}/supabase-keepalive.json"
          http_code="$(curl --silent --show-error --fail-with-body \
            --retry 5 --retry-all-errors --retry-delay 10 \
            --connect-timeout 15 --max-time 45 \
            --output "${response_file}" --write-out "%{http_code}" \
            --header "apikey: ${NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}" \
            --header "Authorization: Bearer ${NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}" \
            --header "Accept: application/json" \
            "${NEXT_PUBLIC_SUPABASE_URL}/rest/v1/store_settings?select=id&limit=1")"
          test "${http_code}" = "200"
          grep -Eq '"id"[[:space:]]*:' "${response_file}"
          echo "Supabase respondeu com HTTP 200 e a consulta ao banco foi concluída."
```

Depois da publicação:

1. execute manualmente o workflow ou confirme o disparo do `push`;
2. abra o log do job e comprove HTTP 200;
3. confirme nos logs do Supabase a requisição REST à tabela;
4. deixe os agendamentos habilitados no branch padrão;
5. após sete dias, confira que houve execução em cada dia e que o projeto continua ativo;
6. se um dia falhar, investigue GitHub Actions, variáveis, RLS e disponibilidade do Supabase.

Não prometa garantia absoluta de horário: execuções agendadas do GitHub podem atrasar. Os dois horários, as cinco tentativas e o acionamento manual existem para aumentar a confiabilidade. Se a continuidade for crítica e contratualmente garantida, recomende um plano Supabase que não esteja sujeito à pausa por baixa atividade.

### 22. Exclusões de escopo, salvo solicitação expressa

Não implemente como se já existissem:

- pagamento online;
- PIX automático;
- cálculo de frete ou logística;
- checkout de comércio eletrônico;
- marketplace;
- sincronização contínua de preços de terceiros;
- clonagem da marca, do layout ou do código do site usado apenas como origem do catálogo;
- certificação oficial Apple/Android não comprovada.

O botão WhatsApp representa contato ou orçamento, não uma compra concluída.

### 23. Testes automatizados mínimos

Crie testes que leiam o código, templates e migrações e comprovem pelo menos:

1. admin usa OTP, e-mail fixo, `shouldCreateUser: false`, token numérico com exatamente 6 dígitos e tipo de verificação `email`;
2. os três e-mails contêm `{{ .Token }}`, declaram 6 dígitos e não contêm link, `ConfirmationURL` ou `localhost`;
3. a marca comunica corretamente o segmento escolhido e não reutiliza a identidade do sistema-base nem do site de origem;
4. conta oferece login, cadastro, recuperação, reenvio, seletor auxiliar de domínios e olhos SVG;
5. a migração cria exatamente 25 tabelas e ativa RLS nas 25;
6. a função administrativa e a associação inicial existem;
7. catálogo possui busca e cinco temas;
8. a quantidade esperada de produtos foi importada com os preços exatos da fotografia inicial;
9. todas as imagens finais estão hospedadas no próprio projeto e não usam URLs externas temporárias;
10. o robô tem `schedule`, `workflow_dispatch`, endpoint correto, cinco tentativas e nenhuma `service_role`;
11. este documento/memorial do projeto lista as 25 tabelas e as regras de infraestrutura nova.
12. navegação inferior, memória interna segura, conta conectada e bloqueio administrativo respeitam a sessão;
13. banner Open Graph mede 1200 × 630, a marca não está cortada e os ícones/manifesto existem nas medidas previstas;
14. o manifesto de importação relaciona cada URL, imagem, produto e preço, sem duplicação, `hotlink` ou sincronização automática;
15. uma alteração posterior feita pelo painel não é sobrescrita pelo importador inicial;
16. cadastro e administração usam o tipo de verificação de e-mail aceito pela versão atual fixada do cliente (atualmente `type: "email"` no JavaScript), recuperação usa `type: "recovery"`, e somente o reenvio do cadastro usa `auth.resend({ type: "signup" })`;
17. campos escuros têm texto, cursor, placeholder e autofill claros, inclusive regras `-webkit-text-fill-color` para Safari/iPhone;
18. botões escuros exibem texto branco e o botão nativo de arquivo continua legível;
19. `Editar` preenche o formulário, limpa upload anterior e chama rolagem até o formulário; `Salvar produto` diferencia inserção e atualização;
20. a ação de `active = false` é apresentada como `Despublicar`, pede confirmação, trata erro e preserva o registro;
21. nenhum arquivo de produção, template, metadata ou variável versionada contém `localhost` ou `127.0.0.1` como URL oficial;
22. nenhum segredo SMTP, senha de app, PIN puro, `service_role` ou segredo compartilhado aparece no repositório.

Execute, no mínimo:

```bash
npm test
npm run typecheck
npm run build
git diff --check
```

Quando existir um comando `npm run verify`, ele deve reunir testes, tipos e build.

### 24. Verificação real no navegador

Não considere o projeto pronto apenas porque compilou. Na URL de produção, teste:

- página inicial e carregamento das imagens;
- busca, categorias e produtos;
- detalhes do produto e WhatsApp;
- endereço, mapa e contatos;
- layout móvel e desktop;
- troca de tema;
- cadastro por código;
- login por senha;
- recuperação por código e troca de senha;
- admin por código de 6 dígitos;
- bloqueio de usuário comum na área administrativa;
- criação, edição, salvamento, despublicação e republicação de produto;
- ao tocar em `Editar` no celular, o formulário fica visível, preenchido e pronto para salvar;
- botões, rótulos e texto digitado permanecem visíveis em todos os campos escuros, inclusive com autofill no iPhone/Safari;
- logout;
- ausência de erros no console e de requisições quebradas.
- tags `og:image`, `twitter:image`, manifesto e ícones retornam URLs públicas válidas;
- compartilhamento do link mostra o banner completo e a instalação na tela inicial usa o ícone correto.

Faça testes com e-mail real autorizado pelo usuário. Verifique cadastro, administração e recuperação até o fim, e não apenas o disparo. Nunca copie um OTP para a conversa e nunca solicite senha.

### 25. GitHub

- crie repositório novo e privado com o slug escolhido;
- use branch padrão `main`;
- adicione arquivos do projeto, migrações, templates, ativos, testes, documentação e workflow;
- mantenha o prompt mestre em suas cópias previstas e atualize, em arquivos separados, o manual operacional e o dossiê de continuidade com data, evidências, último commit, ponto de parada e pendências reais;
- preserve lockfile;
- não registre `.env.local`, senhas, tokens ou chaves privadas;
- confirme que `.github/workflows/supabase-keepalive.yml` está no branch padrão;
- confirme o commit final e o estado limpo do repositório;
- não altere nem misture o repositório de outro projeto.

### 26. Vercel

Só decida a conta no momento da execução:

- opção A: criar o projeto na conta Vercel já autenticada;
- opção B: o usuário informa que usará uma conta Vercel nova, autentica-se pelo canal protegido e a IA cria o projeto nessa conta.

Em ambos os casos:

- crie um projeto Vercel novo;
- conecte-o ao repositório GitHub novo;
- configure as variáveis corretas do novo Supabase;
- publique produção;
- confira domínio, HTTPS e build;
- confirme no HTML publicado as metatags sociais, o manifesto e os ícones e teste os respectivos arquivos com HTTP 200;
- configure URL oficial no Supabase Auth;
- não reutilize variáveis de outro site.

### 27. Ordem obrigatória de execução

Siga esta ordem para reduzir erros:

1. coletar nome, identidade, contatos, link e autorização do catálogo, admin e decisão futura da Vercel;
2. criar diretório e código local;
3. criar conta/organização e projeto Supabase novos;
4. gerar e aplicar migrações completas;
5. validar as 25 tabelas, RLS, funções, bucket e sementes;
6. configurar Auth, `Email OTP length = 6`, SMTP, Site URL oficial, Redirect URLs e os três templates;
7. inventariar o link, importar os preços, baixar e hospedar as imagens autorizadas e validar o manifesto;
8. implementar vitrine, conta e painel;
9. criar o robô diário e seus testes;
10. rodar testes, tipos e build;
11. testar recebimento e conclusão dos três fluxos com códigos reais de exatamente 6 dígitos;
12. criar repositório GitHub privado novo e publicar o commit;
13. decidir com o usuário a conta Vercel e publicar;
14. testar todo o fluxo em produção;
15. confirmar a primeira execução real do keepalive;
16. validar banner social, favoritos e instalação na tela inicial;
17. atualizar prompt mestre, manual e dossiê;
18. entregar relatório final.

### 28. Critérios de aceite

O trabalho só está concluído quando:

- o nome foi escolhido pelo usuário e aplicado sem vestígios do projeto anterior;
- a logomarca e a identidade são novas e não pertencem ao sistema-base nem ao site de origem do catálogo;
- Supabase e GitHub são novos e independentes;
- a conta Vercel usada corresponde à decisão explícita do usuário;
- as 25 tabelas, 25 RLS, políticas, funções, gatilhos, índices e bucket existem;
- catálogo e imagens abrem em produção;
- a quantidade, as associações imagem/produto e os preços coincidem com a fotografia inicial registrada;
- alterações feitas no painel permanecem intactas e não são substituídas por sincronização externa;
- cadastro, login, recuperação e admin funcionam;
- todos os códigos têm 6 dígitos e chegam em e-mails personalizados;
- nenhum e-mail envia link de autenticação ou `localhost`;
- `Email OTP length` está salvo como 6 no provedor do Supabase, e não apenas escrito na interface;
- SMTP personalizado está salvo e os três recebimentos foram comprovados em caixas reais;
- Site URL e Redirect URLs de produção usam o domínio oficial e nenhum fallback publicado aponta para `localhost`;
- todos os campos pretos/escuros exibem texto digitado, cursor, placeholder e autofill claros em celular e desktop;
- `Editar` abre e preenche o formulário no celular; `Salvar produto` persiste a alteração; `Despublicar` preserva o registro e remove o item da vitrine;
- cliente comum não consegue executar ações administrativas;
- o workflow diário está no GitHub, executou contra o Supabase real e deixou log de HTTP 200;
- testes, tipos e build passam;
- o navegador não mostra erro crítico;
- o link compartilhado usa banner 1200 × 630 sem cortar a marca e os ícones aparecem em aba, favoritos e tela inicial;
- os arquivos estão no GitHub e a produção está acessível.

### 29. Proibições

- não inventar conclusão;
- não omitir tabela, política, e-mail, imagem ou fluxo;
- não pedir senha/login por mensagem;
- não expor OTP, token ou segredo;
- não usar `service_role` no frontend ou keepalive;
- não desativar RLS para “fazer funcionar”;
- não permitir que `signInWithOtp` crie administrador;
- não enviar autenticação por link quando a tela exige código;
- não deixar `Email OTP length` em 8 quando a interface exige 6;
- não cortar token de 8 dígitos para fingir que ele tem 6;
- não apontar produção para `localhost`;
- não declarar e-mail entregue apenas porque a API respondeu 200;
- não gravar senha SMTP ou senha de app do Google em código, arquivo versionado, log ou mensagem;
- não usar texto escuro, cor herdada ou autofill invisível em campo escuro;
- não deixar botão escuro com rótulo escuro ou ilegível;
- não chamar de `Arquivar` uma ação que apenas despublica o produto; use `Despublicar` e mantenha `Salvar produto` como ação separada;
- não considerar `Editar` funcional se ele não preencher e tornar o formulário visível no celular;
- não reutilizar conta/projeto Supabase ou repositório GitHub do sistema anterior;
- não reutilizar nome, logomarca ou identidade do sistema-base no novo projeto;
- não copiar marca, layout, código ou conteúdo institucional do site indicado apenas como origem das imagens e dos preços;
- não manter `hotlink` das imagens nem sincronização automática de preços sem ordem expressa;
- não sobrescrever alterações feitas no painel com dados de uma importação anterior;
- não decidir sozinho a conta Vercel;
- não depender de imagens externas frágeis;
- não chamar Android/iPhone de propriedade ou afiliação da empresa;
- não confundir contato pelo WhatsApp com pagamento ou compra finalizada.
- não publicar como banner final uma moldura vazia, imagem intermediária ou marca recriada com letras incorretas;
- não declarar e-mail, PWA, compartilhamento, keepalive ou segurança como verificados sem evidência real.

### 30. Relatório final obrigatório

Ao terminar, informe de maneira objetiva:

- nome e slug escolhidos;
- URL pública;
- repositório GitHub e commit final;
- projeto Supabase novo usado, sem exibir chaves;
- conta Vercel escolhida conforme decisão do usuário;
- quantidade de tabelas, políticas, produtos e imagens;
- link de origem, horário da fotografia inicial, contagem importada e resultado da comparação de imagens e preços;
- resultados de teste, tipos e build;
- resultado dos três e-mails reais;
- evidência de que o provedor Supabase está com OTP de 6 dígitos e URLs oficiais sem `localhost`;
- resultado do login administrativo;
- resultado da criação, edição/salvamento, despublicação e republicação de um produto em celular;
- resultado do contraste dos campos escuros em Safari/iPhone, Chrome/Android e desktop;
- resultado do primeiro keepalive e link/caminho do workflow;
- resultado da inspeção das metatags, do banner 1200 × 630, do manifesto e dos ícones instaláveis;
- caminhos do manual operacional e do dossiê atualizados;
- qualquer limitação ou pendência real.

Não termine com “deve funcionar”. Termine somente com evidências do que foi efetivamente verificado.

## FIM DO PROMPT PARA A IA EXECUTORA

---

## Nota de arquivamento

Este arquivo é deliberadamente um modelo sem nome definitivo. Ele deve permanecer no repositório como memorial técnico e ponto de partida para projetos futuros. Ao reutilizá-lo, copie o conteúdo entre “INÍCIO” e “FIM”, informe os dados da nova empresa e mantenha todas as exigências de isolamento, segurança e verificação.
