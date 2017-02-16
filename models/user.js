var mongoose = require("mongoose");
var Creature = require("./creature");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	creature: [Creature.schema]
});

var User = mongoose.model('User', UserSchema);

module.exports = User;