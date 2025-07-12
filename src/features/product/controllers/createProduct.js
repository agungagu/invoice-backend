const prisma = require('../../../services/prisma');
const path = require('path');

module.exports = async (req, res) => {
  try {
    const { name, code, size, price, stock } = req.body;

    const exists = await prisma.product.findUnique({ where: { code } });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Product code already exists' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const product = await prisma.product.create({
      data: {
        name,
        code,
        size,
        price: parseInt(price),
        stock: parseInt(stock),
        imageUrl,
        created_at: new Date()
      }
    });

    res.status(201).json({ success: true, data: product });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
