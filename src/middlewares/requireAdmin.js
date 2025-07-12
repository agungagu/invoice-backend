const prisma = require("../services/prisma");


const requireAdmin = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    const user = await prisma.user.findUnique({
      where: { 
        id: userId 
      },
      select: { 
        id: true, 
        role: true 
      }
    });

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Admin access required' 
      });
    }
    next();
  } catch (error) {
    console.error('Admin check error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

module.exports = { requireAdmin };
