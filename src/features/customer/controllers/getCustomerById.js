const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.findUnique({
      where: { 
        id 
    }
    });

    if (!customer) {
      return res.status(404).json({ 
        success: false, 
        message: 'Customer not found' 
    });
    }

    res.status(200).json({ 
        success: true, 
        data: customer 
    });

  } catch (err) {
    console.error('Get customer error:', err);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
    });
  }
};
