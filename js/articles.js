(function(root) {

  var Articles = function () {};

  Articles.prototype.makeLink = function makeLink (title, url) {
    return '<h3><a href=' + url + ' target="_blank">' + title + '</a></h3>(via DNAInfo Chicago)'
  };

  Articles.prototype.getFromDnaInfoChi = function getArticlesFromDnaInfoChi (map) {
    var self = this;
    var dna_info_chi_url = 'https://www.dnainfo.com/chicago/index/all';
    var yql = (new YqlRssQuery(dna_info_chi_url)).fullQuery();
    var markers = new L.MarkerClusterGroup();

    $.getJSON(yql, function(data) {
      var items = data.query.results.rss.channel.item;
      for (i = 0; i < items.length; i ++) {
        var item = items[i];
        var url = item.link;
        var item_yql = (new YqlArticleQuery(url)).fullQuery();
        var chi_address_regex = /([0-9]+)[ ][NWSE][.][ ]([+\w]+)[ ]([+\w]+)/
        $.getJSON(item_yql, function(data) {
          var query_results = data.query.results;
          var addresses = chi_address_regex.exec(query_results);
          if (addresses) {
            console.log(addresses[0]);
          }
        });
        var title = item.title;
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
