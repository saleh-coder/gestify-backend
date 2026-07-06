/**
 * @file LogoutController.ts
 * @description Controller responsible for handling merchant sign-out requests and session termination.
 */

import { Request, Response } from "express";
import { LogoutService } from "../service/LogoutService.js";

export class LogoutController {
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const logoutService = new LogoutService();
    const result = await logoutService.execute({ user_id });

    return res.status(200).json(result);
  }
}
