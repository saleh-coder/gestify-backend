import { Request, Response } from "express";
import { ListSalesService } from "../service/ListSalesService.js";

export class ListSalesController {
  async handleList(req: Request, res: Response) {
    const user_id = req.user.id;

    const page = req.query.page as string;
    const limit = req.query.limit as string;
    const days = req.query.days as string;
    const listSalesService = new ListSalesService();

    try {
      const salesHistory = await listSalesService.executeList({
        user_id,
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        days: days ? Number(days) : undefined,
      });
      return res.json(salesHistory);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async handleMetrics(req: Request, res: Response) {
    const user_id = req.user.id;

    const days = req.query.days as string;

    const listSalesService = new ListSalesService();

    try {
      const metrics = await listSalesService.executeMetrics({
        user_id,
        days: days ? Number(days) : undefined,
      });
      return res.json(metrics);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
