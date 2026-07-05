import { prisma } from "../config/prisma.js";

interface DeleteCustomerRequest {
  id: string;
  user_id: string;
}

export class DeleteCustomerService {
  async execute({ id, user_id }: DeleteCustomerRequest) {
    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    if (customer.user_id !== user_id) {
      throw new Error("Unauthorized: Customer belongs to another store");
    }

    const activeSalesCount = await prisma.sale.count({
      where: {
        customer_id: id,
      },
    });

    if (activeSalesCount > 0) {
      throw new Error(
        "Customer cannot be deleted because it is linked to active sales history",
      );
    }

    await prisma.customer.delete({
      where: { id },
    });

    return { message: "Customer deleted successfully" };
  }
}
