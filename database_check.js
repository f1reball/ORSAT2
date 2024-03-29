exports.database_check = function() {

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://knox:knox@cluster0-hpibm.mongodb.net/test?retryWrites=true";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("courses").collection("course_1");
      console.log("Database Connected");
    //do stuff
        //collection.insertOne( { siid: siid, first_name: first_name, last_name: last_name, clear_time: clear_time, start_time: start_time, finish_time: finish_time, control_objs: point_data} );
        //collection.insertOne( { test: "x"} );
        //console.log("Upload Complete");

        /// TODO: need to impliment a way of updating SIID for each student in system
        /// TODO: need to have a method of connecting controlID to point value if required



        //finds if the SIID is in the db
        function existance(siid){
            var value = 0;
            var test = collection.find({siid: siid}).count()
            .then(function(value) {
                //return value;
                if(value == 0){
                    console.log("inserts new position");
                    //collection.insertOne({y: "y"});
                } else {
                    console.log("replaces position");
                    //collection.replaceOne({siid: siid}, {x: "x"} );
                }
            });
        }

        //collection of all students with assigned SIID

        existance("2097583");


    });
};

exports.master_running_replace = function(original, first_name, last_name, siid){
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://knox:knox@cluster0-hpibm.mongodb.net/test?retryWrites=true";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const running_collection = client.db("Master_Runners").collection("Runners");
      console.log("Runners Database Connected");

      var value;
      running_collection.findOne()
      .then(function(value) {
              runner_data = value.runner_data;
              if(runner_data.length == 1){
                  running_collection.findOneAndDelete({});
              } else {
                  //remove part in array then replace

                  //problem with this section
                  var point = 0;
                  for (var i = 0; i < runner_data.length; i++) {
                    if(runner_data[i].siid == original){
                        point = i;
                    }
                  }


                  runner_data[point].first_name = first_name;
                  runner_data[point].last_name = last_name;
                  runner_data[point].siid = siid;

                  running_collection.findOneAndReplace({}, {runner_data});
              }
          });
});
};

exports.master_running_remove = function(siid) {

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://knox:knox@cluster0-hpibm.mongodb.net/test?retryWrites=true";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const running_collection = client.db("Master_Runners").collection("Runners");
      console.log("Runners Database Connected");

      //test if the doc is 1 length or more
      var value;
      running_collection.findOne()
      .then(function(value) {
              runner_data = value.runner_data;
              if(runner_data.length == 1){
                  running_collection.findOneAndDelete({});
              } else {
                  //remove part in array then replace

                  //problem with this section
                  var point = 0;
                  for (var i = 0; i < runner_data.length; i++) {
                    if(runner_data[i].siid == siid){
                        point = i;
                    }
                  }

                  runner_data.splice(point, 1);
                  //runner_data = runner_data.splice(runner_data.obj.indexOf(siid), 1);
                  running_collection.findOneAndReplace({}, {runner_data});
              }
              //change to length of array not count of documents
      });
      //running_collection.findOneAndDelete({siid: siid.toString()});
});
};



//add a new runner to the master_database
exports.master_running_add_new= function(first_name, last_name, siid) {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://knox:knox@cluster0-hpibm.mongodb.net/test?retryWrites=true";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const running_collection = client.db("Master_Runners").collection("Runners");
      console.log("Runners Database Connected");

      var value = 0;
      running_collection.countDocuments()
      .then(function(value) {
              //return value;
              if(value == 0){
                  var runner_data = [];
                  var obj = new Object();
                  obj.first_name = first_name.trim();
                  obj.last_name = last_name.trim();
                  obj.siid = siid.trim();
                  runner_data.push(obj);
                  running_collection.insertOne({runner_data});
              } else {
                  running_collection.findOne()
                  .then(function(value) {
                    runner_data = value.runner_data;
                    var obj = new Object();
                    obj.first_name = first_name.trim();
                    obj.last_name = last_name.trim();
                    obj.siid = siid.trim();
                    runner_data.push(obj);
                    running_collection.findOneAndReplace({},{runner_data});
                });

              }
          });

  });
};

exports.get_data_from_master_db = function(){
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://knox:knox@cluster0-hpibm.mongodb.net/test?retryWrites=true";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const running_collection = client.db("Master_Runners").collection("Runners");
      console.log("Runners Database Connected");

      running_collection.findOne()
      .then(function(value) {
        runner_data = value.runner_data;
        return runner_data;
    });

});
}
