var db = require('../models');

function index(req, res){
  db.User.find({}, function(err, users) {
    if (err){
      console.log(err);
      res.sendStatus(204);
    }
    res.json(users);
  });
}

function search(req,res){
  db.User.findById(req.params.id, function(err, user){
    if (err){
      console.log(err);
      res.sendStatus(204);
    }
    res.json(user)
  });
}

module.exports = {
  index: index,
  search:search

};
