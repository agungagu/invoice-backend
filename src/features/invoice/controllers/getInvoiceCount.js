const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  try {
    const {
      search = '',
      date
    } = req.query;

    const whereClause = {
      AND: [
        {
          OR: [
            { invoiceCode: { contains: search, mode: 'insensitive' } },
            { customer: { name: { contains: search, mode: 'insensitive' } } }
          ]
        },
        date ? { date: new Date(date) } : {}
      ]
    };

    const totalCount = await prisma.invoice.count({ 
      where: whereClause 
    });

    res.json({
      status: 'success',
      data: {
        count: totalCount
      },
      message: 'Invoice count retrieved successfully'
    });
  } catch (error) {
    console.error('Get invoice count error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Internal server error while retrieving invoice count' 
    });
  }
};
