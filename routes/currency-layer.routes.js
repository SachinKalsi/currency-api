var express = require('express');
var router = express.Router();
var currencyLayerController = require('../controllers/currency-layer.controller');

router.post('/', currencyLayerController.createList);

module.exports = router;
