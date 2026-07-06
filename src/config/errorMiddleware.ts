import { Request, Response, NextFunction } from "express";

function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  // 1. Catch predictable business logic failures thrown intentionally by Service layers
  if (
    error instanceof Error &&
    error.message &&
    !error.stack?.includes("prisma")
  ) {
    console.warn("⚠️ Business Validation Shielded:", error.message);
    return res.status(400).json({
      error: error.message,
    });
  }

  // 2. Fallback protection layer for uncaught database or critical server crashes
  console.error("❌ CRITICAL INTERNAL SERVER ERROR:", error);

  return res.status(500).json({
    status: "error",
    message: "Internal server error. Database operation failed.",
  });
}

export { errorMiddleware };
