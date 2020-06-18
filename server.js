const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb+srv://RhonDB:Dragonnest0909@cluster0-vkmbp.mongodb.net/test?retryWrites=true&w=majority',
    {useUnifiedTopology: true})
    .then(client => {console.log('Connected to Database') 
     const db = client.db('star-wars-quotes')//set dbname
     const quotesCollection = db.collection('quotes')//set dbcollection(table)

    //place app.set before app.use, app.listen, etc.
    app.set('view engine', 'ejs');
     //make sure you place body-parser before your CRUD handlers!
    app.use(bodyParser.urlencoded({extend: true }));
    app.use(express.static('public'));
    app.use(bodyParser.json());


    //all your handlers here
    app.listen(3000, () => {
        console.log('listening on 3000')
        });
    /*app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
        });*/
    app.get('/', (req, res) => {
        db.collection('quotes').find().toArray()
        .then(results => {
            res.render('index.ejs', { quotes: results})
        })
        .catch( error => {
            console.error(error)
        })
        
        });
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
       .then(result => {
           res.redirect('/')
            })
       .catch(error => {
           console.error(error)
            }) 
        });
    app.put('/quotes', (req, res) => {
        console.log(req.body)
    })
    })
    .catch(error => {console.error(error)});

