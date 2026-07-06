/**
 * @file RefreshTokenController.ts
 * @description Controller responsible for receiving the token rotation payload and delegating to the business layer.
 */

import { Request, Response } from "express";
import { RefreshTokenService } from "../service/RefreshTokenService.js";

export class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { refresh_token } = req.body;

    const refreshTokenService = new RefreshTokenService();

    const tokenData = await refreshTokenService.execute({
      refresh_token,
    });

    return res.status(200).json(tokenData);
  }
}
