import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // The CLI will use the Direct URL to alter schemas safely
    url: env("DIRECT_URL"),
  },
  // ✅ ADDED: Configuração de seed obrigatória para o ecossistema do Prisma 7
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
