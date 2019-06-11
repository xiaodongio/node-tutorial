const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
    if (err) throw err;
    const dbo = db.db("mydatabase");
    dbo.collection("test_insert").insertOne(
      {
        "title": "I like cake",
        "body": "It is quite good."
      }, function(err, documents) {
        if (err) throw err;
        console.log('Document Id is : ' + documents.insertedId);
        db.close();
    });
});


