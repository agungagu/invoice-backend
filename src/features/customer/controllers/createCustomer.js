const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    if (!name || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, and address are required'
      });
    }

    const existingPhone = await prisma.customer.findUnique({
      where: { 
        phone 
    }
    });

    if (existingPhone) {
      return res.status(409).json({
        success: false,
        message: 'Phone number already exists'
      });
    }

    const customer = await prisma.customer.create({
      data: { 
        name, 
        phone, 
        address 
    }
    });

    res.status(201).json({
      success: true,
      data: customer
    });
  } catch (err) {
    console.error('Create customer error:', err);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
    });
  }
};
