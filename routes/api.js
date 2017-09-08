var express = require('express');
var request = require("request");
var objectMapper = require('object-mapper');
var search = require('../models/search');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/imagesearch', function (req, res, next) {
    res.send("You have to input a search query");
});

router.get('/imagesearch/:searchtext', function (req, res, next) {
    var offset;
    var queryOffset = req.query.offset;
    if (!queryOffset) {
        offset = 20;
    } else if (queryOffset < 3) {
        offset = 3;
    } else if (queryOffset > 200) {
        offset = 200;
    } else {
        offset = queryOffset;
    };

    var options = {
        method: 'GET',
        url: 'https://pixabay.com/api/',
        qs: {
            key: process.env.PIXABAY,
            q: req.params.searchtext,
            per_page: offset
        }
    };

    var map = {
        "hits[].webformatURL": "[].url",
        "hits[].tags": "[].snippet",
        "hits[].previewURL": "[].thumbnail",
        "hits[].pageURL": "[].context",
    };

    search.create({ term: req.params.searchtext }, function (err, doc) {
        if (err) throw new Error(err);
        console.log(doc);
    });

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var dest = objectMapper(JSON.parse(body), map);
        res.send(dest);
    });
});

router.get('/latest/imagesearch', function (req, res, next) {
    search.find({}, {
        __v: false,
        _id: false
    }, function (err, doc) {
        if (err) throw new Error(err);
        res.json(doc)
    })
});

module.exports = router;
