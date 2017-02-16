var mongoose = require("mongoose");
var Creature = require("./creature");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	city: String,
	age: Number,
	gender: String,
	favoriteColor: String,
	favoriteFood: String,
	creature: [Creature.schema]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;