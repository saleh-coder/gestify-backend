/**
 * @file CreateCategoryController.ts
 * @description Controller responsible for capturing the category payload and delegating to the business layer.
 */

import { Request, Response } from "express";
import { CreateCategoryService } from "../services/CreateCategoryService.js";

export class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const user_id = req.user.id;

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({
      name,
      user_id,
    });

    return res.status(201).json(category);
  }
}
