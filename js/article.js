(function(root) {

  var Article = function (url, title) {
    this.url = url;
    this.title = title;
    this.neighborhood = url.split('/')[5];
    this.hasExactAddress = false   // until we get full text back
    this.address = null;
    this.displayNeighborhood = null;
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
          self.hasExactAddress = true;
          self.address = addresses[0];
          self.makeMarkerFromSpecificAddress(resolve, reject);
        } else {
          self.makeMarkerFromNeighborhood(resolve, reject);
        }
      }, function(error) {
        reject(Error("Failed!" + error));
      });
    });
  };

  Article.prototype.makeMarkerFromSpecificAddress = function(resolve, reject) {
    var self = this;
    new Address(self.address).toLatLong().then(function(response) {
      resolve(self.makeMarker(response));
    }, function(error) {
      reject(Error("Failed!" + error));
    });
  };

  Article.prototype.makeMarkerFromNeighborhood = function(resolve, reject) {
    var self = this;
    if (Neighborhoods[self.neighborhood]) {
      var location = new LatLong(self.neighborhood).addRandomness();
      self.displayNeighborhood = self.neighborhood.replace("-", " ").capitalize();
      resolve(self.makeMarker(location));
    } else {
      // neighborhood lat-long not known yet
      console.log(self.neighborhood);
    }
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
    var chi_address_regex = /([0-9]+)[ ][NWSE][.][ ]([+\w]+)/
    var article_text = this.fullText;
    return chi_address_regex.exec(article_text);
  };

  Article.prototype.popupContent = function makePopupContent () {
    var content = '<h3><a href=' + this.url +' target="_blank">' +
                  this.title + '</a></h3>';

    if (this.hasExactAddress) {
      content += ('<strong>Address mentioned:</strong><br/>' + this.address);
    } else {
      content += ('<strong>Neighborhood mentioned:</strong><br/>' + this.displayNeighborhood);
    }

    content += '<p>(via DNAInfo Chicago)</p>';
    return L.popup({ maxWidth: 240 }).setContent(content);
  };

  root.Article = Article;

})(window)
