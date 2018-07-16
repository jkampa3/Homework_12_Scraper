//npm requirements

//for styling
var express = require("express");
var exphbs = require('express-handlebars');
var bodyParser = require("body-parser");

//for database
var mongoose = require("mongoose");

//for logging/debug
var logger = require("morgan");

// for web-scraping
var request = require('request');
var cheerio = require('cheerio');
//var axios = require("axios"); In Demo, need?

// Require all models
var db = require("./models");

//database port
var port = process.env.PORT || 3000;

//express connection
var app = express();
app.use(logger('dev'));
app.use(
    bodyParser.urlencoded({ extended: true })
);

//express for html files
app.use(express.static('./public'));

//handlebar files
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//router
var router = require('./controllers/controller.js');
app.use('/', router);

//mongoose connection space
//fill in with mongoose
mongoose.connect("mongodb://localhost/scraper");

//validate server running
app.listen(port, function () {
    console.log('Server running on port: ' + port);
});