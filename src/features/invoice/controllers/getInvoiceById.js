const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await prisma.invoice.findUnique({
      where: { id: parseInt(id) },
      include: {
        customer: true,
        user: true,
        InvoiceItem: {
          include: {
            product: true
          }
        }
      }
    });

    if (!invoice) {
      return res.status(404).json({
        status: 'error',
        message: 'Invoice not found'
      });
    }

    res.json({ 
        status: 'success', 
        data: invoice 
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
        status: 'error', 
        message: error.message
    });
  }
};
