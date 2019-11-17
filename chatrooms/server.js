var http = require('http');
var fs =   require('fs');
var path = require('path'); // 提供文件目录相关的功能
var mime = require('mime'); // 可根据文件扩展名得出mime类型
var cache = {};  // 用来缓存文件内容的对象
var chatServer = require('./lib/chat_server');


/**
 * 请求的文件不存在，404响应
 * @param {*} response 
 */
function send404(response) {
    response.writeHead( 404, {'Content-Type':'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
}

/**
 * 提供文件数据服务
 * @param {*} response 
 * @param {*} filePath 
 * @param {*} fileContents 
 */
function sendFile(response, filePath, fileContents) {
    response.writeHead(200,
        {'Content-Type':mime.getType(path.basename(filePath))}
    );
    response.end(fileContents);
}


/**
 * 提供静态文件
 * @param {*} response 
 * @param {*} cache 
 * @param {*} absPath 
 */
function serveStatic(response, cache, absPath) {
    if(cache[absPath]){
        sendFile(response, absPath, cache[absPath]);
        return;
    }
    fs.exists(absPath, function(exists) {
        if(!exists){
           send404(response);
           return;
        }
        fs.readFile(absPath, function(err, data){
            if(err) {
                send404(response);
                return;
            }
            cache[absPath] = data;
            sendFile(response, absPath, data);
        })
    });
}


// 创建服务
var server = http.createServer(function(request, response) {
    var filePath = false;

    if(request.url == '/') {
        filePath = 'public/index.html';
    }else{
        filePath = 'public' + request.url;
    }
    var absPath = './' + filePath;
    serveStatic(response, cache, absPath);
});

server.listen(3000, function() {
    console.log('Server listening at http://localhost:3000 ');    
});

charServer.listen(server);
