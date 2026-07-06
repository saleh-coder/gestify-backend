/**
 * @file AuthUserService.ts
 * @description Service responsible for authenticating merchants, checking credentials, and issuing session tokens.
 */

import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface AuthUserRequest {
  email: string;
  password_plain: string;
}

export class AuthUserService {
  async execute({ email, password_plain }: AuthUserRequest) {
    if (!email || !password_plain) {
      throw new Error("Email and password are required");
    }

    // 1. Find merchant by email address
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid email or password combination");
    }

    // 2. Validate plain text password against database encrypted hash
    const passwordMatch = await bcrypt.compare(
      password_plain,
      user.password_hash,
    );

    if (!passwordMatch) {
      throw new Error("Invalid email or password combination");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is missing from configuration scope");
    }

    // 3. Issue a short-lived signed operational Access Token (15 minutes)
    const token = jwt.sign({ name: user.name, email: user.email }, secret, {
      subject: user.id,
      expiresIn: "15m",
    });

    // 4. Calculate a 30-day expiration threshold for the Refresh Token (in seconds)
    const daysInSeconds = 30 * 24 * 60 * 60;
    const expiresInTimestamp = Math.floor(Date.now() / 1000) + daysInSeconds;

    // 5. Generate a unique long-lived persistence session token (30 days)
    const generatedRefreshToken = jwt.sign({}, secret, {
      subject: user.id,
      expiresIn: "30d",
    });

    // 6. Persist or upsert the refresh token safely inside Neon Cloud using a 1:1 transaction
    await prisma.refreshToken.upsert({
      where: { user_id: user.id },
      update: {
        token: generatedRefreshToken,
        expires_in: expiresInTimestamp,
      },
      create: {
        user_id: user.id,
        token: generatedRefreshToken,
        expires_in: expiresInTimestamp,
      },
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token: generatedRefreshToken,
    };
  }
}
