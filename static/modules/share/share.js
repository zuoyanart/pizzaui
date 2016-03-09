var $ = jQuery = require('jquery');
var tools = require('pizzatools');

var share = new function() {
  var _self = this;
  var tpl = __inline('sharerule.ejs');
  /**
   * 显示规则tip
   * @param  {[type]} obj   [description]
   * @param  {[type]} onobj [description]
   * @param  {[type]} type  [description]
   * @return {[type]}       [description]
   */
  _self.tip = function(obj, onobj) {
      if (onobj) {
        $(obj).on('mouseenter', onobj, function() {
          getRule($(this));
        }).on('mouseleave', onobj, function() {
          hideRule();
        });
      } else {
        $(obj).on('mouseenter', function() {
          getRule($(this));
        }).on('mouseleave', function() {
          hideRule();
        });
      }
    }
    /**
     * 获取规则
     * @return {[type]} [description]
     */
  function getRule(obj) {
    var data = obj.data("rule");
    var shtype = obj.attr("shtype");
    var s = '';
    if (data) {
      s = tpl({
        data: data,
        tools: tools
      });
      $("body").append(s);
      showRule(obj);
    } else {
      $.ajax({
        url: '/user/share/getrule',
        data: 'id=' + obj.attr("id").split('_')[1] + '&type=' + shtype,
        success: function(msg) {
          if (msg.state == "true") {
            obj.data("rule", msg.msg);
            s = tpl({
              data: msg.msg,
              tools: tools
            });
            $("body").append(s);
            showRule(obj);
          } else {
            layer.msg('网络错误，请稍后重试', {
              time: 1000
            });
          }
        }
      });
    }
  }

  _self.setStart = function(start) {
      var s = '（含以上）';
      switch (start) {
        case 1:
          s = '<i class="icon-star star-huang"></i>' + s;
          break;
        case 2:
          s = '<i class="icon-star star-orange"></i>' + s;
          break;
        case 3:
          s = '<i class="icon-star star-hong"></i>' + s;
          break;
        default:
          s = '';
          break;
      }
      return s;
    }
    /**
     * 显示规则弹窗
     * @return {[type]} [description]
     */
  function showRule(obj) {
    var offset = obj.offset();
    $('.sharerule-tip').css({
      'display': 'block',
      "left": parseInt(offset.left) - 427,
      "top": parseInt(offset.top) - 175,
    });
  }
  /**
   * 隐藏规则弹窗
   * @return {[type]} [description]
   */
  function hideRule() {
    $('.sharerule-tip').remove();
  }
}

module.exports = share;
