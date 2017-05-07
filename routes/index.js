var express = require('express');
var path = require('path');
var router = express.Router();
var currencyList = require('./currency-list.routes')
var currencyLayer = require('./currency-layer.routes')

router.use('/update-currency-layer', currencyLayer);
router.use('/list', currencyList);

router.get('/', function(req, res){
    // res.send('API Details Page');
    res.sendFile('index.html');
});

router.get('*', function(req, res){
    // res.send('API Details Page');
    // res.sendFile('index.html');
    res.sendFile(path.resolve(__dirname + '/../public/404.html'));
});

module.exports = router;
