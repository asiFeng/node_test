var http = require('http');


/**
 * 请求处理函数
 * @param {*} req 
 * @param {*} res 
 */
var handleServer = function( req, res ){
    switch( req.method) {
        case 'POST':
            var item = '';
            req.on( 'data', function(chunk){
                item += chunk;      
            });
            req.on( 'end', function(){
                res.end('OK\n');
            });
            console.log('chunk: ', item );
            break;
        case 'GET':
                res.end('OK\n'+req.method);
            break;

    }
        



    var body = 'Hello World!';
    var url = 'http://www.baidu.com';
    body = '<p>Open another tab <a href="'+ url +'">' + '百度' + '</a></p>';
    res.setHeader('Content-Type','text/html;charset=UTF-8');
    res.setHeader( 'Content-Length', body.length )
    res.statusCode = 200;
    // console.log('res:  ', Object.keys(res));

    res.write(body);
    res.end();
}


// 创建服务器
var server = http.createServer( handleServer );
server.listen(3000);

