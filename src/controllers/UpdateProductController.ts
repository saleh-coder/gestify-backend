import { Request, Response } from "express";
import { UpdateProductService } from "../service/UpdateProductService.js";

class UpdateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    // Asserção explícita de tipo alinhada com a Etapa 6 do projeto
    const product_id = req.params.id as string;
    const user_id = req.user.id; // Injetado pelo middleware isAuthenticated

    const { name, price, stock_quantity } = req.body;

    const updateProductService = new UpdateProductService();

    try {
      const product = await updateProductService.execute({
        product_id,
        user_id,
        name,
        price: price !== undefined ? Number(price) : undefined,
        stock_quantity:
          stock_quantity !== undefined ? Number(stock_quantity) : undefined,
      });

      return res.status(200).json(product);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateProductController };
