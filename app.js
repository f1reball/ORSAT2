var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});
const dataread = require('./test.js');


//DATABASE



app.get('/', function(req, res){
    res.sendfile("index.html");
});

app.post('/', urlencodedParser, function(req, res){
    dataread.datareader();
    res.sendfile("index.html");
})

app.listen(3000, function(){
    console.log("Starting Server on port 3000");
});
