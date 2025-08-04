const express = require('express');
const reportsRevenue = require("../controllers/reportsRevenue");
const { authenticateToken } = require('../../../middlewares/auth');

const router = express.Router();

router.use(authenticateToken);

router.get("/revenue", reportsRevenue);

module.exports = router;
