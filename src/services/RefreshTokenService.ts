/**
 * @file RefreshTokenService.ts
 * @description Layer responsible for validating refresh tokens and issuing new short-lived access tokens.
 */

import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

interface RefreshTokenRequest {
  refresh_token: string;
}

export class RefreshTokenService {
  async execute({ refresh_token }: RefreshTokenRequest) {
    if (!refresh_token) {
      throw new Error("Refresh token is required");
    }

    // 1. Verify if the refresh token exists in the database along with merchant relations
    const tokenExists = await prisma.refreshToken.findFirst({
      where: { token: refresh_token },
      include: { user: true },
    });

    if (!tokenExists) {
      throw new Error("Refresh token invalid or expired");
    }

    // 2. Validate token expiration boundaries against current timestamp (in seconds)
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (tokenExists.expires_in < currentTimestamp) {
      // Security enforcement: Purge expired credentials immediately from Neon Cloud
      await prisma.refreshToken.delete({
        where: { id: tokenExists.id },
      });
      throw new Error("Refresh token has expired");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is missing from configuration scope");
    }

    // 3. Issue a fresh short-lived Access Token for safe client requests
    const newAccessToken = jwt.sign(
      { name: tokenExists.user.name, email: tokenExists.user.email },
      secret,
      {
        subject: tokenExists.user.id,
        expiresIn: "15m",
      },
    );

    return {
      token: newAccessToken,
    };
  }
}
