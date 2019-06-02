exports.database_check = function() {

    console.log("works");
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
        


        //literally give me the amount of stuff in the db
        var test = collection.countDocuments()
        .then(function(value) {
            console.log(value);
        });


      client.close();
    });
};
