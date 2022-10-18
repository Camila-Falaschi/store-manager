const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.get('/:id', productsController.getProductById);

router.put('/', productsController.newProductRegistration);

module.exports = router;