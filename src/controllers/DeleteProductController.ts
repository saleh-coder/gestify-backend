import { Request, Response } from "express";
import { DeleteProductService } from "../service/DeleteProductService.js";

export class DeleteProductController {
  async handle(req: Request, res: Response) {
    const user_id = req.user.id;
    const product_id = req.params.id as string; // Captura /products/:id

    const deleteProductService = new DeleteProductService();

    try {
      const result = await deleteProductService.execute({
        product_id,
        user_id,
      });

      return res.json(result);
    } catch (error: any) {
      // Retorna 403 se for violação de posse ou 400 se for erro de negócio
      const status = error.message.includes("Unauthorized") ? 403 : 400;
      return res.status(status).json({ error: error.message });
    }
  }
}
