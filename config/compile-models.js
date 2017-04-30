const fs = require('fs');
const modelsPath = 'model';

try {
    fs.readdirSync(modelsPath).forEach(function(fileName){
        require(process.cwd() + '/' + modelsPath + '/' + fileName);
    });
}
catch(e) {
    console.log('error while compiling models');
    console.log(e);
}
