import { prisma } from "../config/prisma.js";

interface DeleteProductRequest {
  product_id: string;
  user_id: string; // Garante que um lojista não delete produto de outro
}

export class DeleteProductService {
  async execute({ product_id, user_id }: DeleteProductRequest) {
    // 1. Busca o produto e verifica se ele pertence ao usuário autenticado
    const product = await prisma.product.findUnique({
      where: { id: product_id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.user_id !== user_id) {
      throw new Error("Unauthorized operational command");
    }

    // 2. Trava de Segurança Fiscal: Verifica se o produto já foi vendido
    const hasBeenSold = await prisma.saleItem.findFirst({
      where: { product_id },
    });

    if (hasBeenSold) {
      throw new Error(
        "Product cannot be deleted because it is linked to an existing sale record",
      );
    }

    // 3. Exclusão física segura
    await prisma.product.delete({
      where: { id: product_id },
    });

    return { message: "Product successfully removed from catalog" };
  }
}
