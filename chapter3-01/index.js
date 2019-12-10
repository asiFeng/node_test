const express = require('express');
const bodyParser = require('body-parser');
const Article = require('./db').Article;
const path =require('path');
const read = require('node-readability');


const app = express();
app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'))
    .set(path.join(__dirname,'./views'),'views')
    .set('port', process.env.port || 3000)
    .set('view engine','ejs')


app
    .get('/articles', (req, res, next)=>{
        Article.all((err, articles)=>{
            if(err) return next(err);
            console.log(articles[0]);
            
            res.render('articles',{articles:articles});
        });
    })
    .post('/articles', (req, res, next)=>{
        let result = req.body;
        // read(url, (err, result)=>{
            Article.create(
                {title:result.title, content: result.content},
                (err)=>{
                if(err) return next(err);
                res.send('Post success.')
            })
        // });
    })
    .get('/articles/:id', (req, res, next)=>{
        const id = req.params.id;
        console.log('id:   ', id);
        Article.find(id,(err, article)=>{
            console.log('id:   ', err);
            console.log('id:   ', article);
            if(err) return next(err);
            res.send(article);
        })
    })
    .delete('/articles/:id', (req, res, next)=>{
        const id = req.params.id;
        console.log('id:  ',id);
        Article.delete(id, (err)=>{
            if(err) return next(err);
            res.send({message: 'Deleted'});
        });
    })
    // .get('/dropTable', (req, res, next)=>{
    //     Article.drop((err)=>{
    //         if(err) return next(err);
    //         res.send('drop table success');
    //     });
    // })
    .get('/clearTable', (req, res, next)=>{
        Article.clear((err)=>{
            if(err) return next(err);
            res.send('clear table success');
        });
    })

app.listen( app.get('port'), ()=>{
    console.log('This server is running on http://localhost:3000');    
})

module.exports = app;
