const prisma = require('../../services/prisma');

module.exports = async (req, res) => {
  try {
    const { productId, quantity, reason, reference, notes } = req.body;
    const userId = req.user?.id;

    const product = await prisma.product.findUnique({ 
        where: { 
            id: productId 
        } 
    });

    if (!product || product.stock < quantity) {
      return res.status(400).json({ 
        success: false, 
        message: 'Stok tidak cukup atau produk tidak ditemukan' 
    });
    }

    await prisma.stockOut.create({
      data: {
        productId,
        quantity: +quantity,
        reason,
        reference,
        notes,
        userId
      }
    });

    await prisma.product.update({
      where: { 
        id: productId 
    },
      data: { 
        stock: { decrement: +quantity } 
    }
    });

    res.status(201).json({ 
        success: true, 
        message: 'Stock out berhasil dikurangi' 
    });

  } catch (err) {
    console.error('Stock Out Error:', err);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
    });
  }
};
