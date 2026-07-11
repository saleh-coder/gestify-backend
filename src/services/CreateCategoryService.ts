/**
 * @file CreateCategoryService.ts
 * @description Service responsible for validating and inserting a new product category under merchant scope.
 */

import { prisma } from "../config/prisma.js";

interface CategoryRequest {
  name: string;
  user_id: string;
}

export class CreateCategoryService {
  async execute({ name, user_id }: CategoryRequest) {
    if (!name) {
      throw new Error("Category name is required");
    }

    // Prevent duplicate category names under the same merchant account
    const categoryAlreadyExists = await prisma.category.findFirst({
      where: {
        name,
        user_id,
      },
    });

    if (categoryAlreadyExists) {
      throw new Error("Category name already exists in your catalog");
    }

    const category = await prisma.category.create({
      data: {
        name,
        user_id,
      },
    });

    return category;
  }
}
