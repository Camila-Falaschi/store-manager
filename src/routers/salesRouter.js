const express = require('express');

const salesController = require('../controllers/salesController');
const { validateSale } = require('../middlewares/validateValues');

const router = express.Router();

router.post('/', validateSale, salesController.newSalesRegistration);

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSalesById);

module.exports = router;
