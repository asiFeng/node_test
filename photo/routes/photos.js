

var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;
var photos = [];

Photo.create({
    name: 'aaa',
    path: 'aaa'
}, function(err){
    if(err) return next(err);
    res.redirect('/');
});

function list( req, res, next ){
    try{
        Photo.find({}, function(err, photos){
            if(err) return next(err);
            
            res.render('photos/index', { 
                title: 'Photos',
                photos: photos
            });
        });
        
    }catch(err){
        next(err)
    }
}

function form(req, res, next ){
    res.render('photos/upload', {
        title: 'Photo Upload'
    });
}

function submit(dir ){
    return function( req, res, next ){
        var img = req.files.photos.image;
        var name = req.files.photos.name || img.name;
        var path = join(dir, img.name);

        fs.rename(img.path, path, function( err ){
            if(err) return next(err);

            Photo.create({
                name: name,
                path: img.name
            }, function(err){
                if(err) return next(err);
                res.redirect('/');
            });
        });
    }

}


module.exports = {
    list,
    form,
    submit,
}