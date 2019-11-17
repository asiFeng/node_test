var http  = require('http');
var mysql = require('mysql');
var work  = require('./lib/timetrack');

var db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'timetrack'
});

