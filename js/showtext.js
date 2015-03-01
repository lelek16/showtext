/*global jQuery,window*/
(function ($) {
  $.fn.showText = function (options) {
    var defaults = {
      type: 'all',
      time: 400,
      timeout: 100
    },
      settings = $.extend({}, defaults, options),
      elem = this,
      ret = '',
      length = elem.text().length,
      i = 0,
      index = 0,
      oldElem = elem.html();

    function makeAll(elem) {
      var deferred = $.Deferred();
      elem.wrapInner('<span></span>');
      elem = elem.children('span');
      elem.css('opacity', 0);
      elem.css('transition', 'opacity ' + settings.time + 'ms linear');
      setTimeout(function () {
        $(elem).css('opacity', 1);
        deferred.resolve(elem);
      }, settings.timeout);
      return deferred.promise();
    }

    function makeChar(elem) {
      var deferred = $.Deferred();
      for (i; i < length; i++) {
        ret += '<span>' + elem.text()[i] + '</span>';
      }
      elem.html(ret);
      elem.children().css('opacity', 0);
      elem.children().css('transition', 'opacity ' + settings.time + 'ms linear');
      var timeout = setInterval(function () {
        $(elem.children()[index]).css('opacity', 1);
        index++;
        if (index === length) {
          deferred.resolve(elem);
          window.clearInterval(timeout);
        }
      }, settings.timeout);
      return deferred.promise();
    }

    function makeAlpha(elem) {
      var deferred = $.Deferred();
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
            $(this).css('opacity', 1);
          }
        });

        for (i = tempArray.length - 1; i >= 0; i--) {
          if ($(tempArray[i]).text() === $(tempArray[index]).text()) {
            tempArray.splice(i, 1);
          }
        }

        if (tempArray.length === 0) {
          deferred.resolve(elem);
          window.clearInterval(interval);
        }
      }, settings.timeout);
      return deferred.promise();
    }

    function returnOldContent(oldElem) {
      setTimeout(function () {
        elem.html(oldElem);
      }, settings.timeout);
    }

    switch (settings.type) {
    case 'all':
      makeAll(elem).done(function () {
        returnOldContent(oldElem);
      });
      break;
    case 'char':
      makeChar(elem).done(function () {
        returnOldContent(oldElem);
      });
      break;
    case 'alpha_asc':
    case 'alpha_desc':
      makeAlpha(elem).done(function () {
        returnOldContent(oldElem);
      });
      break;
    }
  };
}(jQuery));