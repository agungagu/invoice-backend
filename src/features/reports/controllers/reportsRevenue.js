const getRevenueReport = require('../services/reportServices');

module.exports = async (req, res) => {
  try {
    const { range } = req.query; // ambil query range=daily/weekly/monthly
    const result = await getRevenueReport(range); // kirim ke service
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Error fetching revenue report:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
