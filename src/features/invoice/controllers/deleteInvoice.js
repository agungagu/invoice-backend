const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Cek apakah invoice ada
    const invoice = await prisma.invoice.findUnique({
      where: { id: parseInt(id) },
      include: { InvoiceItem: true }
    });

    if (!invoice) {
      return res.status(404).json({
        status: 'error',
        message: 'Invoice not found'
      });
    }

    // 2. Kembalikan stok produk
    for (const item of invoice.InvoiceItem) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            increment: item.quantity
          }
        }
      });
    }

    // 3. Hapus invoice dan item
    await prisma.invoice.delete({
      where: { id: parseInt(id) }
    });

    res.json({ status: 'success', message: 'Invoice deleted and stock restored' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};
