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
    if (Neighborhoods[this.neighborhood]) {
      var self = this;
      var exact_location = this.addresses();
      var location = new LatLong(self.neighborhood).addRandomness();
      var marker = L.marker(location, { icon: newsIcon });
      var popupContent = self.popupContent();
      marker.bindPopup(popupContent);
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
      var address_strings = chi_address_regex.exec(query_results);
      if (address_strings) {
        var address = new Address(address_strings[0]);
        address.toLatLong().then(function(response) {
          console.log("Success!", response);
        }, function(error) {
          console.log("Failed!", error);
        });
      }
    });
  };

  Article.prototype.popupContent = function makePopupContent () {
    return '<h3><a href=' + this.url +
           ' target="_blank">' + this.title +
           '</a></h3>(via DNAInfo Chicago)'
  };

  root.Article = Article;

})(window)
