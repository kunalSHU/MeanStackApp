var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://kunal:kunal5@ds227322.mlab.com:27322/usersinfo";
var db = MongoClient(url, ['users']);

router.get('/', function(req,res,next){
    console.log('api works');
    db.users.find(function(err, users){
    if(err){
        res.send(err);     
    }
    else{
        console.log("in here");
        res.json(users);
        res.send('in here');
    }
    });
});

module.exports = router;