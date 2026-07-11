# 📑 Gestify – ERP Backend API

A TypeScript backend API designed for small businesses that still rely on manual inventory tracking and paper-based sales records. The project focuses on inventory management, sales processing, customer management, and financial reporting through a relational and transaction-safe architecture.

---

## Architecture

The project follows a layered architecture separating HTTP concerns from business rules and data access responsibilities:

- **Controllers** handle request validation and HTTP responses.
- **Services** encapsulate business rules and application workflows.
- **Prisma** abstracts database access from business logic.
- **PostgreSQL** provides transactional consistency and relational modeling.

TypeScript strict mode is enabled to reduce runtime errors through compile-time validation.

### Request Flow

```text
HTTP Request
    ↓
Routes
    ↓
Controllers
    ↓
Services
    ↓
Prisma ORM
    ↓
PostgreSQL
```

---

## Technical Decisions

### PostgreSQL

PostgreSQL was selected due to its transactional guarantees, relational capabilities, and support for strong consistency requirements commonly found in financial systems.

### Prisma

Prisma provides type-safe database access, schema management, migrations, and transaction support while reducing manual SQL boilerplate.

### TypeScript

TypeScript enables static analysis and compile-time validation, improving maintainability as the codebase grows.

---

## Features

### Authentication and Authorization

- User registration
- Password hashing using Bcrypt
- JWT access tokens
- Refresh token rotation and revocation
- Protected routes using authentication middleware

### Inventory Management

- Product creation, update, listing, and deletion
- Merchant-level data isolation
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
- Pagination and date filtering

---

## Development Progress

- [x] Authentication and authorization
- [x] Product CRUD
- [x] Sales processing engine
- [x] Reporting endpoints
- [x] CSV export support
- [x] Customer module
- [x] Refresh token implementation
- [x] Product categories
- [ ] Production deployment configuration

---

## Technology Stack

### Production Dependencies

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- pg
- Bcrypt
- Dotenv
- JSON Web Token

### Development Tooling

- TypeScript
- tsx
- Prisma CLI

---

## Installation

Clone the repository:

```bash
git clone https://github.com
cd gestify-backend
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```env
PORT=3000
DATABASE_URL="database_url"
DIRECT_URL="direct_database_url"
JWT_SECRET="jwt_secret"
```

Generate Prisma client and synchronize the database:

```bash
npx prisma db push
npx prisma generate
```

Start the development server:

```bash
npm run dev
```

---

## Current Project Structure

```text
src
├── config
├── controllers
├── services
├── routes.ts
└── server.ts
```

This structure keeps business rules isolated from transport concerns and simplifies testing and maintenance as new modules are added.
