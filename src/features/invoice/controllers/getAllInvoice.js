const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        customer: true,
        user: true,
        InvouceItem: { 
            include: { 
                product: true 
            } 
        }
      }
    });

    res.json({ 
        status: 'success', 
        data: invoices 
    });
  } catch (error) {
    res.status(500).json({ 
        status: 'error', 
        message: error.message 
    });
  }
};
