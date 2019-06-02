var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});

const dataread = require('./test.js');
const database_upload = require('./database_check.js');

//DATABASE



app.get('/', function(req, res){
    res.sendfile("index.html");
});

app.post('/', urlencodedParser, function(req, res){
    dataread.datareader();
    res.sendfile("index.html");
})

app.get('/test', function(req, res){
    res.sendfile("index.html");
});

app.post('/test', urlencodedParser, function(req, res){
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var siid = req.body.siid;

    database_upload.database_check();
    database_upload.master_running_add_new(first_name, last_name, siid);
    res.sendfile("index.html");
});

app.listen(3000, function(){
    console.log("Starting Server on port 3000");
});
