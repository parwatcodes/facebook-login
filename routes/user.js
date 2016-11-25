var express = require('express');
var router = express.Router();
var request = require('request');

var User = require('../models/users');

router.get('/users', function(req, res, next) {
    User.find({}, function(err, res) {
        if(err) {
            throw new Error(err);
        }
        else {
            res.json(res);
        }
    });
});

router.get('/images', function(req, res, next) {
    var accesstoken = req.user.token;
    var url = "https://graph.facebook.com/me/photos";
    request.get({
        url: url,
        qs: {access_token: accesstoken},
         json: true
    }, function(err, resp, data) {
        if(err) {
            throw new Error(err);
        } else {
            console.log("adadada", data);
            res.json(data);
        }
    });
});

router.get("/posts", function(req, res, next) {
    var accesstoken= req.user.token;
    var url = "https://graph.facebook.com/me/posts";
    request.get({
        url: url,
        qs: {access_token: accesstoken},
        json: true
    }, function(err, resp, data) {
        if(err) {
            throw new Error(err);
        } else {
            res.json(data);
        }
    });
});

router.get("/pagesliked", function(req, res, next) {
    // var at = req.user.token;
    // var url = "https://graph.facebook.com/me"
})

module.exports = router;
