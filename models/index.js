var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Project-01");

var User = require('./user');

module.exports.User = User;