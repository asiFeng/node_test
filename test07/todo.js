var http = require('http');
var url = require('url');
var items = [];

/**  url module 解析结果
Url {
    pathname: '/1',
    path: '/1?api-key=foobar',
    href: 'http://localhost:3000/1?api-key=foobar' }
 */

/** 请求处理函数 */
var handleServer = function( req, res ){
    switch( req.method) {
        case 'POST':
            var item = '';
            req.on( 'data', function(chunk){
                item += chunk;
            });
            req.on( 'end', function(){
                items.push( item );
                res.end('OK\n');
            });
            break;
        case 'GET':
            var body = items.map( function(item, i){
                return i + ')' + item;
            }).join( '\n' );
            console.log('pathName:   ', url.parse(req.url).pathname);       
            res.setHeader('Content-Length', Buffer.byteLength(body) ); // 禁用node块编码
            res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
            res.end(body, 'utf-8');
            break;
        case 'DELETE':
            var pathName = url.parse(req.url).pathname;
            var i = parseInt(pathName.slice(1), 10);
            if( isNaN(i) ){
                res.statusCode = 400;
                res.end('Invalid item id\n');
            }else if( !items[i] ){
                res.statusCode = 404;
                res.end('item not found\n');
            }else{
                items.splice(i,1);
                res.statusCode = 200;
                res.end('OK \n');
            }
            break;
        case 'PUT':
            var reqInfo = url.parse(req.url);     
            var i = parseInt( reqInfo.pathname.slice(1), 10);
            console.log('reqInfo:   ', reqInfo);            
            var val = reqInfo.query.split('=')[1];
            if(!val){
                res.statusCode = 400;
                res.end('Invalid value\n');
            }
            if( isNaN(i) ){
                res.statusCode = 400;
                res.end('Invalid item id\n');
            }else if( !items[i] ){
                items.push(val);
                res.statusCode = 200;
                res.end('You have add a new value here!\n');
            }else{
                items[i] = val;
                res.statusCode = 200;
                res.end('Update success.\n');
            }
            break;

    }
}

// 创建服务器
var server = http.createServer( handleServer );
server.listen(3000);
console.log('__dirname:  ', __dirname);


