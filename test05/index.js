var currencyUtil = require('currency');

var canadianD = 50;
var toUs = currencyUtil.canadianToUS(canadianD);
console.log('canadianD: ', canadianD, '    toUs:  ',toUs);

console.log('50 US dollars change to canadian equals: ');
console.log( currencyUtil.USToCanadian(50));

