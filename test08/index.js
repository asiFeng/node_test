var http  = require('http');
var parse = require('url').parse;
var join  = require('path').join;
var fs    = require('fs');
var qs    = require('querystring');  
var root = __dirname;


// fs.readStream   with data Event
// stream.pipe
// ReadableStream
// WritableStream
// ReadableStream.pipe(WritableStream)
// req 是一个ReadAbleStream

// fs.access()

var server = http.createServer( function(req, res){
    var url = parse(req.url).pathname;
    var path = join(root, url);

    // 文件不存在，stat== undefined
    // fs.stat(path, function(err, stat){
    //     console.log('stat:   ', stat);
    //     console.log('stat:    ', stat.isFile());
    // });

    // 简化 利用pipe
    var stream = fs.createReadStream(path);
    stream.pipe(res); // res.end() 会在内部被调用

    stream.on('open', function(){
        console.log('readStream opened!');
    });

    stream.on('ready', function(){
        console.log('readStream ready!');
    });

    stream.on('close', function(){
        console.log('readStream closed!');
    });

    // 错误事件捕获
    stream.on('error', function(){
        res.statusCode = 500;
        res.end('Internal Server Error');
    });
    
    
    // fs.access(path, (err, data)=>{
    //     if(err){
    //         res.end('Could not find the file\n');
    //     }else{

    //     }
    // });


});


server.listen(3000);

/**
    var stream = fs.ReadStream(path);
    stream.on('data', function(chunk){
        res.write(chunk);
    });

    stream.on('end',function(){
        res.end('OK\n');
    })
*/   


/**
show()
add()
badRequest()
notFound()

 */