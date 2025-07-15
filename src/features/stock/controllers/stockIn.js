const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  try {
    const { productId, quantity, supplier, reference, notes } = req.body;
    const userId = req.user?.id; // dari JWT middleware

    if (!productId || !quantity) {
      return res.status(400).json({ 
        success: false, 
        message: 'Product ID dan quantity wajib diisi' 
    });
    }

    await prisma.stockIn.create({
      data: {
        productId,
        quantity: +quantity,
        supplier,
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
        stock: { increment: +quantity } 
    }
    });

    res.status(201).json({ 
        success: true, 
        message: 'Stock in berhasil ditambahkan' 
    });
    
  } catch (err) {
    console.error('Stock In Error:', err);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
    });
  }
};
