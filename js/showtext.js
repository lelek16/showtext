/*global jQuery,window*/
(function ($) {
  if (jQuery === 'undefined') {
    throw new Error('This plugin requires jQuery');
  }
  $.fn.showText = function (options) {
    var defaults = {
      type: 'all',
      time: 400,
      timeout: 100,
      onStart : function () {},
      onChange: function () {},
      onEnd: function () {}
    },
      settings = $.extend({}, defaults, options),
      elem = this,
      ret = '',
      length = elem.text().length,
      i = 0,
      index = 0;
    settings.onStart.call(this);
    switch (settings.type) {
    case 'all':
      elem.wrapInner('<span></span>');
      elem = elem.children('span');
      elem.css('opacity', 0);
      setTimeout(function () {
        $(elem).animate({
          opacity: 1
        }, settings.time, function () {
          settings.onChange.call(elem);
        });
      }, settings.timeout);
      settings.onEnd.call(elem);
      break;
    case 'char':
      for (i; i < length; i++) {
        ret += '<span>' + elem.text()[i] + '</span>';
      }
      elem.html(ret);
      elem.children().css('opacity', 0);
      var timeout = setInterval(function () {
        $(elem.children()[index]).animate({
          opacity: 1
        }, settings.time, function () {
          settings.onChange.call(this);
        });
        index++;
        if (index === length) {
          window.clearInterval(timeout);
        }
      }, settings.timeout);
      settings.onEnd.call(elem);
      break;
    case 'alpha_asc':
    case 'alpha_desc':
      for (i; i < length; i++) {
        ret += '<span>' + elem.text()[i] + '</span>';
      }
      elem.html(ret);
      elem.children().css('opacity', 0);
      var tempArray = $(elem).children().sort(function (a, b) {return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase()); });
      if (settings.type === "alpha_desc") { tempArray = $(elem).children().sort(function (a, b) {return $(b).text().toUpperCase().localeCompare($(a).text().toUpperCase()); }); }
      var interval = setInterval(function () {
        $(tempArray[index]).animate({
          opacity: 1
        }, settings.time, function () {
          settings.onChange.call(this);
        });
        index++;
        if (index === length) {
          window.clearInterval(interval);
        }
      }, settings.timeout);
      settings.onEnd.call(elem);
      break;
    }
  };

}(jQuery));