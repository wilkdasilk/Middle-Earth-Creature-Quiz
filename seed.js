// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var sampleUsers = [];

sampleUsers.push({
	name: "Frodo",
	city: "The Shire",
	age: 50,
	gender: "Male",
	favoriteColor: "blue",
	favoriteFood: "stew",
	creature: "Hobbit"
});
sampleUsers.push({
	name: "Pippin",
	city: "The Shire",
	age: 28,
	gender: "Male",
	favoriteColor: "yellow",
	favoriteFood: "bread",
	creature: "Hobbit"
});

var sampleCreatures = [];

sampleCreatures.push({
	imageUrl: "https://i.ytimg.com/vi/j-CtdZVZbcI/maxresdefault.jpg",
	creatureType: "Hobbit",
	description: "Hobbits are small creatures that can be mistaken for young children. They love comfort and food and a good pipe. Although not accustomed to adventure, they can be both clever and surprisingly courageous, and also make great thieves as they are quiet and can sneak around unnoticed.",
	madlib: "Enter madlib here!!"
});

sampleCreatures.push({
  imageUrl: "https://s-media-cache-ak0.pinimg.com/originals/10/db/c3/10dbc3ef1d58f4ff611ec9bfc650a3d2.jpg",
  creatureType: "Human",
  description: "Also know as the race of Men, humans are proud, ambitious creatures. They can be very courageous and take pride in strength and honor. However, they can get a bit power-hungry.",
  madlib: "Enter madlib here!!"
});


//Template from Books App to remove previous list and rerender the new list
db.Creature.remove({}, function(err, creatures) {
  console.log('removed all creatures');
  db.Creature.create(sampleCreatures, function(err,creatures){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all creatures');
    console.log("created", creatures.length, "creatures");


    db.User.remove({}, function(err, users){
      console.log('removed all users');
      sampleUsers.forEach(function (userData) {
        var user = new db.User({
          name: userData.name,
          city: userData.city,
		  age: userData.age,
		  gender: userData.gender,
		  favoriteColor: userData.favoriteColor,
		  favoriteFood: userData.favoriteFood
        });
        db.Creature.findOne({creatureType: userData.creature}, function (err, foundCreature) {
          console.log('found creature ' + foundCreature.creatureType + ' for user ' + user.name);
          if (err) {
            console.log(err);
            return;
          }
          user.creature = foundCreature;
          user.save(function(err, savedUser){
            if (err) {
              return console.log(err);
            }
            console.log('saved ' + savedUser.creature + ' by ' + foundCreature.creatureType);
          });
        });
      });
    });

  });
});
