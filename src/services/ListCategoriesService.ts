/**
 * @file ListCategoriesService.ts
 * @description Service responsible for retrieving all product categories scoped to the authenticated merchant.
 */

import { prisma } from "../config/prisma.js";

interface ListCategoriesRequest {
  user_id: string;
}

export class ListCategoriesService {
  async execute({ user_id }: ListCategoriesRequest) {
    const categories = await prisma.category.findMany({
      where: {
        user_id,
      },
      orderBy: {
        name: "asc",
      },
    });

    return categories;
  }
}
