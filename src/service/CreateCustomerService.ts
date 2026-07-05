import { prisma } from "../config/prisma.js";

interface CreateCustomerRequest {
  name: string;
  email?: string;
  phone?: string;
  user_id: string;
}

export class CreateCustomerService {
  async execute({ name, email, phone, user_id }: CreateCustomerRequest) {
    if (!name) {
      throw new Error("Customer name is required");
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        email: email ?? null,
        phone: phone ?? null,
        user_id,
      },
    });

    return customer;
  }
}
