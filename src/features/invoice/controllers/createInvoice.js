const prisma = require('../../../services/prisma');
const { v4: uuidv4 } = require("uuid");

module.exports = async (req, res) => {
  try {
    const { customerId, userId, items } = req.body;

    if (!customerId || !userId || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Generate invoiceCode secara otomatis (misalnya INV-00001)
    const lastInvoice = await prisma.invoice.findFirst({
      orderBy: { created_at: "desc" },
    });

    const nextNumber = lastInvoice
      ? parseInt(lastInvoice.invoiceCode.split("-")[1]) + 1
      : 1;
    const invoiceCode = `INV-${nextNumber.toString().padStart(5, "0")}`;

    // Ambil harga produk dan hitung subtotal tiap item
    const enrichedItems = await Promise.all(
      items.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });
        if (!product) throw new Error(`Product not found: ${item.productId}`);
        const subtotal = product.price * item.quantity;
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
          subtotal,
        };
      })
    );

    const total = enrichedItems.reduce((acc, item) => acc + item.subtotal, 0);
    const grandTotal = total; // bisa tambahkan diskon/pajak jika perlu

    // Simpan invoice dan itemnya
    const invoice = await prisma.invoice.create({
      data: {
        id: uuidv4(),
        invoiceCode,
        customerId,
        userId,
        total,
        grandTotal,
        date: new Date(),
        InvoiceItems: {
          createMany: {
            data: enrichedItems,
          },
        },
      },
      include: {
        InvoiceItems: true,
      },
    });

    res.status(201).json({ message: "Invoice created", data: invoice });
  } catch (error) {
    console.error("Gagal membuat invoice:", error);
    res.status(500).json({ message: "Gagal membuat invoice", error: error.message });
  }
};
