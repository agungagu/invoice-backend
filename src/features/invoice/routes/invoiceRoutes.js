const express = require('express');
const router = express.Router();

const createInvoice = require('../controllers/createInvoice');
const getInvoices = require('../controllers/getAllInvoice');
const getInvoiceById = require('../controllers/getInvoiceById');
const updateInvoice = require('../controllers/updateInvoice');
const deleteInvoice = require('../controllers/deleteInvoice');
const exportInvoiceReport = require('../controllers/exportInvoiceReport');
const getInvoiceCount = require('../controllers/getInvoiceCount');

router.post('/create', createInvoice);
router.get('/get-all', getInvoices);
router.get('/count', getInvoiceCount);
router.get('/:id', getInvoiceById);
router.put('/:id', updateInvoice);
router.delete('/:id', deleteInvoice);
router.get('/export', exportInvoiceReport);

module.exports = router;
