/**
 * @file CreateSaleService.ts
 * @description Camada de negócio responsável pelo checkout de vendas.
 * Executa validações de estoque, busca de preços reais e baixa atômica via Prisma Transaction.
 */

import { prisma } from "../config/prisma.js";

interface SaleItemInput {
  product_id: string;
  quantity: number;
}

interface CreateSaleRequest {
  user_id: string;
  customer_id?: string; // INJETADO: Suporte relacional ao CRM
  customer_name?: string;
  items: SaleItemInput[];
}

export class CreateSaleService {
  async execute({
    user_id,
    customer_id,
    customer_name,
    items,
  }: CreateSaleRequest) {
    if (!items || items.length === 0) {
      throw new Error("A venda precisa conter pelo menos um item.");
    }

    // Validação prévia de segurança: se enviar customer_id, checa se ele existe e pertence ao lojista
    if (customer_id) {
      const customerExists = await prisma.customer.findFirst({
        where: {
          id: customer_id,
          user_id: user_id,
        },
      });

      if (!customerExists) {
        throw new Error(
          "O cliente informado não foi encontrado ou pertence a outra loja.",
        );
      }
    }

    const productIds = items.map((item) => item.product_id);

    return await prisma.$transaction(async (tx) => {
      const products = await tx.product.findMany({
        where: {
          id: { in: productIds },
          user_id: user_id,
        },
      });

      if (products.length !== items.length) {
        throw new Error(
          "Um ou mais produtos não foram encontrados ou não pertencem ao seu usuário.",
        );
      }

      let totalPrice = 0;
      const saleItemsToCreate = [];
      const stockUpdates = [];

      for (const item of items) {
        const dbProduct = products.find((p) => p.id === item.product_id);

        if (!dbProduct) {
          throw new Error("Produto não correspondido na base de dados.");
        }

        const requestedQuantity = Number(item.quantity);
        const availableStock = Number(dbProduct.stock_quantity);

        if (requestedQuantity <= 0) {
          throw new Error(
            `A quantidade do produto '${dbProduct.name}' deve ser maior que zero.`,
          );
        }

        if (availableStock < requestedQuantity) {
          throw new Error(
            `Estoque insuficiente para o produto '${dbProduct.name}'. Disponível: ${availableStock}`,
          );
        }

        const priceAtSale = Number(dbProduct.price);
        const itemSubtotal = priceAtSale * requestedQuantity;
        totalPrice += itemSubtotal;

        saleItemsToCreate.push({
          product_id: item.product_id,
          quantity: requestedQuantity,
          price_at_sale: priceAtSale,
        });

        stockUpdates.push(
          tx.product.update({
            where: { id: item.product_id },
            data: {
              stock_quantity: {
                decrement: requestedQuantity,
              },
            },
          }),
        );
      }

      await Promise.all(stockUpdates);

      const sale = await tx.sale.create({
        data: {
          user_id,
          customer_id: customer_id || null, // INJETADO: Gravando a FK no banco de dados
          customer_name: customer_name || null,
          total_price: totalPrice,
          sale_items: {
            create: saleItemsToCreate,
          },
        },
        include: {
          sale_items: {
            select: {
              product_id: true,
              quantity: true,
              price_at_sale: true,
            },
          },
        },
      });

      return {
        ...sale,
        total_price: Number(sale.total_price).toFixed(2),
        sale_items: sale.sale_items.map((item) => ({
          ...item,
          price_at_sale: Number(item.price_at_sale).toFixed(2),
        })),
      };
    });
  }
}
