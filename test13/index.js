/**
 * 会话管理、 cookie解析、请求主体解析、请求日志
*/

var connect = require('connect');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var json = require('json');

var app = connect()
.use( cookieParser() )  // 提供 req.cookie
.use( bodyParser.urlencoded({ extended: false }) )
.use( bodyParser.json() )   // 提供 req.body
// .use( json )
.use( function(req, res, next){
    console.log( 'req.cookies:  ',req.cookies );
    console.log( 'req.signedCookies:  ', req.signedCookies );

    console.log( 'req.body.name:  ',req.body );

    res.setHeader('Set-Cookie', 'name=asi');
    res.end('hello\n');
}).listen( 3000 );


/**
 * cookieParser   解析来自浏览器的cookie，放到req.cookies中
 * bodyParser     解析请求体 body
 * limit          跟 bodyParser 联手防止读取过大的请求
 * query          解析请求 URL 的查询字符串，放到 req.query中
*/


 
/**
 * logger
 * favicon
 * methodOverride
 * vhost
 * session
*/





/**
 * basicAuth
 * csrf
 * errorHAndler
 * 
 * static
 * compress
 * directory
 * 
 */