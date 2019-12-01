/**
 生成程序的初始结构；
 配置Express和你的程序；
 渲染视图，集成模板引擎；
 处理表单和文件上传；
 处理资源下载。
*/
var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.end('Hello');
});

app.listen(3000);

/**
 * 图片列表
 * 上传
 * 下载
 */
