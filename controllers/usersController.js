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

module.exports = {
  index: index
};
