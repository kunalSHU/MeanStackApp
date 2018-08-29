var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
//const assert = require('assert');

// Connection URL
const url = 'mongodb://kunal:kunal5@ds227322.mlab.com:27322/usersinfo';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, database) {
 // assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = database.db('usersinfo');
  findDocuments(db, function(){
      console.log('Finding documents successful');
  });
});

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('users');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      //assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }
/*var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://kunal:kunal5@ds227322.mlab.com:27322/usersinfo";
var db = database.db('usersinfo');

router.get('/', function(req,res,next){
    console.log('api works');
    db.collection("users").findOne({}, function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.json(result);
        }
        db.close();
    });

    //res.send(db.getCollectionNames());
    /*db.users.find(function(err, users){
    if(err){
        res.send(err);     
    }
    else{
        console.log("in here");
        res.json(users);
        res.send('in here');
    }
    });
});*/

module.exports = router;