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
import { ExportSalesController } from "./controllers/ExportSalesController.js";
import { CreateCustomerController } from "./controllers/CreateCustomerController.js";
import { ListCustomersController } from "./controllers/ListCustomersController.js";
import { UpdateCustomerController } from "./controllers/UpdateCustomerController.js";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController.js";

const routes = Router();

// 🏛️ CENTRALIZAÇÃO DE INSTÂNCIAS
const listSalesController = new ListSalesController();
const deleteProductController = new DeleteProductController();
const updateProductController = new UpdateProductController();
const exportSalesController = new ExportSalesController();
const createCustomerController = new CreateCustomerController();
const listCustomersController = new ListCustomersController();
const updateCustomerController = new UpdateCustomerController();
const deleteCustomerController = new DeleteCustomerController();

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
routes.get("/sales/export", isAuthenticated, exportSalesController.handle);

// 👥 MÓDULO DE CRM / CLIENTES (Protegidos por JWT)
routes.post("/customers", isAuthenticated, createCustomerController.handle);
routes.get("/customers", isAuthenticated, listCustomersController.handle);
routes.put("/customers/:id", isAuthenticated, updateCustomerController.handle);
routes.delete(
  "/customers/:id",
  isAuthenticated,
  deleteCustomerController.handle,
);

export default routes;
