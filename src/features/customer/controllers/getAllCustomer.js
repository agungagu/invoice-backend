const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { created_at: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: customers
    });
  } catch (err) {
    console.error('Get customers error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
