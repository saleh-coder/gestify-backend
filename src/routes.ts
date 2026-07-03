/**
 * ROUTING LAYER
 * Mapeamento de endpoints HTTP da aplicação.
 * Conecta as URLs expostas aos controladores responsáveis pelas regras de negócio.
 */

import { Router } from "express";
import createUserController from "./controllers/CreateUserController.js";

const routes = Router();

// Rota para criação de novos comerciantes no ecossistema ERP
routes.post("/users", createUserController.handle);

export default routes;
