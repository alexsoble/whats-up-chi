(function(root) {

  var Article = function (url, title) {
    this.url = url;
    this.title = title;
    this.neighborhood = url.split('/')[5];
  };

  var newsIcon = L.icon({
    iconUrl: 'images/marker-24@2x.png',
    popupAnchor:  [25, 0]
  });

  Article.prototype.toMarker = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.getFullText().then(function(response) {
        self.fullText = response;
        var addresses = self.getAddressess();  // regex for Chi-like addressess
        if (addresses) {
          // we have an address match in the article text!
          new Address(addresses[0]).toLatLong().then(function(response) {
            resolve(self.makeMarker(response));
          }, function(error) {
            reject(Error("Failed!" + error));
          });
        } else {
          // no addresses found, so let's fallback to  neighborhood
          if (Neighborhoods[self.neighborhood]) {
            var location = new LatLong(self.neighborhood).addRandomness();
            resolve(self.makeMarker(location));
          } else {
            // neighborhood lat-long not known yet
            console.log(self.neighborhood);
          }
        }
      }, function(error) {
        reject(Error("Failed!" + error));
      });
    });
  };

  Article.prototype.makeMarker = function (location) {
    var marker = L.marker(location, { icon: newsIcon });
    var popupContent = this.popupContent();
    marker.bindPopup(popupContent);
    return marker;
  }

  Article.prototype.getFullText = function () {
    var item_yql = (new YqlArticleQuery(this.url)).fullQuery();
    return new Promise(function(resolve, reject) {
      $.getJSON(item_yql, function(data) {
        resolve(data.query.results);
      });
    });
  }

  Article.prototype.getAddressess = function () {
    var chi_address_regex = /([0-9]+)[ ][NWSE][.][ ]([+\w]+)[ ]([+\w]+)/
    var article_text = this.fullText;
    return chi_address_regex.exec(article_text);
  };

  Article.prototype.popupContent = function makePopupContent () {
    return '<h3><a href=' + this.url +
           ' target="_blank">' + this.title +
           '</a></h3>(via DNAInfo Chicago)'
  };

  root.Article = Article;

})(window)
