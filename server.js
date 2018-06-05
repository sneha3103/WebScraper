//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

//Axios - promise based library. Similar to jquery ajax method
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

//Middleware

//Morgan logger is used for logging requests
app.use(logger("dev"));

// Body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Serving the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo Db


// A GET route for scraping the Medium.com website
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("https://medium.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h3 within an article tag, and do the following:
    $(".extremeHero-postContent h3").each(function(i, element) {
        console.log(element);
        // Save an empty articles object
        var articles = {};

        var articleTitle = element.children[0].data;
        console.log(articleTitle);
  
        var articleLink = element.parent.attribs.href;
        console.log(articleLink);
  
        articles.push(`<a href= "${articleLink}">${articleTitle}</a>`);
        
        //Creating a new article using the articleTitle.
        db.Article.create(articleTitle)
           .then(function(dbArticle){
               console.log(dbArticle);
           })
           .catch(function(err){
               return res.json(err);
           });

    });

    res.send(articles.join("<br>"));

  });


});



// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});

