const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
        user: true,
        InvouceItem: { include: { product: true } }
      }
    });

    if (!invoice) return res.status(404).json({ status: 'error', message: 'Invoice not found' });

    res.json({ status: 'success', data: invoice });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
