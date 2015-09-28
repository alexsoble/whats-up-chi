$(function() {

  var map = L.map('map').setView([41.8369, -87.6847], 11);
  var layer = new L.StamenTileLayer("toner-lite");
  layer.minZoom = 0;
  layer.maxZoom = 20;
  layer.ext = 'png';
  layer.addTo(map);

  var articles = new Articles
  articles.getFromDnaInfoChi(map);

});
