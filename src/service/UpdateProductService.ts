import { prisma } from "../config/prisma.js";

interface UpdateProductRequest {
  product_id: string;
  user_id: string;
  name?: string;
  price?: number;
  stock_quantity?: number;
}

class UpdateProductService {
  async execute({
    product_id,
    user_id,
    name,
    price,
    stock_quantity,
  }: UpdateProductRequest) {
    // 1. Verifica se o produto existe e pertence ao usuário
    const product = await prisma.product.findUnique({
      where: { id: product_id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.user_id !== user_id) {
      throw new Error("Unauthorized: Product belongs to another store");
    }

    // 2. Executa a mutação opcional mantendo valores antigos se não enviados
    const updatedProduct = await prisma.product.update({
      where: { id: product_id },
      data: {
        name: name ?? product.name,
        price: price !== undefined ? price : product.price,
        stock_quantity:
          stock_quantity !== undefined
            ? stock_quantity
            : product.stock_quantity,
      },
    });

    return updatedProduct;
  }
}

export { UpdateProductService };
