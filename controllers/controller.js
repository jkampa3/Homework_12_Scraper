var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
//var path = require('path');
//var axios = require("axios");

var Articles = require('../models/article.js');
var Comments = require('../models/comment.js');

//allow page to scrape upon load
router.get('/', function (req, res) {
    res.redirect('/scrape')
});

router.get('/articles', function (req, res) {
    Article.find().sort({ _id: -1 })
        .populate('comments')
        .exec(function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                var hbsObject = { articles: doc }
                res.render('index', hbsObject);
            }
        });
});

router.get('/scrape', function (req, res) {
    //scrape npr technology site
    request("https://www.npr.org/sections/technology/", function (error, response, html) {
        var $ = cheerio.load(html);
        var numLoop = [];
        $(".item.has-image").each(function (i, element) {
            var result = {};
            result.headline = $(this).children(".item-info").find("h2.title").text().trim();
            result.source = $(this).children(".item-info").find("h3.slug").find("a").text().trim();
            result.summary = $(this).children(".item-info").find("p.teaser").text().trim();
            result.img = $(this).children(".item-image").find("a").find("img").attr("src");
            result.link = $(this).children(".item-info").find("h2.title").find("a").attr("href").trim();
            numLoop.push(new Articles(result));
        });

        //loop for article pulled down, then redirects to the articles route
        for (var i = 0; i < numLoop.length; i++) {
            numLoop[i].save(function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(data);
                }
            });
            if (i === (numLoop.length - 1)) {
                res.redirect("/articles");
            }
        }
    });

});

router.post('/add/comments/:id', function (req, res) {
    var articleId = req.params.id;
    var commentPoster = req.body.name;
    var commentContent = req.body.comment;
    var result = {
        poster: commentPoster,
        content: commentContent
    };
    var toSave = new Comments(result);

    toSave.save(function (err, doc) {
        if (err) {
            console.log(err);
        }
        else {
            Articles.findOneAndUpdate({ '_id': articleId }, { $push: { 'comments': doc._id } }, { new: true })
                .exec(function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.sendStatus(200);
                    }
                });
        }
    });

});




//delete comments
router.post('/remove/comment/:id', function (req, res) {
    var commentId = req.params.id;
    Comments.findByIdAndRemove(commentId, function (err, todo) {
        if (err) {
            console.log(err);
        }
        else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;