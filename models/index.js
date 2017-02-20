var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/Project-01" );

var User = require('./user');
var Creature = require('./creature');
var Question = require('./question');

module.exports.User = User;
module.exports.Creature = Creature;
module.exports.Question = Question;
