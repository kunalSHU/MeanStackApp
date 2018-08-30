var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var mongojs = require('mongojs');
var url = "mongodb://kunal:kunal5@ds227322.mlab.com:27322/usersinfo";
//var assert = require('assert');
var db = mongojs(url, ['users']);
//MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
    //assert.equal(null, err);
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
module.exports = router;
 