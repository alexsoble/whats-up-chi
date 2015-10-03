function initializeGeocoder () {
  window.Geocoder = new google.maps.Geocoder();
  window.GoogleMaps = google.maps;
}

(function(root) {

  var Address = function (string) {
    this.string = string;
  }

  Address.prototype.toLatLong = function () {
    var full_string = this.string + ", Chicago IL";
    return new Promise(function(resolve, reject) {
      Geocoder.geocode({ 'address': full_string }, function(results, status) {
        if (status === GoogleMaps.GeocoderStatus.OK) {
          resolve(results[0].geometry.location);
        } else {
          reject(Error('Geocode was not successful for the following reason: ' + status));
        }
      });
    });
  };

  root.Address = Address;

})(window)
