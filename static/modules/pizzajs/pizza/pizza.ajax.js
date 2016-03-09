var $ = (function(pizza) {

  pizza.ajax = function(options) {
    var defaults = {
      async: true,
      type: 'GET',
      data: null,
      url: '/',
      dataType: 'json',
      cache: false,
      timeout: 5000,
      success: function() {},
      error: function() {}
    };

    var options = $.extend(defaults, options);

    options.type = options.type.toUpperCase();

    if (options.data && typeof data == 'object') { //对象转换成字符串键值对
      options.data = _serialize(options.data);
    }

    if (options.type == 'GET' && options.data) {
      options.url += (options.url.indexOf('?') == -1 ? '?' : '&') + options.data;
      options.data = null;
    }

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    var isTimeout = false;
    var timer;
    if (options.timeout > 0) {
      timer = setTimeout(function() {
        isTimeout = true;
      }, options.timeout);
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && !isTimeout) {
        _onStateChange(xhr, options.dataType, options.success, options.error);
        clearTimeout(timer);
      } else {
      }
    }

    xhr.open(options.type, options.url, options.async);

    if (options.type == "POST") {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;');
    }

    xhr.send(options.data);


  };

  function _onStateChange(xhr, dataType, success, error) {
    var s = xhr.status;
    if (s >= 200 && s <= 500) {
      var result = '';
      switch (dataType) {
        case 'text':
          result = xhr.responseText;
          break;
        case 'json':
          result = JSON.parse(xhr.responseText);
          break;
        case 'xml':
          result = xhr.responseXML;
          break;
      }
      success(result);
    } else if(s == 0) {
      error(xhr, 'request time out');
    } else {
      error(xhr,xhr.status);
    }
  }

  function _serialize(obj) {
    var a = [];
    for (var k in obj) {
      var val = obj[k];
      if (val.constructor == Array) {
        for (var i = 0, len = val.length; i < len; i++) {
          a.push(k + '=' + encodeURIComponent(val[i]));
        }
      } else {
        a.push(k + '=' + encodeURIComponent(val));
      }
    }
    return a.join('&');
  }

  return pizza;
}($));
