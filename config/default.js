var cons = require('consolidate');

module.exports = {
    app: {
        language: 'fr',
        templateEngine: cons.mustache,
        viewsDir: __dirname + '/../views',
        viewsExtensions: 'html',
    },
    feed: {
        urls: [
           'https://larlet.fr/david/log/',
           'http://localhost:8000/rss/',
           'https://nicolas.perriault.net/code/feed/'
           ]
    }
};