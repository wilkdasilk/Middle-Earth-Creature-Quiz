var db = require('../models');

//GET ALL creatures and return as JSON
function index(req,res){
  db.Creature.find({}, function(err, creatures){
    if (err){
      console.log(err);
      res.sendStatus(204);
    } else {
      res.json(creatures);
    }
  });
}


module.exports = {
  index: index
};
