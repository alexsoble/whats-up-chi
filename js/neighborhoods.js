(function(root) {

  var Neighborhoods = {
    'lincoln-park': [41.9200, -87.6500],
    'little-village': [41.8500, -87.7100],
    'logan-square': [41.9283, -87.7067],
    'loop': [41.88, -87.628],
    'downtown': [41.88, -87.628],
    'lakeview': [41.94352, -87.654102],
    'river-north': [41.9, -87.63],
    'albany-park': [41.97, -87.72],
    'little-italy': [41.871, -87.659],
    'wicker-park': [41.9075, -87.676944],
    'uptown': [41.97, -87.66],
    'chatham': [41.74,-87.611667],
    'hyde-park': [41.8, -87.59],
    'bronzeville': [41.83, -87.62],
    'west-loop': [41.87, -87.67],
    'humboldt-park': [41.88, -87.7],
    'irving-park': [41.95, -87.73],
    'wrigleyville': [41.95, -87.655],
    'rogers-park': [42.01, -87.67],
    'woodlawn': [41.78, -87.6],
    'back-of-yards': [41.81, -87.66],
    'old-town': [41.9111, -87.6395],
    'jefferson-park': [41.98, -87.77],
    'river-west': [41.89, -87.645],
    'boystown': [41.94352, -87.654102],
    'brighton-park': [41.82, -87.7],
    'morgan-park': [41.69, -87.67],
    'pilsen': [41.85, -87.66],
    'kenwood': [41.81, -87.6],
    'austin': [41.9, -87.76],
    'mt-greenwood': [41.7, -87.71],
    'north-center': [41.95, -87.68],
    'south-loop': [41.88, -87.63],
    'englewood': [41.779, -87.644],
    'streeterville': [41.893, -87.619],
    'grand-crossing': [41.76, -87.61],
    'lincoln-square': [41.97, -87.69],
    'pullman': [41.71, -87.62],
    'ravenswood': [41.97, -87.67]
  };

  var LatLong = function (neighborhood) {
    this.latlong = Neighborhoods[neighborhood];
  };

  LatLong.prototype.addRandomness = function () {
    return [
      this.latlong[0] + (Math.random() / 1000 - 0.0005),
      this.latlong[1] + (Math.random() / 1000 - 0.0005)
    ]
  }

  root.LatLong = LatLong;
  root.Neighborhoods = Neighborhoods;

})(window)

