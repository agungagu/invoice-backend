const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.invouceItem.deleteMany({ 
        where: { 
            invoiceId: id 
        } 
    });

    await prisma.invoice.delete({ 
        where: { id } 
    });

    res.json({ 
        status: 'success', 
        message: 'Invoice deleted successfully' 
    });

  } catch (error) {
    res.status(500).json({ 
        status: 'error', 
        message: error.message 
    });
  }
};
