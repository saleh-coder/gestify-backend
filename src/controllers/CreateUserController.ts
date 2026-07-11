/**
 * CONTROLLER LAYER
 * Responsável por capturar a requisição HTTP, extrair os dados do corpo (payload),
 * delegar a execução para a camada de serviço e retornar a resposta ao cliente.
 */

import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService.js";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      // Extrai os dados enviados no corpo JSON da requisição
      const { name, email, password_plain } = req.body;

      const createUserService = new CreateUserService();

      // Executa a regra de negócio de cadastro e aguarda o retorno do banco
      const user = await createUserService.execute({
        name,
        email,
        password_plain,
      });

      // Retorna os dados limpos do usuário com o status HTTP 201 (Created)
      res.status(201).json(user);
    } catch (error: any) {
      // Captura falhas de validação (ex: e-mail duplicado) e retorna o status HTTP 400 (Bad Request)
      res.status(400).json({ error: error.message });
    }
  }
}

// Exporta o controlador já instanciado (Padrão Singleton) para simplificar o arquivo de rotas
export default new CreateUserController();
