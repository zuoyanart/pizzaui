define('share', function(require, exports, module){ var $ = jQuery = require('jquery');
var tools = require('pizzatools');

var share = new function() {
  var _self = this;
  var tpl = [function(locals, filters, escape, rethrow
/**/) {
escape = escape || function (html){
  return String(html)
    .replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
};
var __stack = { lineno: 1, input: "<div class=\"sharerule-tip\">\r\n    <ul class=\"left\">\r\n        <li>悬赏总出资<br/><span><%= tools.accDiv(data.money,100)%>元</span></li>\r\n        <li style=\"margin-top:30px;\">单次奖励金<br/><span><%= tools.accDiv(data.one, 100)%>元<br/>/查看一次</span></li>\r\n    </ul>\r\n    <div class=\"right\">\r\n        <div class=\"top\">满足如下条件，转发/分享此信息的会员可获得奖励金</div>\r\n        <div class=\"des\">\r\n            <ul>\r\n                <li>1-转发/分享信息的会员</li>\r\n                <li style=\"height:71px;\">\r\n                    <table>\r\n                        <tr>\r\n                            <td rowspan=\"3\" style=\"vertical-align:top\"><i class=\"yuandian\"></i>诚信等级：</td>\r\n                              <td>基础资料：<%- share.setStart(data.shdoc)%></td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>人脉质量：<%- share.setStart(data.shrm)%></td>\r\n                        </tr>\r\n                        <tr>\r\n                            <td>综合能力：<%- share.setStart(data.shzh)%></td>\r\n                        </tr>\r\n                    </table>\r\n                </li>\r\n                <li><i class=\"yuandian\"></i>相互彼此间的人脉关系：\r\n                  <% if(data.shlevel == 1) {%>\r\n                  <span><%= data.shlevel%>级人脉关系</span>\r\n                  <%} else {%>\r\n                     不限\r\n                  <%}%>\r\n                </li>\r\n            </ul>\r\n            <ul>\r\n                <li>2-点击查看信息的人</li>\r\n                <li><i class=\"yuandian\"></i>所属地区：<span><%= data.clarea%></span></li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    <label class=\"jiantou\"></label>\r\n</div>\r\n", filename: "modules/share/sharerule.ejs" };
function rethrow(err, str, filename, lineno){
  var lines = str.split('\n')
    , start = Math.max(lineno - 3, 0)
    , end = Math.min(lines.length, lineno + 3);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;
  
  throw err;
}
try {
var buf = [];
with (locals || {}) { (function(){ 
 buf.push('<div class="sharerule-tip">\n    <ul class="left">\n        <li>悬赏总出资<br/><span>', escape((__stack.lineno=3,  tools.accDiv(data.money,100))), '元</span></li>\n        <li style="margin-top:30px;">单次奖励金<br/><span>', escape((__stack.lineno=4,  tools.accDiv(data.one, 100))), '元<br/>/查看一次</span></li>\n    </ul>\n    <div class="right">\n        <div class="top">满足如下条件，转发/分享此信息的会员可获得奖励金</div>\n        <div class="des">\n            <ul>\n                <li>1-转发/分享信息的会员</li>\n                <li style="height:71px;">\n                    <table>\n                        <tr>\n                            <td rowspan="3" style="vertical-align:top"><i class="yuandian"></i>诚信等级：</td>\n                              <td>基础资料：', (__stack.lineno=15,  share.setStart(data.shdoc)), '</td>\n                        </tr>\n                        <tr>\n                            <td>人脉质量：', (__stack.lineno=18,  share.setStart(data.shrm)), '</td>\n                        </tr>\n                        <tr>\n                            <td>综合能力：', (__stack.lineno=21,  share.setStart(data.shzh)), '</td>\n                        </tr>\n                    </table>\n                </li>\n                <li><i class="yuandian"></i>相互彼此间的人脉关系：\n                  ');__stack.lineno=26; if(data.shlevel == 1) {; buf.push('\n                  <span>', escape((__stack.lineno=27,  data.shlevel)), '级人脉关系</span>\n                  ');__stack.lineno=28;} else {; buf.push('\n                     不限\n                  ');__stack.lineno=30;}; buf.push('\n                </li>\n            </ul>\n            <ul>\n                <li>2-点击查看信息的人</li>\n                <li><i class="yuandian"></i>所属地区：<span>', escape((__stack.lineno=35,  data.clarea)), '</span></li>\n            </ul>\n        </div>\n    </div>\n    <label class="jiantou"></label>\n</div>\n'); })();
} 
return buf.join('');
} catch (err) {
  rethrow(err, __stack.input, __stack.filename, __stack.lineno);
}
}][0];
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
 
});