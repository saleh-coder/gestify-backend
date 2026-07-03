import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  sub: string; // O ID do usuário guardado dentro do token
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // 1. Captura o cabeçalho de autorização
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Token de autenticação ausente." });
    return;
  }

  // 2. Divide o texto para separar a palavra 'Bearer' do token real
  // Ex: "Bearer eyJhbGci..." vira ["Bearer", "eyJhbGci..."]
  const [, token] = authHeader.split(" ");

  try {
    // 3. Valida se o token foi assinado com a nossa chave secreta
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "chave_secreta_padrao_gestify",
    );

    const { sub } = decoded as TokenPayload;

    // 4. Injeta o ID do usuário de forma segura dentro do objeto 'req' da requisição
    req.user = {
      id: sub,
    };

    // 5. Autoriza a requisição a seguir adiante para o Controlador
    return next();
  } catch (error) {
    res
      .status(401)
      .json({ error: "Token de autenticação inválido ou vencido." });
    return;
  }
}
