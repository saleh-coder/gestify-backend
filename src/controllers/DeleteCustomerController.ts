import { Request, Response } from "express";
import { DeleteCustomerService } from "../service/DeleteCustomerService.js";

export class DeleteCustomerController {
  async handle(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const user_id = req.user.id;

    const deleteCustomerService = new DeleteCustomerService();
    const result = await deleteCustomerService.execute({ id, user_id });

    return res.json(result);
  }
}
