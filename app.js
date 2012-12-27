var express = require('express'),
    feedparser = require('feedparser'),
    moment = require('moment'),
    app = express(),
    config = require('config'),
    request = require('request');


//  Configuration

app.engine('html', config.app.templateEngine);
app.set('view engine', config.app.viewsExtensions);
app.set('views', config.app.viewsDir);
moment.lang(config.app.language);


// Routes

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    var articles = [],
        parser,
        endCount = 0,
        feedUrls = config.feed.urls,
        reqObj;

    feedUrls.forEach(function(url) {
        reqObj = {'uri': url, 'headers': {'user-agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11'}}
        request(reqObj, function (error, response, body) {
            parser = feedparser.parseString(body);
            parser.on('article', function(article){
                article.date = function() {
                    return moment(article.pubDate).format("D MMM YYYY");
                }
                articles.push(article);
            });
            parser.on('end', function() {
                endCount++;
                if(endCount == feedUrls.length) {
                    articles.sort(function(art1, art2) {
                        if(art1.pubDate < art2.pubDate) return -1;
                        else if(art1.pubDate > art2.pubDate) return 1;
                        return 0;
                    }).reverse();
                    res.render('index', {articles: articles});
                }
            });
            parser.on('error', function() {
                console.log(arguments)
                endCount++;
            });
        });
    });
});


app.listen(3000);