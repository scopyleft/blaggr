var express = require('express'),
    feedparser = require('feedparser'),
    moment = require('moment'),
    app = express(),
    config = require('config'),
    request = require('request'),
    models = require('./models');


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
        urlsDone = 0,
        feedUrls = config.feed.urls,
        reqObj,
        collection = new models.article.collection();

    feedUrls.forEach(function(url) {
        reqObj = {'uri': url, 'headers': {'user-agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11'}}
        parser = feedparser.parseUrl(reqObj);

        parser.on('end', function() {
            urlsDone++;
            collection.add(this.articles);
            if(urlsDone == feedUrls.length) {
                res.render('index', {articles: collection.articles});
            }
        });

        parser.on('error', function(error) {
            console.error(error.code, error.message, this.xmlbase[0]['#']);
        });
    });
});


app.listen(3000);