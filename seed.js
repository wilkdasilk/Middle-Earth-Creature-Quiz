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
	favoriteFood: "stew"
});
sampleUsers.push({
	name: "Pippin",
	city: "The Shire",
	age: 28,
	gender: "Male",
	favoriteColor: "yellow",
	favoriteFood: "bread"
});

var sampleCreatures = [];

sampleCreatures.push({
	creatureType: "Hobbit",
	description: "Hobbits are small creatures that can be mistaken for young children. They love comfort and food and a good pipe. Although not accustomed to adventure, they can be both clever and surprisingly courageous, and also make great thieves as they are quiet and can sneak around unnoticed.",
	madlib: "Enter madlib here!!"
});