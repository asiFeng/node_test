var http = require('http');
var fs = require('fs');


/**
// 服务器写法 1
http.createServer( function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(3000);
console.log('Server running at http://localhost:3000/');
*/


/**
// 服务器写法 2
var server = http.createServer();
server.on('request', function(req, res){    // 为request设置事件监听器
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.end('Hello World 02\n');
})
server.listen(3000);
console.log('Server running at http://localhost:3000/');
*/


/**
// 流数据
var stream = fs.createReadStream('./resource.json');
stream.on('data', function(chunk){
	console.log(chunk)
})
stream.on('end', function(){
	console.log('finished')
})
*/


// 写数据流
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'image/png'});
	fs.createReadStream('./image.jpg').pipe(res);
}).listen(3000);
console.log('Server running at http://localhost:3000/');