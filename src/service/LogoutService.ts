/**
 * @file LogoutService.ts
 * @description Service responsible for revoking active sessions by purging refresh tokens from the database.
 */

import { prisma } from "../config/prisma.js";

interface LogoutRequest {
  user_id: string;
}

export class LogoutService {
  async execute({ user_id }: LogoutRequest) {
    // Check if the user has an active session token before attempting deletion
    const tokenExists = await prisma.refreshToken.findUnique({
      where: { user_id },
    });

    if (!tokenExists) {
      throw new Error("No active session found for this merchant");
    }

    // Physical purge to enforce absolute revocation
    await prisma.refreshToken.delete({
      where: { user_id },
    });

    return { message: "Session revoked and logged out successfully" };
  }
}
