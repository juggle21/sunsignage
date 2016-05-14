// app.js
 
// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
 
// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;

console.log(__dirname);

// [CONFIGURE ROUTER]
var router = require('./app/routes')(app, UserScreen);

// [RUN SERVER]
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(){
 console.log("Express server has started on port " + port)
});

// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://104.197.86.218:80/scms');
//mongoose.connect('mongodb://username:password@host:port/database?options...');

// DEFINE MODEL
var UserScreen = require('./app/models/userScreen');