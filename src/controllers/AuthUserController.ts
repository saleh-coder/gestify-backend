/**
 * @file AuthUserController.ts
 * @description Controller responsible for capturing authentication payloads and returning access tokens.
 */

import { Request, Response } from "express";
import { AuthUserService } from "../services/AuthUserService.js";

class AuthUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password_plain } = req.body;

    const authUserService = new AuthUserService();

    // The service now returns user metadata, access token, and refresh token
    const sessionData = await authUserService.execute({
      email,
      password_plain,
    });

    return res.status(200).json(sessionData);
  }
}

// Exported as default to match the existing import in src/routes.ts
const authUserController = new AuthUserController();
export default authUserController;
