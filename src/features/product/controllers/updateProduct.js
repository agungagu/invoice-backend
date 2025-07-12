const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, size, price, stock, imageUrl } = req.body;

    const product = await prisma.product.findUnique({ 
      where: { id } 
    });

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: { 
        name, 
        code, 
        size, 
        price, 
        stock, 
        imageUrl, 
        updated_at: new Date() 
      }
    });

    res.status(200).json({ 
      success: true, 
      data: updated 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
