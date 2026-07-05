import { prisma } from "../config/prisma.js";

interface ListSalesRequest {
  user_id: string;
}

export class ListSalesService {
  // Rota 1: Histórico de Vendas
  async executeList({ user_id }: ListSalesRequest) {
    const sales = await prisma.sale.findMany({
      where: { user_id },
      include: {
        sale_items: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    // Formatação dos valores decimais para string estrita
    return sales.map((sale) => ({
      id: sale.id,
      customer_name: sale.customer_name,
      total_amount: Number(sale.total_price).toFixed(2),
      created_at: sale.created_at,
      items: sale.sale_items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: Number(item.price_at_sale).toFixed(2),
        product_name: item.product.name,
      })),
    }));
  }

  // Rota 2: Painel de Métricas / Insights
  async executeMetrics({ user_id }: ListSalesRequest) {
    // 1. Total de faturamento e contagem de vendas
    const aggregateSales = await prisma.sale.aggregate({
      where: { user_id },
      _sum: {
        total_price: true,
      },
      _count: {
        id: true,
      },
    });

    // 2. Agregação manual/banco para encontrar o produto mais vendido do usuário
    const saleItems = await prisma.saleItem.findMany({
      where: {
        sale: { user_id },
      },
      include: {
        product: {
          select: { name: true },
        },
      },
    });

    const productMap: Record<string, { name: string; quantity: number }> = {};

    saleItems.forEach((item) => {
      if (!productMap[item.product_id]) {
        productMap[item.product_id] = { name: item.product.name, quantity: 0 };
      }
      productMap[item.product_id].quantity += item.quantity;
    });

    let topProduct = { name: "Nenhum", quantity_sold: 0 };

    Object.values(productMap).forEach((prod) => {
      if (prod.quantity > topProduct.quantity_sold) {
        topProduct = {
          name: prod.name,
          quantity_sold: prod.quantity,
        };
      }
    });

    const totalRevenue = aggregateSales._sum.total_price
      ? Number(aggregateSales._sum.total_price).toFixed(2)
      : "0.00";

    return {
      total_revenue: totalRevenue,
      total_sales_count: aggregateSales._count.id,
      top_product: topProduct,
    };
  }
}
