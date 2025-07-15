const express = require('express');
const stockIn = require('../controllers/stockIn');
const stockOut = require('../controllers/stockOut');
const getStockHistory = require('../controllers/getStockHistory');
const stock_router = express.Router();

const verifyToken = require('../../../utils/jesonWebToken');

stock_router.post('/stock-in', verifyToken, stockIn);
stock_router.post('/stock-out', verifyToken, stockOut);
stock_router.get('/stock-history/:productId', verifyToken, getStockHistory);

module.exports = stock_router;