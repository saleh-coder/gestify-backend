import { prisma } from "../config/prisma.js";
import { Request, Response } from "express";
import { ExportSalesService } from "../services/ExportSalesService.js";

class ExportSalesController {
  async handle(req: Request, res: Response): Promise<void> {
    const user_id = req.user.id;
    const exportSalesService = new ExportSalesService();

    try {
      const csvData = await exportSalesService.execute(user_id);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=sales-report.csv",
      );

      res.status(200).send(csvData);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export { ExportSalesController };
