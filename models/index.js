var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Project-01");

var User = require('./user');
var Creature = require('./creature');

module.exports.User = User;
module.exports.Creature = Creature;