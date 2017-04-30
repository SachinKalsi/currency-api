var schedule = require('node-schedule');
var URL = 'http://localhost:4000/update-currency-layer';
const request = require('request');

function updateCurrency() {
    var options = {
      method: 'post',
      body: {
          name: 'Bharath',
          pass: 'Bharath'
      },
      json: true,
      url: URL
    };
    request(options, function(err, httpResponse, body) {
    if(httpResponse && httpResponse.statusCode === 403) {
        console.log(httpResponse.body);
    }
    if (err) {
        return console.error('failed:', err);
     }
    });
}

setInterval(updateCurrency, 60000);
