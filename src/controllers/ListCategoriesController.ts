/**
 * @file ListCategoriesController.ts
 * @description Controller responsible for handling category extraction requests under secure merchant scopes.
 */

import { Request, Response } from "express";
import { ListCategoriesService } from "../services/ListCategoriesService.js";

export class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listCategoriesService = new ListCategoriesService();

    const categories = await listCategoriesService.execute({
      user_id,
    });

    return res.status(200).json(categories);
  }
}
