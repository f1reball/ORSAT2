var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

var engines = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');



var urlencodedParser = bodyParser.urlencoded({extended: false});
const dataread = require('./test.js');
const database_upload = require('./database_check.js');

//DATABASE


app.get('/', function(req, res){
    res.render("./index.html");
});

app.post('/', urlencodedParser, function(req, res){
    dataread.datareader();
    res.render("./index.html");
})

app.get('/test', function(req, res){

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://knox:knox@cluster0-hpibm.mongodb.net/test?retryWrites=true";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const running_collection = client.db("Master_Runners").collection("Runners");
      console.log("check Database Connected");

      running_collection.countDocuments()
      .then(function(value) {
          if(value == 0){
              res.render("./index.html");
          } else {
              running_collection.findOne()
              .then(function(value) {
            var runner_data = value.runner_data;
            res.render("./index.html", {"runner_mass_data": runner_data});
        });
        }
});
});
});

app.post('/test', urlencodedParser, function(req, res){
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var siid = req.body.siid;

    if(req.body.foo == "fetch_cookie"){
        var cookiedata = req.headers.cookie;
        cookiedata = cookiedata.split("=").pop();
        console.log(cookiedata);
        database_upload.master_running_remove(cookiedata);

        console.log("remoded value");
        setTimeout(force_connection, 1000);

    } else {

    //check if the data is being removed or added with the foo command

    database_upload.database_check();
    database_upload.master_running_add_new(first_name, last_name, siid);
    setTimeout(force_connection, 1000);
    }

    function force_connection(){
        const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://knox:knox@cluster0-hpibm.mongodb.net/test?retryWrites=true";
        const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
          const running_collection = client.db("Master_Runners").collection("Runners");
          console.log("check Database Connected");

          running_collection.countDocuments()
          .then(function(value){
              if(value == 0){
                res.render("./index.html");
              } else {
                  running_collection.findOne()
                  .then(function(value) {
                    var runner_data = value.runner_data;
                    res.render("./index.html", {"runner_mass_data": runner_data});
                });
          }

    });
});
}

});

app.listen(3000, function(){
    console.log("Starting Server on port 3000");
});
