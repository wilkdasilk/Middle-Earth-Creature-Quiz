var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	q: String,
	A: String,
  	B: String,
 	C: String,
  	D: String,
  	E: String,
  	F: String
});

var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
