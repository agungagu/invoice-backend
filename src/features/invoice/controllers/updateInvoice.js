const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { total, discount, tax, grandTotal } = req.body;

  try {
    const invoice = await prisma.invoice.update({
      where: { id },
      data: {
        total, 
        discount, 
        tax, 
        grandTotal,
      }
    });

    res.json({ 
        status: 'success', 
        data: invoice 
    });

  } catch (error) {
    res.status(500).json({ 
        status: 'error', 
        message: error.message 
    });
  }
};
