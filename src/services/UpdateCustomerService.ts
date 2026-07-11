import { prisma } from "../config/prisma.js";

interface UpdateCustomerRequest {
  id: string;
  user_id: string;
  name?: string;
  email?: string;
  phone?: string;
}

export class UpdateCustomerService {
  async execute({ id, user_id, name, email, phone }: UpdateCustomerRequest) {
    const customer = await prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    if (customer.user_id !== user_id) {
      throw new Error("Unauthorized: Customer belongs to another store");
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id },
      data: {
        name: name ?? customer.name,
        email: email ?? customer.email,
        phone: phone ?? customer.phone,
      },
    });

    return updatedCustomer;
  }
}
