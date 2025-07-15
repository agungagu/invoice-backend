const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  try {
    const { productId } = req.params;

    const [stockIn, stockOut] = await Promise.all([
      prisma.stockIn.findMany({
        where: { productId },
        orderBy: { date: 'desc' }
      }),

      prisma.stockOut.findMany({
        where: { productId },
        orderBy: { date: 'desc' }
      })
    ]);

    res.status(200).json({
      success: true,
      message: 'Histori stok berhasil diambil',
      data: { stockIn, stockOut }
    });
  } catch (err) {
    console.error('Stock History Error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
