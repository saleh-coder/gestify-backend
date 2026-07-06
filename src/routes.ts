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
import { RefreshTokenController } from "./controllers/RefreshTokenController.js";
import { LogoutController } from "./controllers/LogoutController.js";
import { CreateCategoryController } from "./controllers/CreateCategoryController.js";
import { ListCategoriesController } from "./controllers/ListCategoriesController.js";

const routes = Router();

// 🏛️ CONTROLLERS CENTRALIZATION
const listSalesController = new ListSalesController();
const deleteProductController = new DeleteProductController();
const updateProductController = new UpdateProductController();
const exportSalesController = new ExportSalesController();
const createCustomerController = new CreateCustomerController();
const listCustomersController = new ListCustomersController();
const updateCustomerController = new UpdateCustomerController();
const deleteCustomerController = new DeleteCustomerController();
const refreshTokenController = new RefreshTokenController();
const logoutController = new LogoutController();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

// 👤 MERCHANT REGISTRATION & AUTHENTICATION ENDPOINTS
routes.post("/users", createUserController.handle);
routes.post("/auth", authUserController.handle);
routes.post("/auth/refresh", refreshTokenController.handle);
routes.post("/auth/logout", isAuthenticated, logoutController.handle); // ✅ ADDED: Secure session revocation endpoint

// 📦 INVENTORY MOTOR & CATALOG PROTECTION (Shielded by JWT)
routes.post("/products", isAuthenticated, createProductController.handle);
routes.get("/products", isAuthenticated, listProductsController.handle);
routes.put("/products/:id", isAuthenticated, updateProductController.handle);
routes.delete("/products/:id", isAuthenticated, deleteProductController.handle);
routes.post("/categories", isAuthenticated, createCategoryController.handle);
routes.get("/categories", isAuthenticated, listCategoriesController.handle);

// 💰 INVOICE MANAGMENT & TRANSATIONAL CHECKOUT (Shielded by JWT)
routes.post("/sales", isAuthenticated, createSaleController.handle);
routes.get("/sales", isAuthenticated, listSalesController.handleList);
routes.get(
  "/sales/metrics",
  isAuthenticated,
  listSalesController.handleMetrics,
);
routes.get("/sales/export", isAuthenticated, exportSalesController.handle);

// 👥 CRM & CUSTOMER DATA SCRUBBING (Shielded by JWT)
routes.post("/customers", isAuthenticated, createCustomerController.handle);
routes.get("/customers", isAuthenticated, listCustomersController.handle);
routes.put("/customers/:id", isAuthenticated, updateCustomerController.handle);
routes.delete(
  "/customers/:id",
  isAuthenticated,
  deleteCustomerController.handle,
);

export default routes;
