const currencies = require('../constants').currencies;

function changeBaseCurrency(source, destination, currency_values, price) {
    //  source : currency in which currency_values are present
    // destination: destination currency
    // currency_values: array of objects of the form ( {name: 'INR' , value: 100})
    price = price || 1;
    source = source.toUpperCase();
    destination = destination.toUpperCase();
    var response  = {};
    var sourceCurrencyIndex = currencies.indexOf(source);
    var destinationCurrencyIndex = currencies.indexOf(destination);
    if(sourceCurrencyIndex === -1 || destinationCurrencyIndex === -1 ) {
        response.success = false;
        source = ' ' + source;
        destination = ' ' + destination;
        response.errors = {
            message: 'Invalid currency: ' + ((sourceCurrencyIndex === -1) ? source : '')+ ((destinationCurrencyIndex === -1) ? destination : '') ,
            valid_currencies: currencies
        }
        return response;
    }

    var destinationToSource;

    currency_values.forEach(function(quote) {
        if(quote.name === destination) {
            if(quote.value) {
                destinationToSource =  ( 1 / quote.value);
                return false;
            }
        }
    });

    var convertedCurrencies = [];

    currency_values.forEach(function(quote) {
        convertedCurrencies.push({
            name: quote.name,
            value: destinationToSource * quote.value * price
        });
    });
    response.success = true;
    response.source = destination;
    response.currency_values = convertedCurrencies;
    return response;
}

module.exports = changeBaseCurrency;
