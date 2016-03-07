/**
 * [description]
 * @param  {[type]} function($ [description]
 * @return {[type]}            [description]
 */
;
(function($) {
  var ls = window.localStorage;
  var dataPix = 'pa';
  var pageKey = dataPix + ""; //document.location.pathname.split('.')[0].replace(/\//g, '_');
  var lsvalue = {};

  var events = {
    "p0.1234565768": {
      click: {
        "fun":[],
        "plus":[]
      },
      mouseover: {
        fun:[],
        "plus":[]
      },
    }
  };


  $.fn.data = function(datakey, dataValue) {
    var dom = this;

    var lskey = dom.attr("pizzadata");

    if (dataValue != null) { //设置值
      if (lskey) {
        var setValue = JSON.parse(ls.getItem(lskey));
        setValue[datakey] = dataValue;
        ls.setItem(lskey, JSON.stringify(setValue));
      } else {
        lskey = pageKey + Math.random();
        dom.attr('pizzadata', lskey);
        lsvalue[datakey] = dataValue;
        ls.setItem(lskey, JSON.stringify(lsvalue));
      }
      return dom;
    } else { //获取值
      var value = null;
      if (lskey) { //key存在
        value = JSON.parse(ls.getItem(lskey))[datakey];
      } else {
        value = null;
      }
      return value;
    }
  };

  $.fn.dataPriv = function(eventsType, dataValue) {
    console.log(events);
    var dom = this;
    var eventsArray = eventsType.split('.');
    if(eventsArray.length == 1) {
      eventsArray.push("fun");
    }
    var lskey = dom.attr("pizzadata");

    if (dataValue != null) { //设置值
      var ev = null;
      if (lskey) {
        ev = events[lskey][eventsArray[0]];
        if (!ev) {
          events[lskey][eventsArray[0]] = {};
          events[lskey][eventsArray[0]][eventsArray[1]] =  [];
        } else if(!events[lskey][eventsArray[0]][eventsArray[1]]) {
          events[lskey][eventsArray[0]][eventsArray[1]] = [];
        }
        ev = events[lskey][eventsArray[0]][eventsArray[1]];
        ev.push(dataValue);
      } else {
        lskey = pageKey + Math.random();
        dom.attr('pizzadata', lskey);
        events[lskey] = {};
        events[lskey][eventsArray[0]] = {};
        ev = events[lskey][eventsArray[0]][eventsArray[1]] = [];
        ev.push(dataValue);
      }
      return dom;
    } else { //获取值
      var value = null;
      if (lskey) { //key存在
        value = events[lskey][eventsArray[0]];
      } else {
        value = null;
      }
      return value;
    }
  };


  $.fn.removeDataPriv = function(eventsType) {
    var dom = this;
    var lskey = dom.attr("pizzadata");
    var eventsArray = eventsType.split('.');

    if (eventsType != null) { //设置值
      var ev = null;
      if (lskey) {
        if(eventsArray.length == 1) {
          events[lskey][eventsArray[0]] = {};
        } else {
            events[lskey][eventsArray[0]][eventsArray[1]] = [];
        }
      }
      console.log("delete");
      console.log(events);
    }
    return dom;
  };

  /**
   * 清除本页的ls数据
   * @return {[type]} [description]
   */
  function clearPageLs() {
    var key = '';
    var pkey = pageKey + '0.';
    for (var j = 0, len = ls.length; j < len; j++) {
      key = ls.key(j);
      if (key.indexOf(pkey) == 0) {
        ls.removeItem(key);
      }
    }
  };
  clearPageLs();


})($);
