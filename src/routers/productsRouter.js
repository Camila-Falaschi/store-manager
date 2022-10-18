const express = require('express');

const productsController = require('../controllers/productsController');
const { validateProduct, validateId } = require('../middlewares/validateValues');

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.get('/:id', validateId, productsController.getProductById);

router.post('/', validateProduct, productsController.newProductRegistration);

module.exports = router;