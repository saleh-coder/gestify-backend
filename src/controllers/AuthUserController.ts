/**
 * AUTHENTICATION CONTROLLER
 * Captura as credenciais de login, executa a validação de identidade
 * e emite o token de acesso (JWT) para o cliente.
 */

import { Request, Response } from "express";
import { AuthUserService } from "../service/AuthUserService.js";

class AuthUserController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { email, password_plain } = req.body;

      if (!email || !password_plain) {
        res.status(400).json({ error: "Campos obrigatórios ausentes." });
        return;
      }

      const authUserService = new AuthUserService();
      const result = await authUserService.execute({ email, password_plain });

      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}

export default new AuthUserController();
