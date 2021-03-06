(function(root) {

  var News = function () {};

  News.prototype.getFromDnaInfoChi = function getArticlesFromDnaInfoChi (map) {
    var self = this;
    var dna_info_chi_url = 'https://www.dnainfo.com/chicago/index/all';
    var yql = (new YqlRssQuery(dna_info_chi_url)).fullQuery();

    $.getJSON(yql, function(data) {
      self.parse(data, map);
    });
  }

  News.prototype.parse = function(data, map) {
    var self = this;
    var markers = new L.MarkerClusterGroup();
    var items = data.query.results.rss.channel.item;
    for (i = 0; i < items.length; i ++) {
      var item = items[i];
      self.delayedAddMarker(i, item, markers);
    };
    var controller = new ArticlesController(map, markers);
    controller.show();
  };

  News.prototype.delayedAddMarker = function (i, item, markers) {
    setTimeout(function() {
      var article = new Article(item.link, item.title)
      article.toMarker().then(function(response) {
        markers.addLayer(response);
      }, function(error) {
        reject(Error("Failed!" + error));
      });
    }, i * 500);
  }

  root.News = News;

})(window)
