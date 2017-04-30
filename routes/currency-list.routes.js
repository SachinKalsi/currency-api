var express = require('express');
var router = express.Router();
var currencyListController = require('../controllers/currency-list.controller');

router.get('/', currencyListController.getList);
router.get('/convert', currencyListController.convertCurrency);
module.exports = router;
