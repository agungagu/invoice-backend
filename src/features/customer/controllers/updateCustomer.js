const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, address } = req.body;

    const existing = await prisma.customer.findUnique({ 
        where: { id } 
    });
    
    if (!existing) {
      return res.status(404).json({ 
        success: false, 
        message: 'Customer not found' 
    });
    }

    if (phone) {
      const duplicatePhone = await prisma.customer.findUnique({
        where: { 
            phone 
        }
      });

      if (duplicatePhone && duplicatePhone.id !== id) {
        return res.status(409).json({
          success: false,
          message: 'Phone number already exists'
        });
      }
    }

    const updated = await prisma.customer.update({
      where: { 
        id 
    },
      data: { 
        name, 
        phone, 
        address 
    }
    });

    res.status(200).json({ 
        success: true, 
        data: updated 
    });
  } catch (err) {
    console.error('Update customer error:', err);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
    });
  }
};
