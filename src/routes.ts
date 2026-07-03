/**
 * ROUTING LAYER
 * Mapeamento de endpoints HTTP da aplicação.
 * Conecta as URLs expostas aos controladores responsáveis pelas regras de negócio.
 */

import { Router } from "express";
import createUserController from "./controllers/CreateUserController.js";
import authUserController from "./controllers/AuthUserController.js";
import createProductController from "./controllers/CreateProductController.js"; // Importa o novo controlador

const routes = Router();

// Rota para criação de novos comerciantes no ecossistema ERP
routes.post("/users", createUserController.handle);

// Rota para autenticação de comerciantes no ecossistema ERP
routes.post("/auth", authUserController.handle);

// Rota de Cadastro de Produtos no estoque
routes.post("/products", createProductController.handle);

export default routes;
