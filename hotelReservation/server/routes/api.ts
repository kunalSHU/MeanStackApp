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


router.get('/users/:username/:password', function(req, res, next){

    console.log(JSON.stringify(req.params.username));
    console.log(JSON.stringify(req.params.password));

    console.log(db.users.find());

    //Check 1: See if username exists
    //Check 2: If username exists but password is incorrect

    //username DNE for login, so error
    if(db.users.find({userName: req.body.userName}).count() == 0){
        res.json({error: "Username does not exist", status: 404});
    }

    //username does exist
    else{
        //password DNE so passoword incorrect
        if(db.users.find({password: req.body.password}).count() == 0){
            res.json({error: "Password is incorrect", status: 404});
        }
        else{
            res.json({error: "Password is incorrect", status: 404});
           //res.json({success : "Successful", status : 200});
            //res.json({error: "Username does not exist", status: 404});
        }    
    }
});

router.post('/register', function(req, res, next){
    //only post users if the username is not in the database
    //send back an error message to user if username already exists
    console.log('This is the username that the user entered : ' + JSON.stringify(req.body.userName));
    console.log(db.users.find());
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
