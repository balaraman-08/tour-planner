var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/theme.css', function(req, res) {
	res.sendFile(path.join(__dirname, 'ui', 'theme.css'));
});

app.get('/ui/div2.jpg', function(req, res) {
	res.sendFile(path.join(__dirname, 'ui', 'div2.jpg'));
});

app.get('/ui/title.png', function(req, res) {
	res.sendFile(path.join(__dirname, 'ui', 'title.png'));
});

app.get('/main.js', function(req, res) {
	res.sendFile(path.join(__dirname, 'main.js'));
});

app.get('/jquery.js', function(req, res) {
	res.sendFile(path.join(__dirname, 'jquery.js'));
});

app.listen(8080, function() {
	console.log("Connected to port 8080");
});