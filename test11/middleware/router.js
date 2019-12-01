// method 不在这个 routes  next

module.exports = function( routes ){
    return function router( req, res, next ){
        let urlList = routes[req.method];

        res.end();
    }
}