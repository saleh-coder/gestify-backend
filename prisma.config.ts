import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // O CLI usará a Direct URL para criar as tabelas com segurança
    url: env("DIRECT_URL"),
  },
});
