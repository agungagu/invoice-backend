const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({ 
      where: { id } 
    });

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: product 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
