/**
 * APPLICATION BOOTSTRAPPER (server.ts)
 * O motor principal da aplicação. Inicializa o servidor Express,
 * configura os middlewares globais e ativa a escuta de requisições HTTP.
 */

import "dotenv/config";
import express from "express";
import routes from "./routes.js";

const app = express();

// Middleware obrigatório para habilitar o parsing de payloads em formato JSON
app.use(express.json());

// Injeta o mapa de rotas desacopladas na aplicação
app.use(routes);

// Rota de checagem de integridade (Health Check) para monitoramento do servidor
app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "OK", message: "Servidor Gestify rodando perfeitamente!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}`);
});
