const prisma = require('../../../services/prisma');

const getCustomerCount = async (req, res) => {
  try {
    const count = await prisma.customer.count();
    res.status(200).json({
      success: true,
      data: { count },
    });
  } catch (error) {
    console.error("Error getting customer count:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = getCustomerCount;
