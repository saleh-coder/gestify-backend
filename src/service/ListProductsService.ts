import { prisma } from "../config/prisma.js";

interface ListProductsRequest {
  user_id: string; // Filtro obrigatório para garantir o isolamento
}

export class ListProductsService {
  async execute({ user_id }: ListProductsRequest) {
    // Busca no PostgreSQL todos os produtos vinculados a este user_id
    const products = await prisma.product.findMany({
      where: { user_id },
    });

    // Formata o preço de todos os produtos retornados para duas casas decimais
    return products.map((product) => ({
      ...product,
      price: Number(product.price).toFixed(2),
    }));
  }
}
