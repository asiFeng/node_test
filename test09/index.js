var http = require('http');
var url = require('url');
var qs   = require('querystring');
var Buffer = require('buffer').Buffer;

var items = ['1111111111','222222222222'];

var server = http.createServer( function(req, res){
    // console.log('path:   ', url.parse(req.url).pathname);

    console.log('req.session:  ', req.session);
    
    
    if(url.parse(req.url).pathname.includes('/')){
        switch(req.method){
            case 'POST':
                console.log('pathName:  ', url.parse(req.url).pathname);     
                if(url.parse(req.url).pathname=='/'){
                    add(req, res);
                }else{
                    show(res);
                }
                break;
            case 'GET':
                    // console.log('do get');
                    show(res);
                break;
            default:
                    // console.log('do other');
                badRequest(res);
        }

    }else{
        notFound(res);        
    }
});
server.listen(3000);


function show(res){
    var body = '<html><head><title>index</title>'
    +'<script>window.onload=function(){sessionStorage.setItem("_t", new Date().getTime();)}</script>'
    +'</head><body>'
    + '<h3>Items</h3>'
    + '<form action="/" method="post"><input name="item"></input>'
    + '<input type="submit" value="提交"></input></form>'
    + '<ul>'
    + items.map((el, i) => '<li>' + el + '</li>').join('')
    + '</ul></body></html>\n';
    res.setHeader('Content-Type','text/html;charset=utf-8');
    // console.log('body:  ' ,body);
    
    res.setHeader('Content-Length', Buffer.byteLength(body));
    res.end(body);
};

function add(req, res){
    var body = '';
    req.setEncoding('utf-8');
    req.on('data', function(chunk){
        body += qs.parse(chunk).item; 
    });
    req.on('end', function(){
        items.push(body);
        show(res);
    })
};

function badRequest(res){
    res.statusCode = 400;
    res.end('Bad request.\n');
};

function notFound(res){
    res.statusCode = 404;
    res.end('Not found.\n');
};