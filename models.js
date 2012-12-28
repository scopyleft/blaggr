var moment = require('moment');

Article = function(article) {
    article.date = function() {
        return moment(article.pubDate).format("D MMM YYYY");
    }
    return article;
}


Collection = function() {
    var articleModel,
        self = this;

    this.articles = [];

    this.add = function(article) {
        if (Array.isArray(article)) {
            article.forEach(function(art) {
                self.add(art);
            });
        }
        else {
            articleModel = Article(article);
            this.articles.push(articleModel);
        }
        return this;
    }

    this.sort = function() {
        this.articles.sort(function(art1, art2) {
            if(art1.pubDate < art2.pubDate) return -1;
            else if(art1.pubDate > art2.pubDate) return 1;
            return 0;
        }).reverse();
        return this;
    }
}

module.exports = {article: {
    article: Article, collection: Collection
}};