var $ = (function(pizza) {
    //私有方法开始
    function selectElements(selector, context) { //选择器操作
        context = context || document;
        if(typeof selector == 'object') {
         console.log('asdasd');
         var objid = selector.getAttribute("id");
         if(objid) {
           return [context.getElementById(objid)];
         } else {
           objid =  Math.random();
           selector.setAttribute("id", objid);
           return [context.getElementById(objid)]
         }
       } else if (/^[\#.]?[\w-]+$/.test(selector)) {
            var firstChar = selector[0];
            switch (firstChar) {
                case ".": //class 选择器
                    return toArray(context.getElementsByClassName(selector.slice(1))); //ie9+,去除掉多余的点号，适用于多class选择
                    break;
                case "#":
                    var el = context.getElementById(selector.slice(1));
                    return el ? [el] : [];
                    break;
            }
            if (selector == "body") {
                return toArray(document.body);
            }
            return toArray(context.getElementsByTagName(selector));
        }
        return toArray(context.querySelectorAll(selector));
    }
    //css的class相关操作
    var cssClassOption = function(method, className, bool) {

        }
        //返回一个布尔值，表示当前元素是否匹配给定的CSS选择器。
    function matchesSelector(el, selector) {
        var p = Element.prototype;
        var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };
        return f.call(el, selector);
    }
    //对象转换成数组，获取到的原生node集合不一定是数组
    function toArray(obj) {
        var arr = [];
        var i = obj.length;
        for (var j = 0; j < i; j++) {
            arr.push(obj[j]);
        }
        return arr;
    }
    //获取相邻的next element元素
    function nextSlb(node) { //hack
        var n = node.nextelementsibling;
        if (n == undefined) {
            n = node.nextSibling;
            while (n != null && n.nodeType > 1) {
                n = n.nextSibling;
            }
        }
        return n;
    }
    //获取相邻的前一个 element元素
    function previousSlb(node) { //hack
        var n = node.previousElementSibling;
        if (n == undefined) {
            n = node.previousSibling;
            while (n != null && n.nodeType > 1) {
                n = n.previousSibling;
            }
        }
        return n;
    }

    var createDOM = function(HTMLString) {
      var tmp = document.createElement("div")
      var tag = /[\w:-]+/.exec(HTMLString)[0]
      var inMap = wrapMap[tag]
      var validHTML = HTMLString.trim()
      if (inMap) {
        validHTML = inMap.intro + validHTML + inMap.outro
      }
      tmp.insertAdjacentHTML("afterbegin", validHTML)
      var node = tmp.lastChild
      if (inMap) {
        var i = inMap.outro.match(/</g).length
        while (i--) {
          node = node.lastChild
        }
      }
      // prevent tmp to be node's parentNode
      tmp.textContent = ""
      return node
    }
    //私有方法结束
    //操作类定义
    var Init = function(selector, context) {
            //私有属性
            this.dom = null;
            this.length = 0;

            if(!selector) {
              return;
            }

            //方法选择
            if (typeof selector == "string") {
                //create DOM element
                if (selector[0] == "<") {
                    this.dom = [createDOM(selector)]
                } else { // select DOM elements
                    this.dom = context && context instanceof Init ? context.find(selector).get() : selectElements(selector, context);
                }
            } else if (Array.isArray(selector)) {
                this.dom = selector;
            } else if (selector instanceof NodeList || selector instanceof HTMLCollection) {
                this.dom = toArray(selector)
            } else if (selector instanceof Init) {
                return selector
            } else if (typeof selector == "function") {
                return this.ready(selector)
            } else if(typeof selector == 'object') {
              this.dom = context && context instanceof Init ? context.find(selector).get() : selectElements(selector, context);
            } else {
                this.dom = selector ? [selector] : []
            }
            if (this.dom[0] == null) {
                console.log(selector + " :element not exist");
            }
            this.length = this.dom.length;
        }
        //链式调用属性定义
    Init.prototype = {
        each: function(callback) { //遍历原生dom
            // callback(index, element) where element == this
            var dom = this.dom
            dom.forEach(function(d, i) {
                callback.call(d, i, d);
            });
            return this;
        },
        get: function(index) { //获取原生dom元素
            if (index == null) {
                return this.dom;
            }
            index = index > (this.length - 1) ? 0 : index;
            index = index == null || index < 0 ? 0 : index;
            return this.dom[index];
        },
        html: function(str) {
            if (str == null) {
                //返回第一个元素的html字符串
                var el = this.get(0);
                if (!el) return;
                return el.innerHTML;
            } else {
                return this.each(function() {
                    this.innerHTML = str;
                });
            }
        },
        addClass: function(className) {
            return this.each(function() {
                var classArray = " " + this.className + " ";
                var classArrayAdd = className.split(" ");
                var lenAdd = classArrayAdd.length;
                for (var i = 0; i < lenAdd; i++) { //去重操作
                    if (classArray.indexOf(" " + classArrayAdd[i] + " ") == -1) {
                        classArray += classArrayAdd[i] + " ";
                    }
                }
                this.className = classArray.trim();
            });
        },
        removeClass: function(className) {
            return this.each(function() {
                var classArray = this.className + " ";
                var classArrayAdd = className.split(" ");
                var lenAdd = classArrayAdd.length;
                for (var i = 0; i < lenAdd; i++) {
                    classArray = classArray.replace(classArrayAdd[i] + " ", "");
                }
                this.className = classArray.trim(); //trim:ie9+
            });
        },
        after: function(htmlStr) {
            if (htmlStr == null) {
                return this;
            }
            return this.each(function() {
                this.insertAdjacentHTML('afterend', htmlStr);
            });
        },
        append: function(htmlStr) {
            if (htmlStr == null) {
                return this;
            }
            return this.each(function() {
                this.insertAdjacentHTML('beforeend', htmlStr);
            });
        },
        appendTo: function(target) { //待定
            var odom = selectElements(target)
            for (var i = 0, len = odom.length; i < len; i++) {
                odom[i].insertAdjacentHTML('beforeend', this.dom);
            }
            return this;
        },
        attr: function(attrName, attrValue) {
            if (attrValue == null) {
                return this.get(0).getAttribute(attrName);
            } else {
                this.get(0).setAttribute(attrName, attrValue);
                return this;
            }
        },
        before: function(htmlStr) {
            if (htmlStr == null) {
                return this;
            }
            return this.each(function() {
                this.insertAdjacentHTML('beforebegin', htmlStr);
            });
        },
        children: function() {

        },
        clone: function() {
            return this.get(0).cloneNode(true);
        },
        closest: function() {

        },
        css: function(property, value) {
            var otype = typeof property;
            var cssClass, cssClassArray;
            return this.map(function() {
                if (otype == "string") {
                    this.style[property] = value;
                } else if (otype == "object" && value == null) {
                    for (var c in property) {
                        cssClass = property[c];
                        if (cssClass.indexOf("-") > -1) {
                            cssClassArray = cssClass.split('-');
                            cssClass = cssClassAray[0];
                            for (var i = 1; i < cssClassArray.length; i++) {
                                cssClass += cssClassArray.replace(/^\S/, function(s) {
                                    return s.toUpperCase();
                                });
                            }
                        }
                        this.style[c] = cssClass;
                    }
                }
            });
        },
        eq: function(el) {
            var dom = this.get(0);
            return pizza(dom.parentNode.children[el]);
        },
        find: function() {

        },
        first: function() {
            return this.eq(0);
        },
        has: function(selector) {
            if (typeof selector == "string") {
                return this.map(function() {
                    if (this.nodeType > 1 || !matchesSelector(this, selector)) {
                        return;
                    }
                    return this;
                }, false);
            }
        },
        map: function(callback, flattenArrays) {
            if (flattenArrays == null) {
                flattenArrays = true;
            }
            var dom = this.get();
            var values = [];
            dom.forEach(function(d, i) {
                var val = callback.call(d, i, d);
                if (val) {
                    values.push(val);
                }
            });
            return pizza(values);
        },
        hasClass: function(className) {
            var classN = " " + this.get(0).className + " ";
            if (classN.indexOf(className) > -1) {
                return true;
            }
            return false;
        },
        height: function() {
            var dom = this.get(0);
            return dom.offsetHeight;
        },
        index: function(index) {
            var dom = this.get(0);
            var child = dom.parentNode.children;
            var childLen = child.length;
            for (var i = 0; i < childLen; i++) {
                if (child[i] === dom) {
                    return i;
                }
            }
        },
        insertAfter: function() {

        },
        insertBefore: function() {

        },
        is: function(selector) {
            var element = this.get(0);
            if (typeof selector == "string") {
                if (element.nodeType > 1) {
                    return false;
                }
                return matchesSelector(element, selector);
            }
        },
        last: function() {
            return pizza(this.get(this.length - 1));
        },
        next: function(selector) {
            var nt;
            return this.map(function() {
                nt = nextSlb(this); //this.nextSibling;
                if (nt.nodeType > 1) {
                    return;
                }
                console.log(nt);
                if (selector != null) {
                    if (matchesSelector(nt, selector)) {
                        return nt
                    }
                    return;
                } else {
                    return nt;
                }
            });
        },
        not: function() {

        },
        offset: function() {
            var element = this.get(0);
            var set = element.getBoundingClientRect();
            return {
                top: set.top +  (document.documentElement.scrollTop || document.body.scrollTop),
                left: set.left + (document.documentElement.scrollLeft || document.body.scrollLeft)
            }
        },
        parent: function() {
            return pizza(this.get(0).parentNode);
        },
        parents: function() {

        },
        position: function() { //相对父对象的相对位置,如果其所有的父元素都为默认定位（static）方式，则其处理方式和offset()一样，是当前窗口的相对偏移
            var d = this.get(0);
            return {
                top: d.offsetTop,
                left: d.offsetLeft
            };
        },
        prop: function() {

        },
        prev: function(selector) { //previousSlb
            var nt;
            return this.map(function() {
                nt = previousSlb(this); //this.nextSibling;
                if (nt.nodeType > 1) {
                    return;
                }
                if (selector != null) {
                    if (matchesSelector(nt, selector)) {
                        return nt
                    }
                    return;
                } else {
                    return nt;
                }
            });
        },
        prevAll: function() {

        },
        ready: function() {

        },
        remove: function(selector) {
            var self = this;
            return this.each(function(node, i) {
                var parent = this.parentNode
                if (!parent) return;
                console.log("i=" + i);
                if (selector == null) {
                    parent.removeChild(this);
                } else if (matchesSelector(this, selector)) {
                    parent.removeChild(this);
                }
            });
        },
        removeAttr: function(attr) {
            return this.each(function() {
                this.removeAttribute(attr);
            });
        },
        replaceWith: function() {

        },
        replaceAll: function() {

        },
        scrollLeft: function(len) {
            if(len == null) {
                return (document.documentElement.scrollLeft || document.body.scrollLeft);
            } else {
                scroll(len,this.scollTop());
            }
        },
        scrollTop: function(len) {
            var element = this.get(0);
            if(len == null) {
                return (document.documentElement.scrollTop || document.body.scrollTop);
            } else {
                scroll(this.scrollLeft(),len)
            }
        },
        text: function(content) {
            var d = this.get(0);
            if (content == null) {
                return d.textContent;
            } else {
                d.textContent = content;
            }
        },
        toggleClass: function() {

        },
        val: function(value) {
            if (value == null) {
                var el = this.get(0);
                if (!el) return;
                if (el.multiple) {
                    var values = [];
                    this.first().children(":checked").each(function() {
                        values.push(this.value);
                    });
                    return values;
                }
                return el.value;
            } else {
                return this.each(function() {
                    this.value = value
                });
            }
        },
        width: function() {
            var dom = this.get(0);
            return dom.offsetWidth;
        },
        wrap: function() {

        },
        unwrap: function() {

        }
    };


    pizza = function(selector, context) {
        return new Init(selector, context);
    };
    //插件扩展
    pizza.fn = Init.prototype;
    pizza.fn.version = "1.0.0";

    pizza.extend = function(defaults, options) {
       for( var i in options){
            defaults[i] = options[i];
       }
       return defaults;
    }
    return pizza;
}($));
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
