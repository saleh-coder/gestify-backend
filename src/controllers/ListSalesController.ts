import { Request, Response } from "express";
import { ListSalesService } from "../service/ListSalesService.js";

export class ListSalesController {
  async handleList(req: Request, res: Response) {
    const user_id = req.user.id; // Injetado pelo middleware isAuthenticated
    const listSalesService = new ListSalesService();

    try {
      const salesHistory = await listSalesService.executeList({ user_id });
      return res.json(salesHistory);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async handleMetrics(req: Request, res: Response) {
    const user_id = req.user.id;
    const listSalesService = new ListSalesService();

    try {
      const metrics = await listSalesService.executeMetrics({ user_id });
      return res.json(metrics);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
