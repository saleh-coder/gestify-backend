# 📑 Gestify – Motor Backend ERP

Um motor backend de alta performance, fortemente tipado, projetado para capacitar pequenos comerciantes locais através da substituição do controle manual em papel por um ecossistema robusto de gerenciamento de estoque e vendas integrado à nuvem.

---

## 🏛️ Estratégia Arquitetural e Justificativa de Negócio

Este repositório foi construído com foco estrito em princípios de código limpo (Clean Code), escolhas técnicas conscientes e alinhamento com as necessidades de negócio:

- **Autoridade Técnica (Arquitetura):** Desenvolvido utilizando uma arquitetura desacoplada em camadas (Controladores, Serviços e Configurações) [^4^]. A compilação estrita do TypeScript garante a segurança de tipos em tempo de desenvolvimento, enquanto o Prisma 7 isola as operações de dados das regras de negócio.
- **Lógica de Engenharia (Decisão do Banco de Dados):** O PostgreSQL foi escolhido em vez de alternativas NoSQL para garantir total conformidade com as regras ACID. Isso assegura a integridade referencial rígida para dados financeiros sensíveis e bloqueia a corrupção de dados diretamente no nível do banco.
- **Impacto Operacional:** Criado para resolver uma dor real de comércios tradicionais. A aplicação automatiza os ajustes de estoque e os relatórios de vendas, transformando processos manuais em inteligência de dados escalável.

---

## 🎯 Funcionalidades Principais e Escopo (O Projeto Completo)

O motor do Gestify foi planejado para gerenciar o ciclo operacional completo de uma pequena empresa:

1.  **Autenticação do Comerciante:** Cadastro seguro e controle de sessão através de tokens criptografados.
2.  **Controle Inteligente de Estoque (CRUD):** Gerenciamento completo de produtos atrelado estritamente ao dono da loja autenticado.
3.  **Motor de Vendas Transacional:** Registro de vendas com subtração de estoque em tempo real e proteção contra a alteração histórica de preços.
4.  **Painel de Insights Financeiros:** Consultas de alta performance que entregam métricas como faturamento total e produtos mais vendidos.

---

## 🗺️ Roadmap do Projeto e Status Atual

Para demonstrar o planejamento e acompanhamento de um projeto profissional, o desenvolvimento está dividido em etapas claras:

- [x] **Etapa 1: Arquitetura e Cadastro do Comerciante**
  - [x] Modelagem do banco de dados (PostgreSQL + Schemas do Prisma).
  - [x] Criptografia de senha segura com Bcrypt.
  - [x] Configuração da estrutura em camadas (Controllers, Services, Routes, Express Server) [^4^].
- [x] **Etapa 2: Segurança e Portão de Autenticação**
  - [x] Rota de login com validação de senha.
  - [x] Geração de sessão através de JSON Web Tokens (JWT).
  - [x] Middleware de proteção de rotas para interceptar requisições não autorizadas.
- [x] **Etapa 3: Motor de Estoque (CRUD de Produtos)**
  - [x] Mapeamento da entidade de Produtos.
  - [x] Isolamento de dados por lojista (um comerciante só altera seu próprio estoque).
- [x] **Etapa 4: Transações Financeiras e Checkout**
  - [x] Processamento de vendas com múltiplos itens.
  - [x] Subtração de níveis de estoque com segurança ACID.
  - [x] Travamento histórico de preços dentro de entidades intermediárias.
- [x] **Etapa 5: Histórico de Vendas e Relatórios**
  - [x] Rota de listagem de vendas efetuadas por comerciante (`GET /sales`).
  - [x] Painel de insights com faturamento total e produto mais vendido (`GET /sales/metrics`).
  - [x] **Etapa 6: Otimização de Consultas e Gerenciamento Avançado**
  - [x] Paginação de resultados com os operadores `take` e `skip` do Prisma na listagem de vendas.
  - [x] Filtro por período de datas nas métricas financeiras utilizando query parameters.
  - [x] Rotas de atualização (`PUT /products/:id`) e exclusão física (`DELETE /products/:id`) para manutenção do catálogo.
- [ ] **Etapa 7: Exportação de Relatórios e Auditoria Fiscal**
  - [ ] Endpoint de exportação de dados operacionais em formato CSV para contabilidade do lojista.
  - [ ] Implementação de regras de imutabilidade de vendas (bloqueio total a requisições PUT/DELETE em faturamentos concluídos).
  - [ ] Criação de middleware global interceptador de exceções para tratamento limpo de erros de banco em produção.

---

## 🛠️ Tecnologias e Dependências

### Aplicação Principal (Produção)

- **Node.js & Express:** Servidor HTTP leve com configuração moderna de ES Modules.
- **Prisma 7 & `@prisma/adapter-pg`:** ORM de última geração utilizando arquitetura de conexão otimizada para nuvem.
- **PostgreSQL (Banco de Dados Neon Cloud):** Banco relacional com regras nativas de SSL e desvio de pool de conexões.
- **Bcrypt:** Algoritmo de criptografia seguro para ocultação unidirecional de senhas.
- **Dotenv:** Encapsulamento de variáveis de ambiente em tempo de execução.

### Ferramentas de Engenharia (Desenvolvimento)

- **TypeScript:** Compilador de tipagem segura visando o padrão estrito ES2022.
- **tsx:** Execução nativa e em tempo real de TypeScript com hot-reloading.
- **Prisma CLI:** Motor automatizado de migrações de banco de dados e geração de cliente.

---

## 🚀 Instalação e Configuração Local

1. **Clone o repositório:**

   ```bash
   git clone https://github.com
   cd gestify-backend
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto:

   ```env
   PORT=3000
   DATABASE_URL="sua_url_de_pool_do_neon"
   DIRECT_URL="sua_url_direta_do_neon"
   ```

4. **Sincronize as Migrações do Banco:**

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Inicie o Servidor de Desenvolvimento:**
   ```bash
   npm run dev
   ```
