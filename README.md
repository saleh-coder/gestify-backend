# 📑 Gestify – ERP Backend API

A strongly typed backend API designed to help small businesses replace manual inventory tracking and paper-based sales records with a centralized inventory and sales management system.

The project was developed primarily as a learning and portfolio project focused on backend architecture, authentication, relational database modeling, and business rule implementation using modern TypeScript tooling.

---

# 🏛️ Architectural Strategy and Technical Decisions

This repository was built around clear separation of responsibilities and deliberate technical choices.

- **Architecture:** The application follows a layered architecture composed of Controllers, Services, and Configuration modules. Business rules remain isolated from HTTP concerns and database access responsibilities.

- **Database Selection:** PostgreSQL was selected due to its transactional guarantees, relational modeling capabilities, and strong consistency requirements commonly found in inventory and sales systems.

- **ORM Choice:** Prisma was adopted to provide type-safe database access, schema management, and transaction support while reducing manual SQL boilerplate.

- **Type Safety:** TypeScript strict mode is enabled to provide compile-time validation and reduce runtime errors as the application grows.

---

# 🎯 Core Features and Scope

The Gestify API aims to cover the operational requirements commonly found in small retail businesses.

### Authentication and Authorization

- User registration
- Password hashing using Bcrypt
- JWT authentication
- Refresh token implementation
- Protected routes using authentication middleware

### Inventory Management

- Product creation, update, listing, and deletion
- Merchant-scoped product ownership
- Product categorization support

### Sales Processing

- Multi-item sales transactions
- Automatic stock deduction
- Historical sale price preservation
- Immutable completed sales history

### Customer Management

- Customer CRUD operations
- Customer association with sales records

### Reporting and Analytics

- Sales history retrieval
- Revenue metrics
- Best-selling products
- CSV export functionality
- Pagination support
- Date interval filtering

---

# 🗺️ Project Roadmap and Current Status

Development is organized into incremental stages to keep feature implementation isolated and manageable.

- [x] **Stage 1: Architecture and Merchant Registration**
  - [x] PostgreSQL database modeling using Prisma schemas.
  - [x] Password hashing using Bcrypt.
  - [x] Initial project structure using Controllers, Services, Routes, and Express.

- [x] **Stage 2: Authentication and Authorization**
  - [x] Login endpoint with password verification.
  - [x] JWT access token generation.
  - [x] Authentication middleware for protected routes.

- [x] **Stage 3: Product Management**
  - [x] Product entity implementation.
  - [x] Merchant-level product isolation.

- [x] **Stage 4: Sales Processing**
  - [x] Multi-item sales transactions.
  - [x] Stock deduction using database transactions.
  - [x] Historical sale price preservation.

- [x] **Stage 5: Sales History and Reporting**
  - [x] Sales history endpoint (`GET /sales`).
  - [x] Revenue and metrics endpoint (`GET /sales/metrics`).

- [x] **Stage 6: Query Optimization and Management Features**
  - [x] Pagination using Prisma `take` and `skip`.
  - [x] Date interval filtering.
  - [x] Product update and deletion endpoints.

- [x] **Stage 7: Export and Error Handling**
  - [x] CSV export endpoint.
  - [x] Sales history immutability rules.
  - [x] Global error handling middleware.

- [x] **Stage 8: Customer Module**
  - [x] Customer entity implementation.
  - [x] Customer CRUD endpoints.
  - [x] Customer association with sales.

- [x] **Stage 9: Session Persistence**
  - [x] Refresh token implementation.
  - [x] Refresh endpoint (`POST /auth/refresh`).
  - [x] Token revocation mechanism.

- [x] **Stage 10: Categories and Seed Data**
  - [x] Product category support.
  - [x] Database seed script.
  - [x] Database indexing for filtering optimization.

- [x] **Stage 11: Production Build Preparation**
  - [x] TypeScript compilation to `/dist`.
  - [x] Production start script configuration.
  - [x] Runtime validation using compiled JavaScript.

- [ ] **Stage 12: Deployment**
  - [ ] Environment configuration for deployment platforms.
  - [ ] Public API deployment.
  - [ ] Production validation.

- [ ] **Stage 13: Future Improvements**
  - [ ] Automated tests.
  - [ ] API documentation.
  - [ ] Rate limiting.
  - [ ] Structured logging.

---

# 🛠️ Technologies and Dependencies

## Production Dependencies

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- pg
- bcrypt
- dotenv
- jsonwebtoken

## Development Tooling

- TypeScript
- tsx
- Prisma CLI

---

# 🚀 Installation and Local Setup

Clone the repository:

```bash
git clone <repository-url>
cd gestify-backend
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```env
PORT=3000
DATABASE_URL=""
DIRECT_URL=""
JWT_SECRET=""
```

Generate the Prisma client and synchronize the database:

```bash
npx prisma generate
npx prisma db push
```

Start the development server:

```bash
npm run dev
```

Build the production version:

```bash
npm run build
```

Run the compiled application:

```bash
npm start
```

---

# 📁 Project Structure

```text
prisma
└── schema.prisma

src
├── config
├── controllers
├── services
├── express.d.ts
├── routes.ts
└── server.ts
```

---

# 📚 What This Project Demonstrates

This project demonstrates practical experience with:

- REST API development
- Authentication and authorization
- Relational database design
- Transaction handling
- Layered backend architecture
- TypeScript development
- Prisma ORM usage
- Production build preparation
- Git workflow and project organization
