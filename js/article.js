(function(root) {

  var Article = function (url, title) {
    this.url = url;
    this.title = title;
    this.neighborhood = url.split('/')[5];
  };

  Article.prototype.toMarker = function () {
    if (Neighborhoods[this.neighborhood]) {
      var article = {};
      var self = this;
      article.location = new LatLong(this.neighborhood).addRandomness();
      article.title = this.title;
      article.url = this.url;
      article.source = 'DNAinfo Chicago';
      var marker = L.marker(article.location);
      marker.bindPopup(self.makeLink(article.title, article.url));
      return marker;
    } else {
      // neighborhood lat long not known yet, let's add to hash
      console.log(this.neighborhood);
    }
  };

  Article.prototype.addresses = function () {
    var item_yql = (new YqlArticleQuery(this.url)).fullQuery();
    var chi_address_regex = /([0-9]+)[ ][NWSE][.][ ]([+\w]+)[ ]([+\w]+)/
    $.getJSON(item_yql, function(data) {
      var query_results = data.query.results;
      var addresses = chi_address_regex.exec(query_results);
      if (addresses) {
        console.log(addresses[0]);
        // now we can Geocode!
        // https://developers.google.com/maps/documentation/javascript/geocoding
      }
    });
  };

  Article.prototype.makeLink = function makeLink () {
    return '<h3><a href=' + this.url +
           ' target="_blank">' + this.title +
           '</a></h3>(via DNAInfo Chicago)'
  };

  root.Article = Article;

})(window)
