import { Request, Response } from "express";
import { UpdateCustomerService } from "../service/UpdateCustomerService.js";

export class UpdateCustomerController {
  async handle(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const user_id = req.user.id;
    const { name, email, phone } = req.body;

    const updateCustomerService = new UpdateCustomerService();

    const customer = await updateCustomerService.execute({
      id,
      user_id,
      name,
      email,
      phone,
    });

    return res.json(customer);
  }
}
