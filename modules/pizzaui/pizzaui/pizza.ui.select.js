/**
 * --------------------------------------------------------
 * 下拉select模拟，使用方法参考demo
 * @Version 0.1
 * @Author: 左盐(huabinglan@163.com)
 * @Date: 15-8-3 下午4:58
 * --------------------------------------------------------
 */
;
(function($) {

  $.fn.pizzaSelect = function(options) {
    defaults = {
      showMaxHeight: null, //选择列表显示最大高度
      optionHeight: 24, //选择列表单项高度
      triangleSize: 6, //右侧小三角大小
      triangleColor: '#fff', //右侧小三角颜色
      topPosition: false, //选择列表项在列表框上部显示,默认在下边显示
      speed: 100, //选择列表框显示动画速度(毫秒)
      option: {}, //自定义数据，数据格式：text: value
      onChange: null //自定义模拟选择列表项change事件
    };

    var options = $.extend(defaults, options);
    var _dom = this;


    /**
     * 获取原生option数据并组合成div > ui > li
     * @param  {[type]} select  select 元素
     * @return {[type]}  []
     */
    function getSelectList(select) {
      var o = $(select);
      var oWidth = parseInt(o.width());
      var oHeight = parseInt(o.css("height"));


      var selectId = o.attr('id');
      var selectClass = o.attr('class');
      var selectedObj = o.find('option[selected="selected"]');

      var selected = '',
        selectedText = '';
      if (options.option.selected != undefined) {
        selected = options.option.selected.value;
        selectedText = options.option.selected.name;
      } else if (o.attr('val')) {
        selected = o.attr('val');
        selectedText = o.find('option[value="' + selected + '"]').text();
      } else if (selectedObj.length > 0) {
        selected = selectedObj.val();
        selectedText = selectedObj.text();
      } else {
        selected = o.find('option').first().attr('value');
        selectedText = o.find('option').first().text();
      }

      var div = '<div  id="' + selectId + 'p" class="btn-select" style="width:' + oWidth + 'px;height:' + oHeight + 'px" tabindex="0">';
      div += '<input type="hidden" value="' + selected + '" name="' + o.attr('name') + '" id="' + selectId + '"/>';
      div += '<i class="select-down icon-caret-down"></i>';
      div += '<label class="select-button"  style="height:' + (oHeight - 2) + 'px;line-height:' + (oHeight - 2) + 'px;">' + selectedText + '</label>';
      div += '<div class="select-list" >';
      div += '<ul>';
      if (!options.option.selected) {
        var value = '';
        o.find('option').each(function() {
          var o = $(this);
          value = o.attr('value') != undefined ? o.attr('value') : $.trim(o.text());
          div += '<li data="' + value + '" >' + $(this).text() + '</li>';
        });
      } else { //获取自定义数据
        for (var v in options.option) {
          if (v != 'selected') {
            div += '<li data="' + options.option[v] + '" >' + v + '</li>';
          };
        };
      };
      div += '</ul></div>';
      div += '</div>';

      o.after(div);
      disUllist(o);
      optionClick(o);
      listBlur(o);
      o.remove();
    }
    /**
     * 遍历选择器，初始化所有的select控件
     * @return {[type]} [description]
     */
    function eachSelect() {
      var div;
      $(_dom).each(function() {
        div = getSelectList($(this));
      });
    }
    /**
     * 显示或者隐藏下拉选项
     * @return {[type]} [description]
     */
    function disUllist(obj) {
      obj.next().find('.select-button').click(function() { //点击内容区弹出下拉
        $(this).next().toggle();
      });
      obj.next().find('.select-down').click(function() { //点击箭头弹出下拉
        $(this).next().next().toggle();
      });
    }
    /**
     * li点击事件
     * @return {[type]} [description]
     */
    function optionClick(obj) {
      obj.next().find('.select-list').on('click', 'li', function() {
        var parent = $(this).parent().parent().parent();
        if ($(this).attr('data') != parent.find('input[type="hidden"]').val()) {
          parent.find('.select-button').html($.trim($(this).html()));
          parent.find('input[type="hidden"]').val($(this).attr('data'));
          if ($.isFunction(options.onChange)) {
            options.onChange($(this), parent.find('input[type="hidden"]'));
          }
          if ($(this).attr('data') != '') { //清除表单验证提示
            parent.removeClass('validate-border');
          }
        }
        parent.find('.select-list').toggle();
      });
    }
    /**
     * 下拉消失控制
     * @return {[type]} [description]
     */
    function listBlur() {
      $("body").off('click.btn-select').on('click.btn-select', function(event) {
        var o = $(event.target);
        var select = o.parents('.btn-select');
        var selectId = select.attr('id');
        $('.select-list:visible').each(function() { //获取到所有的可见元素，然后遍历隐藏
          if ($(this).parents('.btn-select').attr('id') !== selectId) {
            $(this).css('display', 'none');
          }
        });
      });
    }
    //函数执行
    eachSelect();
  };

})(jQuery);
