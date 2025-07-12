const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const prisma = require("../../../services/prisma");

module.exports = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array()
       });
    }

    const { name, email, password, role = 'user' } = req.body;

    const existingUser = await prisma.user.findUnique({ 
      where: { email } 
    });

    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: 'Email already exists' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
      select: { 
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true }
    });

    res.status(201).json({ 
      success: true,
      data: newUser
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error'
    });
  }
};
