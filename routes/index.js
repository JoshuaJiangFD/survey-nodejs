var express = require('express');
var questions=require('../models/Questions');
var url = require( "url" );
var queryString = require( "querystring" );


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '找好啦！',questions:questions});
});

router.get('/quiz',function(req,res,next){
  // parses the request url
  var theUrl = url.parse( req.url );

  // gets the query part of the URL and parses it creating an object
  var queryObj = queryString.parse( theUrl.query );

  // queryObj will contain the data of the query as an object
  // and jsonData will be a property of it
  // so, using JSON.parse will parse the jsonData to create an object
  var obj = JSON.parse( queryObj.jsonData );

  // as the object is created, the live below will print "bar"
  console.log( obj);
  res.json('success');
});


module.exports = router;
