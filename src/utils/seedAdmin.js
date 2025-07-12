const bcrypt = require('bcrypt');
const prisma = require('../services/prisma');

// Seed function to create the first admin user
const seedAdminUser = async () => {
  try {
    // Check if any admin user already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'admin' }
    });

    if (existingAdmin) {
      console.log('Admin user already exists. Skipping seed.');
      return;
    }

    // Create the first admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = await prisma.user.create({
      data: {
        name: 'System Administrator',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      }
    });

    console.log('Admin user created successfully:');
    console.log('Email:', adminUser.email);
    console.log('Password: admin123');
    console.log('Role:', adminUser.role);
    console.log('Please change the password after first login!');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
};

// Run the seed function
seedAdminUser(); 