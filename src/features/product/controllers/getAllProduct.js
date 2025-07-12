const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    res.status(200).json({ 
      success: true, 
      data: products 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
