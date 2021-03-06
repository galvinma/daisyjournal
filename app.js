var express = require('express');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var cors = require('cors')
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
require('dotenv').config()

var app = express();
app.use(cors());
cors({credentials: true, origin: true})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/database', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// routes
var signup = require('./routes/signup');
var login = require('./routes/login');
var checktoken = require('./routes/checktoken');
var entries = require('./routes/entries')
var habits = require('./routes/habits')
var reset = require('./routes/reset')
var newpass = require('./routes/newpass')

//
app.use('/api', signup)
app.use('/api', login)
app.use('/api', reset)
app.use('/api', newpass)
app.use('/api', checktoken)
app.use('/api', entries)
app.use('/api', habits)

app.listen(5002);

module.exports = app;
