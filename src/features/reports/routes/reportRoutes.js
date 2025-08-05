const express = require('express');
const reportsRevenue = require("../controllers/reportsRevenue");
const { authenticateToken } = require('../../../middlewares/auth');
const reportTotalSales = require('../controllers/reportTotalSales');

const router = express.Router();

router.use(authenticateToken);

router.get("/revenue", reportsRevenue);
router.get("/total-sales", reportTotalSales);

module.exports = router;
