import { Request, Response, NextFunction } from "express";

function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  console.error("❌ INTERNAL SERVER ERROR:", error);

  return res.status(500).json({
    status: "error",
    message: "Internal server error. Database operation failed.",
  });
}

export { errorMiddleware };
