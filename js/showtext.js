/*global jQuery,window*/
(function ($) {
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
      elem.css('transition', 'opacity ' + settings.time + 'ms linear');
      setTimeout(function () {
        settings.onChange.call(this);
        $(elem).css('opacity', 1);
      }, settings.timeout);
      settings.onEnd.call(elem);
      break;
    case 'char':
      for (i; i < length; i++) {
        ret += '<span>' + elem.text()[i] + '</span>';
      }
      elem.html(ret);
      elem.children().css('opacity', 0);
      elem.children().css('transition', 'opacity ' + settings.time + 'ms linear');
      var timeout = setInterval(function () {
        settings.onChange.call(this);
        $(elem.children()[index]).css('opacity', 1);
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
      elem.children().css('transition', 'opacity ' + settings.time + 'ms linear');
      var tempArray = $(elem).children().sort(function (a, b) {return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase()); });
      if (settings.type === "alpha_desc") { tempArray = $(elem).children().sort(function (a, b) {return $(b).text().toUpperCase().localeCompare($(a).text().toUpperCase()); }); }
      var interval = setInterval(function () {
        tempArray.each(function () {
          if ($(this).text() === $(tempArray[index]).text()) {
            settings.onChange.call(this);
            $(this).css('opacity', 1);
          }
        });

        for (i = tempArray.length - 1; i >= 0; i--) {
          if ($(tempArray[i]).text() === $(tempArray[index]).text()) {
            tempArray.splice(i, 1);
          }
        }

        if (tempArray.length === 0) {
          window.clearInterval(interval);
        }
      }, settings.timeout);
      settings.onEnd.call(elem);
      break;
    }
  };

}(jQuery));