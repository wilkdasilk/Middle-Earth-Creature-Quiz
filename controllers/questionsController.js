var db = require('../models');

//GET ALL creatures and return as JSON
function index(req,res){
  db.Question.find({}, function(err, questions){
    if (err){
      console.log(err);
      res.sendStatus(204);
    } else {
      res.json(questions);
    }
  });
}


module.exports = {
  index: index
};
