var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var constants  = require('../constants');


var currencyLayerSchema = new Schema({
      success: Boolean,
      source: {
         type: String,
         enum: constants.currencies
        },
     currency_values: [{
          name: String,
          value: Number
      }]
    },
    {
        timestamps: true
    }
);

var currencyLayer = mongoose.model('currency_layer', currencyLayerSchema);

module.exports = currencyLayer;
