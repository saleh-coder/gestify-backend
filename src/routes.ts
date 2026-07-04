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
import { createSaleController } from "./controllers/CreateSaleController.js";

const routes = Router();

// Roteamento de Usuários e Autenticação
routes.post("/users", createUserController.handle);
routes.post("/auth", authUserController.handle);

// Roteamento de Produtos (Protegidos)
routes.post("/products", isAuthenticated, createProductController.handle);
routes.get("/products", isAuthenticated, listProductsController.handle);

// Roteamento de Vendas e Checkout (Protegido)
routes.post("/sales", isAuthenticated, createSaleController.handle);

export default routes;
