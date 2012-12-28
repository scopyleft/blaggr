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
           'http://vinyll.scopyleft.fr/rss/',
           'https://nicolas.perriault.net/code/feed/'
           ]
    }
};