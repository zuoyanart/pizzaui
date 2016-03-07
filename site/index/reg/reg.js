/**
 * 用户注册页面
 * @authors lingirl (success99@126.com)
 * @date    2015-10-29 16:34:56
 * @version $Id$
 */

var $ = require('jquery');
var pizzaLayer = require('pizzalayer');
var tools = require('pizzatools');
require('pizzaui');
require('laydate');

var reg = new function() {
	var _self = this;

	_self.init = function() {
		$('#question').pizzaSelect({});// 密码找回问题下拉
		$('#sex').pizzaSelect({});// 性别下拉
		pizzaLayer.detail('#account-explain');

		//<初始化日历控件>
		laydate({
			elem: '#birthday',
			istoday: false,
			issure: false,
			isclear: false,
			//min: '1900-01-01 00:00:00',
      //max: '2099-12-31 23:59:59',
			event: 'focus'
		});
		// 城市地区
		$('#area').pizzaArea({
			type: false,
			ajaxUrl: '/area/index'
		 });

		$("#regform").pizzaValidate({
			'fields': {
				'#nickname': {
					'must': true,
					'minLength': 2,
					'maxLength': 12,
					'reg': /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
					'focusMsg': "<b>1-12</b>个字符",
					'errMsg': "<b>错误</b> |  需1-12个字符 / 不能含有特殊符号",
          'rightMsg': '<em>正确</em>'
				},
				'#account': {
					'must': true,
					'minLength': 6,
					'maxLength': 12,
					'reg':/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
          'url': '/reg/check',
          'focusMsg': "<b>6-12</b>个字符",
          'errMsg': "<b>错误</b> | 需6-12个字符 / 此帐号已经被注册",
          'rightMsg': '<em>正确</em>'
				},
				'#password': {
					'must': true,
					'minLength': 6,
					'maxLength': 12,
					'focusMsg': "<b>6-12</b>个字符",
          'errMsg': "<b>错误</b> | 需6-12个字符",
          'rightMsg': '<em>正确</em>'
				},
				'#question': {
					'must': true,
					'minLength': 5,
					'maxLength': 20,
					'focusMsg':"<b></b>请选择问题",
          'errMsg':"<b>错误</b> | 请选择问题",
          'rightMsg': '<em>正确</em>'
				},
				'#answer': {
					'must': true,
					'minLength': 1,
					'maxLength': 20,
					'focusMsg': "<b>1-20</b>个字符",
          'errMsg':"<b>错误</b> | 需1-20个字符",
          'rightMsg': '<em>正确</em>'
				},
				'#sex': {
					'must': true,
					'minlength':1,
					'maxLength':4,
					'focusMsg':'<b></b>请选择您的性别',
					'errMsg': '<b>错误</b> | 性别没有选择',
					'rightMsg': '<em>正确</em>'
				},
				'#birthday': {
					'must': true,
					'minLength': 6,
					'maxLength': 16,
					'focusMsg': "请选择您的生日",
					'errMsg': '请选择您的生日'
				},
				'#area': {
					'must': true,
					'minLength': 2,
					'maxLength': 20,
					'focusMsg':"<b></b>请选择所在省市",
          'errMsg':"<b>错误</b> | 地区没有选择",
          'rightMsg': '<em>正确</em>'
				}
			},
			ajaxFun: function(data) {
				var mcTag = mcTag.getValues();
				if(mcTag.length == 0) {
					layer.msg('请填写标签');
					return;
				}
				$.ajax({
					url: '/reg/reg',
					data: data + '&tag=' + mcTag + tools.getCsrf(),
					success: function(msg) {
						if (msg.state == 'null') {
							pizzaLayer.msg({
                id: '#password',
                msg: '网络错误，请稍后重试'
              });
						} else {
							setTimeout(function() {
								next();
							}, 1000);
						}
					}
				});
			}
		});
	}

	function next() {
		var o = $('.reg-success');
		var index = layer.open({
			type: 1,
			shade: 0.6,
			title: false,
			closeBtn: false,
			shift: 0,
			area: ['814px', '450px'],
			content: o
		});
		o.find('.icon-remove').click(function() {
			layer.close(index);
		});
	}
}

module.exports = reg;
