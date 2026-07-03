/**
 * PRODUCT CONTROLLER
 * Captura os dados da mercadoria enviados pelo cliente, repassa para o
 * serviço de estoque e retorna o produto cadastrado com status 201.
 */

import { Request, Response } from "express";
import { CreateProductService } from "../service/CreateProductService.js";

class CreateProductController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, price, stock_quantity } = req.body;

      const user_id = req.user.id;

      if (!name || !price || stock_quantity === undefined) {
        res.status(400).json({ error: "Campos obrigatórios ausentes." });
        return;
      }

      const createProductService = new CreateProductService();
      const product = await createProductService.execute({
        name,
        description,
        price,
        stock_quantity,
        user_id,
      });

      res.status(201).json({
        ...product,
        price: Number(product.price).toFixed(2),
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

// Exporta o controlador já instanciado (Padrão Singleton)
export default new CreateProductController();
