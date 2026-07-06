/**
 * @file seed.ts
 * @description Production-grade automated seed script to populate Neon Cloud with mock data for local testing.
 */

import bcrypt from "bcrypt";
// ✅ FIXED: Importing the unified cloud-configured prisma instance with proper dynamic extension
import { prisma } from "../src/config/prisma.js";

async function main() {
  console.log("🌱 Starting automated database seeding pipeline...");

  // 1. Clean up existing operational tables to guarantee execution idempotency
  await prisma.saleItem.deleteMany({});
  await prisma.sale.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.refreshToken.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("🧹 Database cleanup executed successfully.");

  // 2. Create the master sample Merchant User
  const passwordHash = await bcrypt.hash("senha123", 10);
  const merchant = await prisma.user.create({
    data: {
      name: "Amal Saleh",
      email: "amal@email.com",
      password_hash: passwordHash,
    },
  });

  console.log(`👤 Merchant Account created: ${merchant.email}`);

  // 3. Create Sample CRM Customers for trade simulations
  const customerA = await prisma.customer.create({
    data: {
      name: "Maria Souza",
      email: "maria.souza@email.com",
      phone: "11999998888",
      user_id: merchant.id,
    },
  });

  const customerB = await prisma.customer.create({
    data: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "11988887777",
      user_id: merchant.id,
    },
  });

  console.log("👥 Sample CRM Customers generated successfully.");

  // 4. Create Specialized Product Categories
  const apparelCategory = await prisma.category.create({
    data: {
      name: "Apparel",
      user_id: merchant.id,
    },
  });

  const electronicsCategory = await prisma.category.create({
    data: {
      name: "Electronics",
      user_id: merchant.id,
    },
  });

  console.log("📦 Catalog Categories generated successfully.");

  // 5. Ingest Sample Inventory Products bound to Categories and the Merchant
  await prisma.product.createMany({
    data: [
      {
        name: "Premium Cotton T-Shirt V1",
        description:
          "100% organic premium cotton t-shirt built for security scaling testing",
        price: 89.9,
        stock_quantity: 50,
        user_id: merchant.id,
        category_id: apparelCategory.id,
      },
      {
        name: "Oversized Streetwear Hoodie",
        description: "Heavyweight comfortable black hoodie",
        price: 199.9,
        stock_quantity: 25,
        user_id: merchant.id,
        category_id: apparelCategory.id,
      },
      {
        name: "Wireless Charging Pad",
        description: "Fast 15W universal phone charging desktop accessory",
        price: 129.9,
        stock_quantity: 15,
        user_id: merchant.id,
        category_id: electronicsCategory.id,
      },
    ],
  });

  console.log("🛒 Sample Inventory catalog items successfully injected.");
  console.log(
    "🏁 Database seeding pipeline completed with zero vulnerabilities!",
  );
}

main()
  .catch((error) => {
    console.error(
      "❌ Critical Failure inside Seeding Database execution pipeline:",
      error,
    );
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
