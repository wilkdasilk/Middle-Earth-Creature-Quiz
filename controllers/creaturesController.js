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


//POST 
function create(req, res) {

}


//DELETE
function destroy(req, res) {

}


//PUT
function update(req, res) {

}


module.exports = {
  index: index,
  create: create,
  update: update,
  destroy: destroy
};
