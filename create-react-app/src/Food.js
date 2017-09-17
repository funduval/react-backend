// Include the Mongoose Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
	item: {
		type: String
	},

	sugar: {
		type: Number
	}

	date: {
		
		type:Date
	}
});

// Create the Model
var Food = mongoose.model('Food', FoodSchema);

// Export it for use elsewhere
module.exports = Food;
