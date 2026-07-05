import { Request, Response, NextFunction } from "express";

function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response {
  // 1. Captura erros previsíveis lançados intencionalmente pelas camadas de Serviço (Regras de Negócio)
  if (
    error instanceof Error &&
    error.message &&
    !error.stack?.includes("prisma")
  ) {
    console.warn("⚠️ Validação de Negócio:", error.message);
    return res.status(400).json({
      error: error.message,
    });
  }

  console.error("❌ INTERNAL SERVER ERROR:", error);

  return res.status(500).json({
    status: "error",
    message: "Internal server error. Database operation failed.",
  });
}

export { errorMiddleware };
