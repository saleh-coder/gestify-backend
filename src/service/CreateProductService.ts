import { prisma } from "../config/prisma.js";

interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  stock_quantity: number;
  user_id: string; // Vinculo obrigatório com o dono do produto
}

export class CreateProductService {
  async execute({
    name,
    description,
    price,
    stock_quantity,
    user_id,
  }: CreateProductRequest) {
    // Validação de negócio: impede produtos com preço negativo
    if (price <= 0) {
      throw new Error("O preço do produto deve ser maior que zero.");
    }

    // Validação de negócio: impede estoque inicial negativo
    if (stock_quantity < 0) {
      throw new Error("A quantidade em estoque não pode ser negativa.");
    }

    // Cria o produto amarrado diretamente ao ID do comerciante logado
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock_quantity,
        user_id,
      },
    });

    // Retorna os dados com o preço formatado para duas casas decimais, mantendo a consistência na apresentação do valor monetário
    return {
      ...product,
      price: Number(product.price).toFixed(2),
    };
  }
}
