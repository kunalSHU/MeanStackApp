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

router.post('/users', function(req, res, next){
    db.users.insert(req.body);
});
module.exports = router;
