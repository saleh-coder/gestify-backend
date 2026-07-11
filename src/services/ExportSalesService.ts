import { prisma } from "../config/prisma.js";

class ExportSalesService {
  async execute(user_id: string): Promise<string> {
    // 1. Busca o histórico completo de vendas amarrado ao lojista
    const sales = await prisma.sale.findMany({
      where: { user_id },
      include: {
        sale_items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    // 2. Define o cabeçalho das colunas do arquivo CSV
    let csvContent =
      "Sale ID,Customer Name,Date,Product Name,Quantity,Unit Price,Item Total,Sale Total\n";

    // 3. Varre os registros convertendo a estrutura relacional em linhas de texto
    for (const sale of sales) {
      const formattedDate = new Date(sale.created_at)
        .toISOString()
        .split("T")[0];
      const customer = sale.customer_name || "Walk-in Customer";
      const totalSalePrice = Number(sale.total_price).toFixed(2);

      for (const item of sale.sale_items) {
        const productName = item.product.name.replace(/,/g, ""); // Remove vírgulas para não quebrar o CSV
        const quantity = item.quantity;
        const unitPrice = Number(item.price_at_sale).toFixed(2);
        const itemTotal = (quantity * Number(item.price_at_sale)).toFixed(2);

        csvContent += `${sale.id},${customer},${formattedDate},${productName},${quantity},${unitPrice},${itemTotal},${totalSalePrice}\n`;
      }
    }

    return csvContent;
  }
}

export { ExportSalesService };
