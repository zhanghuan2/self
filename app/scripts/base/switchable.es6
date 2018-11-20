var Switchable;

Switchable = (function() {
  function Switchable(el, options) {
    var defaults;
    this.options = options;
    this.$el = $(el);
    defaults = {
      delay: 500,
      effect: "none",
      duration: 800,
      interval: 5000,
      activeIndex: 0,
      autoplay: false,
      events: "click mouseover"
    };
    this.options = $.extend(defaults, this.options);
    this.activeIndex = this.options.activeIndex;
    this.$link = this.$el.find("[data-role=link]").not(this.$el.find("[data-type=switchable] [data-role=link]"));
    this.$triggers = this.$el.find("[data-role=nav]").not(this.$el.find("[data-type=switchable] [data-role=nav]"));
    this.$contents = this.$el.find("[data-role=content]").not(this.$el.find("[data-type=switchable] [data-role=content]"));
    this.$prev = this.$el.find("[data-role=prev]").not(this.$el.find("[data-type=switchable] [data-role=prev]"));
    this.$next = this.$el.find("[data-role=next]").not(this.$el.find("[data-type=switchable] [data-role=next]"));
    this.bindEvents();
    this.bindEffect();
  }
  
  Switchable.prototype.bindEvents = function() {
    var self;
    self = this;
    this.$triggers.each(function(index, nav) {
      return $(nav).on(self.options["events"], function(e) {
        if (self.activeIndex === index) {
          return;
        }
        if (self.timer) {
          clearTimeout(self.timer);
        }
        self.timer = setTimeout((function() {
          return self.to(index);
        }), self.options.delay);
        return false;
      });
    });
    this.$link.on("click", (function(_this) {
      return function() {
        var href;
        _this.$a = $(_this.$contents[_this.activeIndex]).find("a");
        href = _this.$a.attr("href");
        if (!href && href !== "") {
          return;
        }
        if (_this.$a.attr("target") === "_blank") {
          return window.open(href);
        } else {
          return window.location = href;
        }
      };
    })(this));
    this.$prev.on("click", (function(_this) {
      return function() {
        _this.prev();
        return false;
      };
    })(this));
    this.$next.on("click", (function(_this) {
      return function() {
        _this.next();
        return false;
      };
    })(this));
    if (this.options["autoplay"]) {
      self = this;
      this.$el.on("mouseover", (function(_this) {
        return function() {
          return _this.paused = true;
        };
      })(this));
      this.$el.on("mouseleave", (function(_this) {
        return function() {
          return setTimeout((function() {
            return self.paused = false;
          }), self.options.interval);
        };
      })(this));
      return this.autoplay();
    }
  };
  
  Switchable.prototype.bindEffect = function() {
    switch (this.options["effect"]) {
      case "fade":
        this.$contents.css({
          zIndex: 1,
          opacity: 0
        });
        $(this.$contents[this.activeIndex]).css({
          zIndex: 2,
          opacity: 1
        });
        return this.$contents.removeClass("hide");
    }
  };
  
  Switchable.prototype.prev = function() {
    return this.to(this.activeIndex > 0 ? this.activeIndex - 1 : this.$contents.length - 1);
  };
  
  Switchable.prototype.next = function() {
    return this.to(this.activeIndex < this.$contents.length - 1 ? this.activeIndex + 1 : 0);
  };
  
  Switchable.prototype.to = function(index) {
    var base, base1, switchNav;
    if ($.isFunction(this.options.before)) {
      if (typeof (base = this.options).before === "function") {
        base.before(this.activeIndex, this);
      }
    }
    if (this.$contents.length === 1) {
      return;
    }
    switchNav = (function(_this) {
      return function() {
        $(_this.$triggers[_this.activeIndex]).removeClass("active");
        return $(_this.$triggers[index]).addClass("active");
      };
    })(this);
    switch (this.options["effect"]) {
      case "none":
        $(this.$contents[this.activeIndex]).hide();
        $(this.$contents[index]).show();
        switchNav();
        this.activeIndex = index;
        break;
      case "fade":
        if (this.$animate) {
          this.$animate.clearQueue();
        }
        $(this.$contents[index]).css({
          opacity: 1
        });
        this.$animate = $(this.$contents[this.activeIndex]).animate({
          opacity: 0
        }, this.options.duration, (function(_this) {
          return function() {
            _this.$animate = null;
            $(_this.$contents[_this.activeIndex]).css({
              zIndex: 1
            });
            $(_this.$contents[index]).css({
              zIndex: 2
            });
            switchNav();
            return _this.activeIndex = index;
          };
        })(this));
    }
    if ($.isFunction(this.options.after)) {
      return typeof (base1 = this.options).after === "function" ? base1.after(this.activeIndex, this) : void 0;
    }
  };
  
  Switchable.prototype.autoplay = function() {
    return setInterval((function(_this) {
      return function() {
        if (_this.paused) {
          return;
        }
        return _this.to(_this.activeIndex < _this.$contents.length - 1 ? _this.activeIndex + 1 : 0);
      };
    })(this), this.options.interval, true);
  };
  
  return Switchable;
  
})();

module.exports = Switchable;