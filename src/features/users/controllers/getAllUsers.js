const prisma = require("../../../services/prisma");

module.exports = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { 
        id: true, 
        name: true, 
        email: true, 
        role: true, 
        created_at: true, 
        updated_at: true 
      },

      orderBy: { 
        created_at: 'desc' 
      }
    });

    res.status(200).json({ 
      success: true, 
      data: users 
    });
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};
