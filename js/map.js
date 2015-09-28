$(function() {

  var map = L.map('map').setView([41.8369, -87.6847], 11);
  var layer = new L.StamenTileLayer("toner-lite");
  layer.minZoom = 0;
  layer.maxZoom = 20;
  layer.ext = 'png';
  layer.addTo(map);

  function makeLink (title, url) {
    return '<h3><a href=' + url + ' target="_blank">' + title + '</a></h3>(via DNAInfo Chicago)'
  }

  function getArticlesFromDnaInfoChi () {

    var dna_info_chi_url = 'https://www.dnainfo.com/chicago/index/all'

    var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + dna_info_chi_url + '"') + '&format=json&callback=?';

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
          marker.bindPopup(makeLink(article.title, article.url));
          marker.addTo(map);
          markers.addLayer(marker);
        } else {
          // neighborhood lat long not known yet, let's add to hash
          console.log(neighborhood);
        }
      };
      map.addLayer(markers);
      window.marker_array = [];
      markers.eachLayer(function (layer) {
        window.marker_array.push(layer);
      });
      blinkPopUps(window.marker_array);
      setInterval(blinkPopUps, 6000, window.marker_array);
    });
  }

  function blinkPopUps (markers) {
    var random_marker = markers[Math.floor(Math.random() * markers.length)];
    random_marker.openPopup();
  }

  var markers = [];
  getArticlesFromDnaInfoChi();

});
