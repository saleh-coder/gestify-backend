import { Request, Response } from "express";
import { ListCustomersService } from "../services/ListCustomersService.js";

export class ListCustomersController {
  async handle(req: Request, res: Response) {
    const user_id = req.user.id;
    const listCustomersService = new ListCustomersService();

    const customers = await listCustomersService.execute(user_id);

    return res.json(customers);
  }
}
