var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var mongojs = require('mongojs');
var url = "mongodb://kunal:kunal5@ds227322.mlab.com:27322/usersinfo";
var db = mongojs(url, ['users']);

router.get('/', function(req,res,next){
    db.users.find((err, users) => {
        if(err){
            res.send(err);
        }
        else{
            res.json(users);
        }
    });
});


router.get('/login', function(req, res, next){

    

});

router.post('/users', function(req, res, next){

    //only post users if the username is not in the database
    //send back an error message to user if username already exists
    
    //username does not exist, good to go
    if(db.users.find({userName: req.body.userName}).count() == 0){
        db.users.insert(req.body);
        res.json({success : "Updated Successfully", status : 200});
    }
    else{
        res.json({error: "Username already exists", status: 404});
    }
});
module.exports = router;
