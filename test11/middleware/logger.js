/**
 * 可配置日志中间件
 * @param {*} format 
 */
function setup( format ){
    var regexp = /:(\w+)/g;

    return function logger( req, res, next ){
        // match：    正则匹配的模式，有多少匹配的，这个函数就调用多少次
        // property： (括号) 匹配到的字符串
        var str = format.replace(regexp, function(match, property){
            return req[property];
        });
        console.log( str );
        next();        
    }
}
module.exports = setup;


/**
 * 测试代码
 */
// function test( format ){
//     req = {
//         method: 'DELETE',
//         url: 'http://localhost:3000',
//         name: 'Asi'
//     };
//     var regexp = /:(\w+)/g;
//     var str = format.replace(regexp, function(match, property, offset){
//         console.log( `match: ${match}  property: ${property}  offset:  ${offset}` );        
//         return req[property];
//     });
//     console.log( str );
// }

// test(':method    :url');