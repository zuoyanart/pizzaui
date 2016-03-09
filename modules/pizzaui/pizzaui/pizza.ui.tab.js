/**
 * TAB UI的实现，使用方法参考demo
 * @Version 0.2
 * @Author: 左盐(huabinglan@163.com)
 * @Date: 14-1-2 下午6:05
 */
;
(function($) {

  $.fn.pizzaTab = function(options) {

    var defaults = {
      activeCla: "active", //默认标题选中样式
      itemCla: 'item', //默认正文区样式
      url: undefined
    }

    var options = $.extend(defaults, options);
    //私有函数，ajax执行函数
    function _ajaxData(li, divCon) {
      if ($.trim(divCon.html()) == '') {
        $.ajax({ //请求数据
          type: "POST",
          url: options.url,
          data: li.attr('param'),
          success: function(msg) {
            divCon.html(msg);
          }
        });
      }
    }

    //事件绑定
    var ul = this.find('ul:first');
    ul.on("click", 'li', function() {
      var li = $(this),index = li.index();

      if (!li.hasClass(options.activeClass)) {
          var activeli = li.parent().find("." + options.activeCla);
          var activeliIndex = activeli.index();
          activeli.removeClass(options.activeCla);
          li.addClass(options.activeCla);
          var divs = li.parent().parent().children("." + options.itemCla);
          $(divs[activeliIndex]).removeAttr("style");
          $(divs[index]).css("display", "block");
          if (options.ajaxUrl) {
            _ajaxData(lic, div);
          }
        }
    });

    //当需要ajax请求并且第一项为空时，默认加载执行ajax加载第一项的内容
    if (options.url) {
      var firstLi = this.find('ul:first').find('.' + options.activeCla),
        firstDiv = $("." + options.itemCla).first().css("display", "block");
      _ajaxData(firstLi, firstDiv);
    } else {
      $(this).children("." + options.itemCla).first().css("display", "block");
    }
  };

})(jQuery);
