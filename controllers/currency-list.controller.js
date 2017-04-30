const mongoose = require('../config/custom-mongoose');
const CurrencyLayer = mongoose.model('currency_layer');
const currencies = require('../constants').currencies;
const changeBaseCurrency = require('../util/change-base-currency');

module.exports.getList = function(req, res) {
    CurrencyLayer.findOne({}, {
         '_id': 0,
         'currency_values._id': 0,
         'createdAt': 0,
         'updatedAt': 0,
         '__v': 0
     }).sort({
         _id: -1
     }).exec(function(err, result) {
         if(result){
             var changeSource = req.query.source || 'INR';
             var price = req.query.price || 1;

             var result = changeBaseCurrency('INR', changeSource , result.currency_values, price);
             result.source = changeSource.toUpperCase();
             return res.json(result);
         } else {
             res.json({
                 success: false,
                 error: {
                     message: 'Something went wrong. Please contact the developer'
                 }
             });
         }

    });
};

module.exports.convertCurrency = function(req, res) {
    var source = req.query.source;
    var destination = req.query.destination;
    var price = req.query.price || 1;
    if(!(source && destination)) {
        return res.json({
            success: false,
            error: {
                message: 'Invalid Parameters: Please mention source, destination'
            }
        })
    }
    if(isNaN(price)){
        return res.json({
            success: false,
            error: {
                message: 'Invalid value for the parameter price'
            }
        })
    }
    source = source.toUpperCase();
    destination = destination.toUpperCase();

    var sourceCurrencyIndex = currencies.indexOf(source);
    var destinationCurrencyIndex = currencies.indexOf(destination);
    if(sourceCurrencyIndex === -1 || destinationCurrencyIndex === -1 ) {
        var response = {};
        response.success = false;
        source = ' ' + source;
        destination = ' ' + destination;
        response.errors = {
            message: 'Invalid currency: ' + ((sourceCurrencyIndex === -1) ? source : '')+ ((destinationCurrencyIndex === -1) ? destination : '') ,
            valid_currencies: currencies
        }
        return res.json(response);
    }
    CurrencyLayer.findOne({}, {
         '_id': 0,
         'currency_values._id': 0,
         'createdAt': 0,
         'updatedAt': 0,
         '__v': 0
     }).sort({
         _id: -1
     }).exec(function(err, result) {
         var SourceToINR, destinationPrice;
         result.currency_values.forEach(function(quote) {
             if(quote.name === source) {
                 if(quote.value) {
                     SourceToINR =  ( 1 / quote.value);
                 }
             }
             if(quote.name === destination) {
                 if(quote.value) {
                     destinationPrice = quote.value;
                 }
             }
         });

         res.json({
            success: true,
            source: source,
            destination: destination,
            price: price,
            converted_value: price * SourceToINR * destinationPrice
         });

    });

};
