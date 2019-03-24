var express = require('express');
var nunjucks = require('nunjucks');
var markdown = require('nunjucks-markdown');
var marked = require('marked');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require("fs");

var app = express();
app.set('views', path.join(__dirname, 'views'));

var env = nunjucks.configure('views', {
    express: app,
    autoescape: true
});
app.set('view engine', 'njk');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get ('/', function (req, res) {
   res.render('index')
})

app.get('/home', function (req, res) {
  res.redirect('/')
})

app.get('/blog', function (req, res) {
  res.render('blog')
})

app.get('/projects', function (req, res) {
  res.render('projects')
})

markdown.register(env, marked)

module.exports = app;
