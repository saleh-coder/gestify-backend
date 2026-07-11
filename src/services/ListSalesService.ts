import { prisma } from "../config/prisma.js";
import { subDays } from "date-fns";

interface ListSalesRequest {
  user_id: string;
  page?: number;
  limit?: number;
  days?: number;
}

export class ListSalesService {
  // Rota 1: Histórico de Vendas (Paginação e Filtros)
  async executeList({ user_id, page = 1, limit = 10, days }: ListSalesRequest) {
    const skip = (page - 1) * limit;
    const whereCondition: any = { user_id };

    if (days) {
      const targetDate = subDays(new Date(), days);
      whereCondition.created_at = {
        gte: targetDate,
      };
    }

    const [sales, totalCount] = await prisma.$transaction([
      prisma.sale.findMany({
        where: whereCondition,
        skip: skip,
        take: limit,
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
      }),
      prisma.sale.count({
        where: whereCondition,
      }),
    ]);

    return {
      meta: {
        total_records: totalCount,
        current_page: page,
        total_pages: Math.ceil(totalCount / limit),
      },
      sales: sales.map((sale) => ({
        id: sale.id,
        customer_name: sale.customer_name,
        total_price: Number(sale.total_price).toFixed(2),
        created_at: sale.created_at,
        items: sale.sale_items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          price: Number(item.price_at_sale).toFixed(2),
          product_name: item.product.name,
        })),
      })),
    };
  }

  // Rota 2: Painel de Métricas / Insights (Filtro Corrigido e Tipagem Segura)
  async executeMetrics({ user_id, days }: ListSalesRequest) {
    const whereCondition: any = { user_id };

    if (days) {
      const targetDate = subDays(new Date(), days);
      whereCondition.created_at = {
        gte: targetDate,
      };
    }

    // 1. Total de faturamento e contagem de vendas (Usando agregação segura do Prisma)
    const aggregateSales = await prisma.sale.aggregate({
      where: whereCondition,
      _sum: {
        total_price: true,
      },
      _count: {
        _all: true,
      },
    });

    // 2. Agregação manual para encontrar o produto mais vendido do usuário no período
    const saleItems = await prisma.saleItem.findMany({
      where: {
        sale: whereCondition,
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

    // Uso correto do Operador de Encadeamento Opcional (?) para mitigar TS18048
    const totalRevenue = aggregateSales._sum?.total_price
      ? Number(aggregateSales._sum.total_price).toFixed(2)
      : "0.00";

    const totalSalesCount = aggregateSales._count?._all || 0;

    return {
      total_revenue: totalRevenue,
      total_sales_count: totalSalesCount,
      top_product: topProduct,
    };
  }
}
