# 🎯 CONTEXTO DE DESENVOLVIMENTO: PROJETO GESTIFY

Olá! Você é o meu copiloto técnico no desenvolvimento do **Gestify**, um motor backend de ERP para pequenos comerciantes construído em Node.js, TypeScript, Express e Prisma 7 com PostgreSQL (Neon Cloud).

Por conta da sua limpeza de memória, leia o resumo abaixo para saber exatamente o que já está pronto e o padrão que estamos seguindo.

---

## 🛠️ 1. O QUE JÁ ESTÁ PRONTO E VALIDADO (100% OPERACIONAL)

O código foi totalmente limpo, seguindo um padrão corporativo sem comentários redundantes de sintaxe, focado em documentação arquitetural no topo dos arquivos. O fluxo de banco usa `DIRECT_URL` com piscina de conexões (`Pool`) e adaptador do Prisma para evitar gargalos em nuvem.

### 📁 Estrutura Atual de Arquivos:

- `src/config/prisma.ts` -> Conexão segura com driver `pg` e SSL desabilitado para o Neon.
- `src/config/isAuthenticated.ts` -> Middleware que interceptar rotas, valida o JWT e injeta o `req.user.id`.
- `src/express.d.ts` -> Declaração global para o Express aceitar o objeto `req.user`.
- `src/service/CreateUserServices.ts` -> Cadastro de comerciante com hash Bcrypt (Salt 10).
- `src/service/AuthUserService.ts` -> Login de usuário gerando Token JWT com validade de 1 dia.
- `src/service/CreateProductService.ts` -> Cadastro de produtos amarrado ao `user_id` do token.
- `src/service/ListProductsService.ts` -> Busca produtos filtrando por `user_id` e formatando o preço com `.toFixed(2)`.
- `src/controllers/` -> Contém `CreateUserController`, `AuthUserController`, `CreateProductController` e `ListProductsController` exportados como instâncias únicas (Singleton).
- `src/routes.ts` -> Mapeamento limpo dos endpoints.
- `src/server.ts` -> Inicialização do Express escutando a porta 3000.

### 🧪 Endpoints Testados e Aprovados no `teste.http`:

- `POST /users` -> Cadastro de comerciante.
- `POST /auth` -> Login (Geração de Token JWT limpo, sem aspas).
- `POST /products` -> Cadastro de produto (Protegido por JWT).
- `GET /products` -> Listagem de produtos (Protegido por JWT, lendo ID invisível do token).

---

## 🗺️ 2. PRÓXIMO PASSO (ONDE VAMOS COMEÇAR AMANHÃ)

O repositório Git foi inicializado e enviado com sucesso para o GitHub (`saleh-coder/gestify-backend`), e o `README.md` comercial em português teve as Etapas 1, 2 e 3 marcadas como concluídas com `[x]`.

Hoje, nosso objetivo é iniciar a **Etapa 4: Transações Financeiras e Checkout**.
Precisamos:

1. Planejar a rota de vendas (`POST /sales`).
2. Criar a lógica para dar baixa automática no estoque (`stock_quantity`) de forma segura e atômica.
3. Salvar os itens na tabela intermediária `SaleItem` travando o preço do momento da venda.

Leia este arquivo e me dê as boas-vindas confirmando que entendeu o ponto de partida do Gestify!
