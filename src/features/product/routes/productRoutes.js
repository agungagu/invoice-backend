const express = require('express');
const router = express.Router();
const validate = require('../../../middlewares/joiValidate');
const upload = require('../../../middlewares/uploadFile');
const { productSchema } = require('../schema/createProductSchema');

const create = require('../controllers/createProduct');
const readAll = require('../controllers/getAllProduct');
const readOne = require('../controllers/getProductById');
const update = require('../controllers/updateProduct');
const remove = require('../controllers/deleteProduct');

// gunakan upload.single untuk handle image
router.post('/create', upload.single('image'), validate(productSchema), create);
router.get('/getAllProduct', readAll);
router.get('/getProduct/:id', readOne);
router.put('/updateProduct/:id', upload.single('image'), validate(productSchema), update);
router.delete('/deleteProduct/:id', remove);

module.exports = router;
