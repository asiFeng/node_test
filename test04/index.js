var http = require('http');


/**
每次接收到http请求都会调用这个函数
 * 接受一个回调函数作为参数
 * 回调函数参数： req,  res
 */
var server = http.createServer( function(request, response){
	// 处理请求
});