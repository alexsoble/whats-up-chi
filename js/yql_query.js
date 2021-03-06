(function(root) {

  var YqlArticleQuery = function (url) {
    this.url = url;
  }

  var YqlRssQuery = function (url) {
    this.url = url;
  }

  YqlArticleQuery.prototype.fullQuery = function () {
    return  'https://query.yahooapis.com/v1/public/yql?q=' +
            encodeURIComponent('select * from html where url="' + this.url + '"') +
            'and xpath="//article[contains(@class,\'story\')]//text()"&format=json&callback=?';
  };

  YqlRssQuery.prototype.fullQuery = function () {
    return  'https://query.yahooapis.com/v1/public/yql?q=' +
            encodeURIComponent('select * from xml where url="' + this.url + '"') +
            '&format=json&callback=?';
  };

  root.YqlRssQuery = YqlRssQuery;
  root.YqlArticleQuery = YqlArticleQuery;

})(window)
