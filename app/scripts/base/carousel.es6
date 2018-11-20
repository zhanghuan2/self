var Switchable;

Switchable = require("base/switchable");

$.fn.carousel = function(options1) {
  var defaults, options;
  this.options = options1;
  defaults = {
    effect: "fade",
    autoplay: true,
    events: "click mouseover"
  };
  options = $.extend(defaults, this.options);
  return this.each(function() {
    var $this, data;
    $this = $(this);
    data = $this.data();
    if (data.switchable) {
      return;
    }
    return data.switchable = new Switchable(this, options);
  });
};