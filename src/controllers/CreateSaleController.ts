/**
 * @file CreateSaleController.ts
 * @description Controller responsável por receber a requisição de venda,
 * repassar os dados ao serviço de checkout e retornar a venda processada.
 */

import { Request, Response } from "express";
import { CreateSaleService } from "../service/CreateSaleService.js";

class CreateSaleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { customer_name, items } = req.body;
    const user_id = req.user.id;

    const createSaleService = new CreateSaleService();

    try {
      const sale = await createSaleService.execute({
        user_id,
        customer_name,
        items,
      });

      return res.status(201).json(sale);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export const createSaleController = new CreateSaleController();
