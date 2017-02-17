
// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
	extended:true
}));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

var controllers = require('./controllers');


/**********
 * ROUTES *
 **********/
 app.get('/api', controllers.api.index);

 app.get('/api/creatures', controllers.creatures.index);

 app.get('/api/users', controllers.users.index);

 app.get('/api/users/:id', controllers.users.search);

 app.post('/api/users', controllers.users.add);

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */








/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
