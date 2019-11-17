var connect = require('connect');

var app = connect();
app
.use( '/asi', logger )
.use( hello )
.listen(3000);

/**
 * 记录请求
 * 1、logger 将请求输出到控制台
 * req
 * res
 * next()  回调函数
 */
function logger( req, res, next ){
    console.log('%s %s', req.method, req.url);
    next();
}

 
 /**
 * 2、用 Hello world 响应请求
 */
function hello(req, res){
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello world\n');
}

// -----------------------------------  挂载  给中间件及程序定义 路径前缀 -------------------------------

/**
 * restrict组件
 * 确保访问页面的是有效用户
 */


 /**
  * admin组件
  * 给用户呈现管理区
  */