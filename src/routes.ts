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

const routes = Router();

// Rota para criação de novos comerciantes no ecossistema ERP
routes.post("/users", createUserController.handle);

// Rota para autenticação de comerciantes no ecossistema ERP
routes.post("/auth", authUserController.handle);

// Rotas do Módulo de Estoque (Produtos)

// Rota de Cadastro de Produtos no estoque
routes.post("/products", createProductController.handle);

routes.get("/products", listProductsController.handle); // Nova Rota GET adicionada

export default routes;
