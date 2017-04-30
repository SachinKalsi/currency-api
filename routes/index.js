var express = require('express');
var router = express.Router();
var currencyList = require('./currency-list.routes')
var currencyLayer = require('./currency-layer.routes')

router.use('/update-currency-layer', currencyLayer);
router.use('/list', currencyList);

router.get('/', function(req, res){
    res.send('API Details Page');
});

module.exports = router;
