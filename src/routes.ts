/**
 * ROUTING LAYER
 * Mapeamento de endpoints HTTP da aplicação.
 * Conecta as URLs expostas aos controladores responsáveis pelas regras de negócio.
 */

import { Router } from "express";
import createUserController from "./controllers/CreateUserController.js";
import authUserController from "./controllers/AuthUserController.js";
import createProductController from "./controllers/CreateProductController.js";
import listProductsController from "./controllers/ListProductsController.js";
import { isAuthenticated } from "./config/isAuthenticated.js";

const routes = Router();

// Rota para criação de novos comerciantes no ecossistema ERP
routes.post("/users", createUserController.handle);

// Rota para autenticação de comerciantes no ecossistema ERP
routes.post("/auth", authUserController.handle);

// Rota para criação de novos produtos no estoque
routes.post("/products", isAuthenticated, createProductController.handle);

// Rota para listagem de produtos no estoque
routes.get("/products", isAuthenticated, listProductsController.handle);

export default routes;
