const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const dev = process.env.NODE_ENV !== 'production';//true false
const app = next({ dev });
const handle = app.getRequestHandler();//part of next config
//import routes
const booksRoute = require('./routes/books');
const salesRoute = require('./routes/sales');

let db;
if (dev) {
    // connect to local DB
    db = mongoose.connect(
        // 'mongodb+srv://twitter:42ZvC5d7DDYz9Ijj@cluster0.cada5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        'mongodb+srv://naatNews:f1EOer5DcDlBji9o@cluster0.cada5.mongodb.net/naatResearchCenter?retryWrites=true&w=majority'
        , { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Successfully connected to database");
          })
          .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
          });;
} else {
    // connect to mLab DB
    // db = mongoose.connect(`URI`, { useNewUrlParser: true });
}

app.prepare()
    .then(() => {
        const expressApp = express();
        expressApp.use(express.json());
        expressApp.use('/api/books', booksRoute);
        expressApp.use('/api/sales', salesRoute);
        //customize default shared route.
        // expressApp.get('/shared/:route_id', (req, res) => {
        //   const {route_id} = req.params;
        //   app.render(req, res, '/shared', {route_id})
        // });
        expressApp.get('*', (req, res) => {
            return handle(req, res) // for all the react stuff
        });

        expressApp.listen(PORT, err => {
            if (err) throw err;
            console.log(`ready at PORT: ${PORT}`)
        })
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1)
    });