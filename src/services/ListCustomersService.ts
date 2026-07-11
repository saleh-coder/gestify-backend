import { prisma } from "../config/prisma.js";

export class ListCustomersService {
  async execute(user_id: string) {
    const customers = await prisma.customer.findMany({
      where: { user_id },
      orderBy: { name: "asc" },
    });

    return customers;
  }
}
