const prisma = require("../../../services/prisma");


module.exports = async (req, res) => {
    try {
        const result = await prisma.invoiceItem.aggregate({
          _sum: {
            quantity: true,
          },
        });
    
        res.json({
          success: true,
          data: {
            totalSoldItems: result._sum.quantity || 0,
          },
        });
      } catch (error) {
        console.error("Error calculating total products sold:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    }