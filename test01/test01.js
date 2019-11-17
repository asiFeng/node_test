var fs = require('fs');
fs.readFile('./resource.json', function(err, data){
    console.log('data',data);    
});
console.log('end fs');

