var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	q: String,
	options: Object
});

var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
