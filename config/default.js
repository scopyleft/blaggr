var cons = require('consolidate');

module.exports = {
    app: {
        language: 'fr',
        templateEngine: cons.mustache,
        viewsDir: __dirname + '/../views',
        viewsExtensions: 'html',
    },
    feeds: [
        {
            url: "https://larlet.fr/david/log/",
            title: "David Larlet",
            type: "rss"
        },
        {
            url: "http://vinyll.scopyleft.fr/rss/",
            title: "Vincent Agnano",
            type: "rss"
        },
        {
            url: "https://nicolas.perriault.net/code/feed/",
            title: "Nicolas Perriault",
            type: "rss"
        }
    ]
};