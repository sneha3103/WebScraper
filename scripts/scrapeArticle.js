var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb) {
   request("https://medium.com/", function(error, response, body){

   var $ = cheerio.load(body);

   var articles = [];

   $(".extremeHero-postContent h3").each(function(i, element) {
    var articleTitle = element.children[0].data;
    console.log(articleTitle);

    var articleLink = element.parent.attribs.href;
    console.log(articleLink);

    articles.push(`<a href= "${articleLink}">${articleTitle}</a>`);
   });

   res.send(articles.join("<br>"));
 });

 cb(articles);

};

module.exports = scrape;