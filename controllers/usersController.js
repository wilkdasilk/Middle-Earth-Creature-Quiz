var db = require('../models');

//FIND ALL users
function index(req, res){
  db.User.find({}, function(err, users) {
    if (err){
      console.log(err);
      res.sendStatus(204);
    }
    res.json(users);
  });
}

//FIND user by id
function search(req,res){
  db.User.findById(req.params.id, function(err, user){
    if (err){
      console.log(err);
      res.sendStatus(204);
    }
    res.json(user)
  });
}

//CREATE a new user and save
function add(req,res){
  var age = parseInt(req.body.age);
  req.body.age = age;
  var newUser = new db.User({
    name: req.body.name,
    city: req.body.city,
    age: req.body.age,
    gender: req.body.gender,
    favoriteColor: req.body.favoriteColor,
    favoriteFood: req.body.favoriteFood,
  });
  db.Creature.findOne({creatureType: req.body.creature}, function(err,creature){
    if (err) {
      return console.log(err)
    }
    newUser.creature = creature;
    newUser.save(function(err,user){
      if (err){
        return console.log("save error: ",err);
      }
      console.log("saved", user.name);
      res.json(user);
    });
  });

}

// DELETE a user by id
function destroy(req, res) {
  // find one user by id, delete it, and send it back as JSON

}

// UPDATE a user by id
function update(req, res) {
  // find one user by id, update it based on request body,
  // and send it back as JSON

}

module.exports = {
  index: index,
  search: search,
  add: add,
  destroy: destroy,
  update: update

};
