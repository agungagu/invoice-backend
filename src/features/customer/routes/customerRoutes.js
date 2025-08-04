const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../../../middlewares/auth');

const createCustomer = require('../controllers/createCustomer');
const getAllCustomers = require('../controllers/getAllCustomer');   
const getCustomerById = require('../controllers/getCustomerByID');
const updateCustomer = require('../controllers/updateCustomer');
const deleteCustomer = require('../controllers/deleteCustomer');
const getCustomerCount = require('../controllers/getCustomerCount');

// Semua route harus login (kasir/admin)
router.use(authenticateToken);

router.post('/create', createCustomer);
router.get('/all', getAllCustomers);
// router.get('/:id', getCustomerById);
router.put('/update/:id', updateCustomer);
router.delete('/delete/:id', deleteCustomer);
router.get('/count', getCustomerCount);


module.exports = router;
