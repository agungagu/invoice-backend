const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({ 
      where: { id } 
    });

    res.status(200).json({ 
      success: true, 
      message: 'Product deleted successfully' 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
