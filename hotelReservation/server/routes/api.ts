var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://kunal:kunal5@ds227322.mlab.com:27322/usersinfo";

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, database) {
    console.log("Connected successfully to server");  
    if(err){
        console.log('This is the error ', err);
    }
    else{
        console.log('connected successfully'); 
    
        router.get('/', function(req,res,next){
            console.log('api works');
            var db = MongoClient(url, ['users']);
            db.collection("users").findOne({}, function(err, result){
                if(err){
                    res.send(err);
                }
                else{
                    res.json(result);
                }
                db.close();
            });
        });
    }
});
module.exports = router;





/*var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
//const assert = require('assert');

// Connection URL
const url = 'mongodb://kunal:kunal5@ds227322.mlab.com:27322/usersinfo';

// Use connect method to connect to the server
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, database) {
    console.log("Connected successfully to server");  
    if(err){
        console.log('This is the error ', err);
    }
    else{
        const db = database.db('usersinfo');
        //assert.equal(null, err);
        findDocuments(db, function(){
            console.log('Finding documents successful');
        }); 
    }
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
  }*/