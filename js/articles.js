(function(root) {

  var Articles = function () {};

  Articles.prototype.makeLink = function makeLink (title, url) {
    return '<h3><a href=' + url + ' target="_blank">' + title + '</a></h3>(via DNAInfo Chicago)'
  };

  Articles.prototype.getFromDnaInfoChi = function getArticlesFromDnaInfoChi (map) {
    var self = this;
    var dna_info_chi_url = 'https://www.dnainfo.com/chicago/index/all'
    var yql = 'http://query.yahooapis.com/v1/public/yql?q=' +
      encodeURIComponent('select * from xml where url="' + dna_info_chi_url + '"') +
      '&format=json&callback=?';
    var markers = new L.MarkerClusterGroup();

    $.getJSON(yql, function(data) {
      var items = data.query.results.rss.channel.item;
      for (i = 0; i < items.length; i ++) {
        var item = items[i];
        var title = item.title;
        var url = item.link;
        var neighborhood = url.split('/')[5];
        var article = {};
        if (Neighborhoods[neighborhood]) {
          article.location = new LatLong(neighborhood).addRandomness();
          article.title = title;
          article.url = url;
          article.source = 'DNAinfo Chicago';
          var marker = L.marker(article.location);
          marker.bindPopup(self.makeLink(article.title, article.url));
          markers.addLayer(marker);
        } else {
          // neighborhood lat long not known yet, let's add to hash
          console.log(neighborhood);
        }
      };
      var controller = new ArticlesController(map, markers);
      controller.show();
    });
  }

  root.Articles = Articles;

})(window)
