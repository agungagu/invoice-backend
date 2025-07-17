const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  try {
    const {
      search = '',
      date,
      page = 1,
      limit = 10
    } = req.query;

    const skip = (page - 1) * limit;
    const take = parseInt(limit);

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

    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
        where: whereClause,
        include: {
          customer: true,
          user: true,
          InvoiceItem: {
            include: { product: true }
          }
        },
        skip,
        take,
        orderBy: { date: 'desc' }
      }),
      prisma.invoice.count({ where: whereClause })
    ]);

    res.json({
      status: 'success',
      data: invoices,
      meta: {
        total,
        page: parseInt(page),
        limit: take,
        totalPages: Math.ceil(total / take)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};
