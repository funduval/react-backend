// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// // Require Saved Schema
// const food = mongoose.model('Food'); // MongoDB Configuration configuration (Change this URL to your own DB)

// const db = mongoose.connection;

// const dbURI = 'mongodb://localhost/foods';
// mongoose.connect(dbURI, { useMongoClient: true });

// db.on('error', function(err) {
//   console.log('Mongoose Error: ', err);
// });

// db.once('open', function() {
//   console.log('Mongoose connection successful.');
// });

// // Main "/" Route. This will redirect the user to our rendered React application
// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/public/index.html');
// });
// // This is the route we will send GET requests to retrieve our most recent search data.
// // We will call this route the moment our page gets rendered
// app.get('/api/saved', function(req, res) {
//   // We will find all the records, sort it in descending order, then limit the records to 5
//   Food.find({}).exec(function(err, doc) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(doc);
//     }
//   });
// });

// // This is the route we will send POST requests to save each search.
// app.post('/api/saved', function(req, res) {
//   let newFood = new Food(req.body);

//   console.log(req.body);

//   newFood.save(function(err, doc) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(doc);
//     }
//   });
// });

// // Listener
// app.listen(PORT, function() {
//   console.log('App listening on PORT: ' + PORT);
// });
