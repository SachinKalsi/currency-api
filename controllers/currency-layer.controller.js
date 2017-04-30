const mongoose = require('../config/custom-mongoose');
const CurrencyLayer = mongoose.model('currency_layer');
const request = require('request');
const currencies = require('../constants').currencies;
const changeBaseCurrency = require('../util/change-base-currency');

const CURRENCY_LAYER_URL = 'http://www.apilayer.net/api/live'

function saveCurrencyLayer(api_response , callback) {
    var currency_values = Object.keys(api_response.quotes).map(function(currencyName, i) {
        return {
            name: currencyName.substring(3),
            value: api_response.quotes[currencyName]
        }
    });
    var result = changeBaseCurrency('USD', 'INR', currency_values);

    new CurrencyLayer({
        source: 'INR',
        currency_values: result.currency_values
    }).save(callback);
}

module.exports.createList = function(req, res) {
    if(!(req.body.name && req.body.pass && req.body.name === 'Bharath' && req.body.pass === 'Bharath')) {
        return res.status(403).send({
            success: false,
            error: {
                message: 'You are not authorised'
            }
        });
    }
    request.get(CURRENCY_LAYER_URL + '?access_key=' + process.env.access_key, function(error, response, body) {
        if(response.statusCode === 200) {
            var api_response = JSON.parse(response.body.toString());
            saveCurrencyLayer(api_response, function(error, result) {
                res.json({
                    success: true,
                    result: result
                });
            });
        } else {
            res.status(400).send(error);
        }
    });
};
