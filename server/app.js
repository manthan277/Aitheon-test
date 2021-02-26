const express = require('express');
const app = express();
var ejs = require('ejs');
const mongoose = require('mongoose');
const { MongoURI } = require('./config');
const userRoutes = require('./routes/users');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then(() => {
        console.log('Connected to database successfully')
        app.listen(4000, () => {
            console.log('Listening to port 4000');
        })
    })
    .catch((err) => console.log(err))

app.use(express.static('public'));  
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');


//use routes
app.use("/", userRoutes);


