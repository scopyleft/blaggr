var express = require('express'),
    feedparser = require('feedparser'),
    moment = require('moment'),
    app = express(),
    config = require('config'),
    request = require('request'),
    models = require('./models');


//  Configuration

app.engine('html', config.app.templateEngine);
app.engine('xml', config.app.templateEngine);
app.set('view engine', config.app.viewsExtensions);
app.set('views', config.app.viewsDir);
moment.lang(config.app.language);


// Routes

app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    var articles = [],
        parser,
        feedsDoneCount = 0,
        feeds = config.feeds,
        reqObj,
        collection = new models.article.collection();

    feeds.forEach(function(feed) {
        reqObj = {
            'uri': feed.url,
            'headers': {
                'user-agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.95 Safari/537.11'
            }
        };
        parser = feedparser.parseUrl(reqObj);

        parser.on('end', function() {
            feedsDoneCount++;
            collection.add(this.articles);
            if(feedsDoneCount == feeds.length) {
                collection.sort();
                res.render('index', {articles: collection.articles});
            }
        });

        parser.on('error', function(error) {
            console.error(error.code, error.message, this.xmlbase[0]['#']);
        });
    });
});

app.get('/opml.xml', function(req, res) {
    res.render('opml.xml', {feeds: config.feeds});
});

app.use(function(req, res){
    res.status(404);
    res.render('404');
});


app.listen(process.env.PORT || 3000);
