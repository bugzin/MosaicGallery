(function() {
  var generateRand;

  generateRand = function(min, max) {
    var el, found, rand, _i, _len, _results;
    _results = [];
    while (_results.length < max) {
      rand = Math.ceil(Math.random() * max);
      found = false;
      for (_i = 0, _len = _results.length; _i < _len; _i++) {
        el = _results[_i];
        if (el === rand) {
          found = true;
          break;
        }
      }
      if (!found) {
        _results.push(rand);
      } else {
        continue;
      }
    }
    return _results;
  };

  $.fn.imgg = function(options) {
    var animate, arr, currentImage, duration, el, h, i, idx, images, imgNext, index, interval, j, settings, start, w, x, y, _cols, _ref, _rows;
    settings = {
      _rows: 3,
      _cols: 3,
      anim: "fadein",
      duration: 300,
      height: 400,
      width: 400
    };
    if (options != null) $.extend(settings, options);
    if ((options != null) && (options.images != null)) {
      if (typeof options.images !== "Array") {
        if (options.images.length <= 0) {
          alert("Please provide images");
          return false;
        }
      }
    }
    _ref = [0, 0, 0, 0, 0, 1], i = _ref[0], j = _ref[1], x = _ref[2], y = _ref[3], index = _ref[4], idx = _ref[5];
    _rows = settings._rows, _cols = settings._cols, duration = settings.duration, images = settings.images;
    h = settings.height / _cols;
    w = settings.width / _rows;
    currentImage = images[0];
    el = $('<div id="img_g"/>').css('background-image', "url(" + currentImage + ")");
    this.append(el);
    el.height(settings.height).width(settings.width).css('position', 'relative');
    while (i++ < _rows) {
      while (j++ < _cols) {
        el.append($('<div id=id_' + i + '_' + j + ' class="tile" />').css('left', w * (j - 1)).css('top', h * (i - 1)).css('background-position-x', -(w * (j - 1))).css('background-position-y', -(h * (i - 1))));
      }
      j = 0;
    }
    el.children().css('position', 'absolute').height(h).width(w);
    i = j = 0;
    while (i++ < _rows) {
      this.append($('<div class="gridY" />').css('top', y = y + h).width(settings.width));
    }
    while (j++ < _cols) {
      this.append($('<div class="gridX" />').css('left', x = x + w).height(settings.height));
    }
    arr = generateRand(0, _rows * _cols);
    interval = "";
    animate = function() {
      el.children(":nth-child(" + arr[index] + ")").fadeIn('slow');
      index++;
      if (index >= arr.length) {
        index = 0;
        clearInterval(interval);
        setTimeout(start, 1000);
      }
      return true;
    };
    imgNext = function() {
      el.css('background-image', "url(" + currentImage + ")");
      el.children('.tile').hide();
      currentImage = images[idx++];
      return el.children().css('background-image', "url(" + currentImage + ")");
    };
    start = function() {
      imgNext();
      interval = setInterval(animate, duration);
      if (idx >= images.length) {
        idx = 0;
        arr = generateRand(0, _rows * _cols);
        return true;
      }
    };
    setTimeout(start, 1000);
    return this;
  };

}).call(this);
