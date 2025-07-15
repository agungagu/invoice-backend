const express = require('express');
const stockIn = require('../controllers/stockIn');
const stockOut = require('../controllers/stockOut');
const getStockHistory = require('../controllers/getStockHistory');
const router = express.Router();

const { authenticateToken } = require('../../../middlewares/auth');

router.post('/stock-in', authenticateToken, stockIn);
router.post('/stock-out', authenticateToken, stockOut);
router.get('/stock-history/:productId', authenticateToken, getStockHistory);

module.exports = router;