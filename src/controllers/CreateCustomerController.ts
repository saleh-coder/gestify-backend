import { Request, Response } from "express";
import { CreateCustomerService } from "../services/CreateCustomerService.js";

export class CreateCustomerController {
  async handle(req: Request, res: Response) {
    const { name, email, phone } = req.body;
    const user_id = req.user.id;

    const createCustomerService = new CreateCustomerService();

    const customer = await createCustomerService.execute({
      name,
      email,
      phone,
      user_id,
    });

    return res.status(201).json(customer);
  }
}
