// Monkey patches for String

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.capitalize = function() {
  var words = this.split(" ");
  var capitalized_words = words.map(function(w) {
    return w.capitalizeFirstLetter();
  });
  return capitalized_words.join(" ")
};
