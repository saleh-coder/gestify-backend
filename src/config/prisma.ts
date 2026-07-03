/**
 * INFRASTRUCTURE LAYER - DATA CONTEXT
 * Conexão com o Banco de Dados Neon utilizando Prisma e PostgreSQL.
 * Este arquivo gerencia a piscina de conexões (Pool) e injeta o driver
 * nativo pg com bypass de SSL para evitar gargalos com o Cloud Pooler.
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const connectionString = process.env.DIRECT_URL;

if (!connectionString) {
  throw new Error(
    "❌ Erro: A variável DIRECT_URL não foi encontrada no arquivo .env",
  );
}

// Configuração do pool de conexões com SSL obrigatório para ambiente Serverless Cloud
const pool = new pg.Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
