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
import { ListSalesController } from "./controllers/ListSalesController.js";
import { DeleteProductController } from "./controllers/DeleteProductController.js";
import { UpdateProductController } from "./controllers/UpdateProductController.js";

const routes = Router();

// 🏛️ CENTRALIZAÇÃO DE INSTÂNCIAS (Todas juntas no mesmo escopo de infraestrutura)
const listSalesController = new ListSalesController();
const deleteProductController = new DeleteProductController();
const updateProductController = new UpdateProductController();

// 👤 ROTEAMENTO DE USUÁRIOS E AUTENTICAÇÃO
routes.post("/users", createUserController.handle);
routes.post("/auth", authUserController.handle);

// 📦 ROTEAMENTO DE PRODUTOS (Protegidos por JWT)
routes.post("/products", isAuthenticated, createProductController.handle);
routes.get("/products", isAuthenticated, listProductsController.handle);
routes.put("/products/:id", isAuthenticated, updateProductController.handle);
routes.delete("/products/:id", isAuthenticated, deleteProductController.handle);

// 💰 ROTEAMENTO DE VENDAS E CHECKOUT (Protegidos por JWT)
routes.post("/sales", isAuthenticated, createSaleController.handle);
routes.get("/sales", isAuthenticated, listSalesController.handleList);
routes.get(
  "/sales/metrics",
  isAuthenticated,
  listSalesController.handleMetrics,
);

export default routes;
