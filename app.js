var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});

const dataread = require('./test.js');


//DATABASE
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://knox:knox@cluster0-hpibm.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log("Database Connected");
  // perform actions on the collection object
  client.close();
});



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
