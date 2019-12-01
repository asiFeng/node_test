var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost/photo_app',  {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}, function(err, res){
    if(err) return console.log('connect Error!  ');
    console.log('connect Success!  ');
});

var schema = new mongoose.Schema({ 
    name: 'string', 
    path: 'string' 
});

module.exports = mongoose.model('Photo', schema );