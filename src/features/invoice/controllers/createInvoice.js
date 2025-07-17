const prisma = require('../../../services/prisma');
const { createInvoiceSchema } = require('../schema/createInvoiceSchema');

module.exports = async (req, res) => {
  try {
    const { error } = createInvoiceSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        status: 'error', 
        message: error.message 
      });
    }

    const { invoiceCode, customerId, userId, date, total, discount, tax, grandTotal, items } = req.body;

    // Validasi stok cukup sebelum create invoice
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          status: 'error',
          message: `Stok untuk produk "${product?.name || 'Unknown'}" tidak mencukupi`
        });
      }
    }

    // Buat invoice dan invoice item
    const invoice = await prisma.invoice.create({
      data: {
        invoiceCode,
        customerId,
        userId,
        date: new Date(date),
        total,
        discount,
        tax,
        grandTotal,
        InvoiceItem: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal,
          }))
        }
      },
      include: { InvoiceItem: true }
    });

    // Kurangi stok produk
    await Promise.all(items.map(item => {
      return prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      });
    }));

    return res.status(201).json({ status: 'success', data: invoice });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
};
