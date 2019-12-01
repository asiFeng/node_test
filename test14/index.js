var connect = require('connect');

var app = connect()
.use( connect.limit('32kb') )
.listen(3000);