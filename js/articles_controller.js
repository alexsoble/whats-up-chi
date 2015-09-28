(function(root) {

  var ArticlesController = function (map, markerLayer) {
    this.map = map;
    this.markerLayer = markerLayer;
    this.markers = this.markerArray();
  };

  ArticlesController.prototype.show = function () {
    this.map.addLayer(this.markerLayer);
    var self = this;
    self.interval = setInterval(function() {
      self.cycle();
    }, 5000);
  }

  ArticlesController.prototype.cycle = function () {
    // var m = this.markers[Math.floor(Math.random() * this.markers.length)];
    // this.markerLayer.zoomToShowLayer(m, function() {
    //   m.__parent.spiderfy();
    //   m.openPopup();
    // });
  };

  ArticlesController.prototype.markerArray = function () {
    marker_array = [];
    this.markerLayer.eachLayer(function (layer) {
      marker_array.push(layer);
    });
    return marker_array;
  };

  root.ArticlesController = ArticlesController;

})(window)
