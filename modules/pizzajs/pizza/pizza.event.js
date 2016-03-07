/**
 * 依赖$.data
 * @param  {[type]} function($ [description]
 * @return {[type]}            [description]
 */
;
(function($) {
  var ls = window.localStorage;
  var domEvent = {}; //元素的dom事件


  $.fn.on = function(events, selector, handler) { //addEventListener
    var dom = this;
    var ehandle;
    if (typeof selector == "function") {
      handler = selector;
      ehandle = eventsHandle(dom, events); //设置事件集合
    } else {
      ehandle = eventsSelectorHandle(dom, events, selector); //设置事件集合
    }


    if (!dom.dataPriv(events)) {
      dom.get(0).addEventListener(events.split('.')[0], ehandle, false);
    }
    dom.dataPriv(events, handler);
  };

  $.fn.off = function(events) {
    var dom = this;
    dom.removeDataPriv(events);
  }
    /**
     * 返回一个布尔值，表示当前元素是否匹配给定的CSS选择器。
     * @param  {[type]} el       [description]
     * @param  {[type]} selector [description]
     * @return {[type]}          [description]
     */
  function matchesSelector(el, selector) {
    var p = Element.prototype;
    var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
      return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
    };
    return f.call(el, selector);
  }
  /**
   * 带选择器的事件代理
   * @param  {[type]} dom      [description]
   * @param  {[type]} events   [description]
   * @param  {[type]} selector [description]
   * @return {[type]}          [description]
   */
  var eventsSelectorHandle = function(dom, events, selector) {
    return function(event) {
      console.log(dom.dataPriv(events));
      if (matchesSelector(event.target, selector)) {
        var eventsArr = events.split('.');
        var handler = dom.dataPriv(events);
        if (eventsArr.length == 1) {
          for (var fnSpace in handler) {
            handler[fnSpace].forEach(function(fn) {
              fn.call($(event.target));
            });
          }
        } else if(handler[eventsArr[1]]){
          handler[eventsArr[1]].forEach(function(fn) {
            fn.call($(event.target));
          });
        }
      } else {
        console.log("event is not");
      }
    };
  };


  /**
   * 事件代理
   * @param  {[type]} dom    [description]
   * @param  {[type]} events [description]
   * @return {[type]}        [description]
   */
  var eventsHandle = function(dom, events) {
    return function(event) {
      console.log(dom.dataPriv(events));
      var eventsArr = events.split('.');
      var handler = dom.dataPriv(events);
      if (eventsArr.length == 1) {
        for (var fnSpace in handler) {
          handler[fnSpace].forEach(function(fn) {
            fn.call(dom);
          });
        }
      } else {
        handler[eventsArr[1]].forEach(function(fn) {
          fn.call(dom);
        });
      }
    };
  };

})($);
