/**
 * LIST PRODUCTS CONTROLLER
 * Captura o ID do comerciante e retorna a lista de todos
 * os produtos cadastrados no seu respectivo estoque.
 */

import { Request, Response } from "express";
import { ListProductsService } from "../services/ListProductsService.js";

class ListProductsController {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      // Temporariamente capturando o id via query params (ex: ?user_id=...)
      // até ativarmos a trava do Token JWT
      const user_id = req.user.id;

      const listProductsService = new ListProductsService();
      const products = await listProductsService.execute({ user_id });

      res.status(200).json(products);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new ListProductsController();
