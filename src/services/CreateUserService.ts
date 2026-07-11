import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";

interface CreateUserRequest {
  name: string;
  email: string;
  password_plain: string;
}

export class CreateUserService {
  async execute({ name, email, password_plain }: CreateUserRequest) {
    // Verifica no banco se o e-mail informado já foi cadastrado por outro usuário
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error("Este e-mail já está cadastrado no sistema.");
    }

    // Gera o hash seguro da senha usando o algoritmo Bcrypt com custo (salt) de 10
    const passwordHash = await bcrypt.hash(password_plain, 10);

    // Insere o registro no PostgreSQL, filtrando o retorno para não expor o hash da senha
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
    });

    return user;
  }
}
