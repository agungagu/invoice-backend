const { verifyToken } = require('../services/jwt');
const prisma = require('../services/prisma');

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Access token required' });

    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, role: true }
    });

    if (!user) return res.status(401).json({ success: false, message: 'User not found' });

    req.user = user;
    next();
  } catch (error) {
    if (['JsonWebTokenError', 'TokenExpiredError'].includes(error.name)) {
      return res.status(401).json({ success: false, message: error.message });
    }

    return res.status(500).json({ success: false, message: 'Authentication error' });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return next();

    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, role: true }
    });

    if (user) req.user = user;
    next();
  } catch (err) {
    next(); // Don't block route
  }
};

module.exports = { authenticateToken, optionalAuth };
