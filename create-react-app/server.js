// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Require Saved Schema
var food = mongoose.model('Food');

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 4000;

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static('public'));

// MongoDB Configuration configuration (Change this URL to your own DB)
var db = mongoose.connection;

var dbURI = 'mongodb://localhost/foods';
mongoose.connect(dbURI, { useMongoClient: true });

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Main "/" Route. This will redirect the user to our rendered React application
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get('/api/saved', function(req, res) {
  // We will find all the records, sort it in descending order, then limit the records to 5
  Food.find({}).exec(function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });
});

// This is the route we will send POST requests to save each search.
app.post('/api/saved', function(req, res) {
  let newFood = new Food(req.body);

  console.log(req.body);

  newFood.save(function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.send(doc);
    }
  });
});

// Listener
app.listen(PORT, function() {
  console.log('App listening on PORT: ' + PORT);
});
