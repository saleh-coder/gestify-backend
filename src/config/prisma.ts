/**
 * INFRASTRUCTURE LAYER - DATA CONTEXT
 * Database connection setup using Prisma and PostgreSQL backed by Neon Cloud.
 * This file orchestrates the pg connection Pool and injects the native pg driver
 * with an active SSL bypass configuration to eliminate bottlenecks with Cloud Poolers.
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DIRECT_URL;

if (!connectionString) {
  throw new Error(
    "❌ Error: The DIRECT_URL environment variable was not found in the .env file",
  );
}

// Dedicated connection pool setting featuring mandatory SSL rules for Serverless Cloud runtimes
const pool = new pg.Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
