const prisma = require('../../../services/prisma');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.customer.findUnique({ 
        where: { id } 
    });

    if (!existing) {
      return res.status(404).json({ 
        success: false, 
        message: 'Customer not found' 
    });
    }

    await prisma.customer.delete({ 
        where: { id }
     });

    res.status(200).json({ 
        success: true, 
        message: 'Customer deleted successfully' 
    });

  } catch (err) {
    console.error('Delete customer error:', err);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
    });
  }
};
