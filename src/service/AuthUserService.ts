import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface AuthUserRequest {
  email: string;
  password_plain: string;
}

export class AuthUserService {
  async execute({ email, password_plain }: AuthUserRequest) {
    // Busca o comerciante pelo e-mail informado
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("E-mail ou senha incorretos.");
    }

    // Compara a senha digitada com o hash criptografado guardado no banco
    const passwordMatch = await bcrypt.compare(
      password_plain,
      user.password_hash,
    );

    if (!passwordMatch) {
      throw new Error("E-mail ou senha incorretos.");
    }

    // Gera o token JWT assinado usando uma chave secreta e definindo expiração de 1 dia
    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET || "chave_secreta_padrao_gestify",
      {
        subject: user.id,
        expiresIn: "1d",
      },
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
