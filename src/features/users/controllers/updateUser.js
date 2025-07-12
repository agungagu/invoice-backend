const prisma = require("../../../services/prisma");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ success: false, message: 'User not found' });

    if (email && email !== existing.email) {
      const exists = await prisma.user.findUnique({ where: { email } });
      if (exists) return res.status(409).json({ success: false, message: 'Email already in use' });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { name, email, role },
      select: { id: true, name: true, email: true, role: true, created_at: true, updated_at: true }
    });

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
