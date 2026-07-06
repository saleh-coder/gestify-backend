# 📑 Gestify – ERP Backend Engine

A high-performance, strongly typed backend engine designed to empower small local merchants by replacing manual paper tracking with a robust cloud-integrated inventory and sales management ecosystem.

---

## 🏛️ Architectural Strategy and Business Justification

This repository was engineered with a strict focus on Clean Code principles, intentional technical choices, and business alignment:

- **Technical Authority (Architecture):** Developed using a decoupled layered architecture (Controllers, Services, and Configurations). Strict TypeScript compilation ensures compile-time type safety, while Prisma 7 isolates database operations from core business rules.
- **Engineering Logic (Database Selection):** PostgreSQL was chosen over NoSQL alternatives to guarantee full ACID compliance. This ensures rigid referential integrity for sensitive financial data and blocks data corruption at the database level.
- **Operational Impact:** Created to solve real pain points for traditional retail storefronts. The application automates inventory adjustments and sales auditing logs, converting manual workflows into scalable data intelligence.

---

## 🎯 Core Features and Scope (The Complete Project)

The Gestify engine is planned to manage the complete operational lifecycle of a small business:

1. **Merchant Authentication:** Secure sign-up and session control using encrypted tokens.
2. **Intelligent Inventory Control (CRUD):** Full product management securely scoped to the authenticated store owner.
3. **Transactional Sales Engine:** Real-time checkout processing with automated inventory reduction and absolute historical price lock protection.
4. **Financial Analytics Dashboard:** High-performance queries delivering instant metrics such as total revenue and top-selling items.

---

## 🗺️ Project Roadmap and Current Status

To maintain professional project management standards, development is tracked across sequential stages:

- [x] **Stage 1: Architecture and Merchant Registration**
  - [x] Database modeling (PostgreSQL + Prisma Schemas).
  - [x] Secure password hashing using Bcrypt.
  - [x] Layered codebase structure setup (Controllers, Services, Routes, Express Server).
- [x] **Stage 2: Security and Authentication Gate**
  - [x] Login route with password verification rules.
  - [x] Session generation via JSON Web Tokens (JWT).
  - [x] Route guard middleware to intercept unauthorized API requests.
- [x] **Stage 3: Inventory Motor (Product CRUD)**
  - [x] Mapping the Product entity.
  - [x] Explicit multi-tenant merchant data isolation (owners only touch their own stock items).
- [x] **Stage 4: Financial Transactions and Checkout Infrastructure**
  - [x] Multiple-item invoice sales processing.
  - [x] Stock level deduction backed by ACID database transaction safety.
  - [x] Rigid historical price trapping inside relational intermediate entities.
- [x] **Stage 5: Sales Auditing History and Reporting**
  - [x] Merchant-scoped sales extraction endpoint (`GET /sales`).
  - [x] Live metrics calculation pane providing total gross revenue and best sellers (`GET /sales/metrics`).
- [x] **Stage 6: Query Optimization and Advanced Management**
  - [x] Pagination filters using Prisma's native `take` and `skip` operators on sales records.
  - [x] Date-interval temporal aggregation queries using query parameters.
  - [x] Catalog mutations via update (`PUT /products/:id`) and physical removal (`DELETE /products/:id`) pipelines.
- [x] **Stage 7: Report Export and Fiscal Auditing Protection**
  - [x] Data extraction endpoint generating standard accounting-compliant CSV files.
  - [x] Sales history immutability block (absolute rejection of PUT/DELETE requests on settled invoices).
  - [x] Global uncaught exception interceptor middleware handling raw database errors cleanly.
- [x] **Stage 8: Customer Module (Basic CRM Feature)**
  - [x] Database evolution mapping the Customer entity into the merchant's relational ecosystem.
  - [x] Isolated CRUD endpoints underneath the protected `/customers` prefix route scope.
  - [x] Checkout transaction refactoring linking active financial sales records directly to registered CRM users.
- [x] **Stage 9: Token Refactoring and Session Persistence (Security Evolution)**
  - [x] Implementation of the Refresh Token pattern in the database to prevent abrupt user logouts.
  - [x] Endpoint `/auth/refresh` to issue new short-lived Access Tokens using valid long-lived Refresh Tokens.
  - [x] Automatic revocation mechanism for leaked or expired security tokens.
- [ ] **Stage 10: Multi-Category Catalog and Automated Seed Ingestion**
  - [ ] Schema evolution to support specialized product categories (`Category` 1:N `Product`).
  - [ ] Implementation of a production-grade database seed script (`prisma/seed.ts`) using clean mock data.
  - [ ] Performance testing and indexing (`@@index`) for accelerated categorization filters.
- [ ] **Stage 11: Production Build Optimization and Final Deployment**
  - [ ] Target compilation adjustment to production JavaScript inside a dedicated output folder (`/dist`).
  - [ ] Pruning development modules and executing runtime verification checks (`tsc --noEmit`).
  - [ ] Server configuration readiness for environment platforms (Render, Railway, or VPS deployment).

---

## 🛠️ Technologies and Dependencies

### Core Application (Production)

- **Node.js & Express:** Lightweight HTTP server leveraging modern ES Modules settings.
- **Prisma 7 & `@prisma/adapter-pg`:** Next-generation ORM utilizing connection-pooling optimization patterns for cloud instances.
- **Native Driver `pg`:** High-performance database driver injected with custom SSL bypass parameters.
- **Bcrypt:** Secure one-way hashing algorithm for password masking protection.
- **Dotenv:** Safe runtime environment variables management.

### Engineering Tooling (Development)

- **TypeScript:** Type-safe static checker targeting the strict ES2022 framework standard.
- **tsx:** Real-time native execution engine for TypeScript scripts featuring hot-reloading.
- **Prisma CLI:** Automated tool for infrastructure database schema synchronization and programmatic client generation.

---

## 🚀 Installation and Local Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com
   cd gestify-backend
   ```

2. **Install core dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file at the root directory of the application:

   ```env
   PORT=3000
   DATABASE_URL="your_neon_cloud_connection_pool_url"
   DIRECT_URL="your_neon_cloud_direct_connection_url"
   JWT_SECRET="your_secure_jwt_signing_token_string"
   ```

4. **Synchronize Database Schemas:**

   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Spin Up the Local Development Server:**
   ```bash
   npm run dev
   ```
