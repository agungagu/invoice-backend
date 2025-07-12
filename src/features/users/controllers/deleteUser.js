const prisma = require("../../../services/prisma"); 


module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user?.id === id) {
      return res.status(400).json({ success: false, message: 'Cannot delete yourself' });
    }

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ success: false, message: 'User not found' });

    await prisma.user.delete({ where: { id } });

    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
