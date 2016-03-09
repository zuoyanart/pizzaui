/**
 * 正文页打印用户信息
 * @param  {[type]} 'pizzatools' [description]
 * @return {[type]}              [description]
 */
var tools = require('pizzatools');
require('store');

var pizzaContent = new function() {
	var _self = this;
	_self.storeKey = 'userSimple';

	_self.init = function() {
			_self.getUserInfo();
		}
		/**
		 * 获取个人信息算法
		 * @return {[type]} [description]
		 */
	_self.getUserInfo = function() {
		var url = document.location.href.split('?')[0].split('/');
		var queryId = tools.getPara('id');
		var queryNid = tools.getPara('nid');
		var nid = tools.getCookie('nid');
		var uid = tools.getCookie('id');
		var isUserMessage = url[5] ? url[5] : '';
		var ispersonRel = url[4] ? url[4] : '';
		if (url[3] == 'space' && isUserMessage != 'usercon' && ispersonRel != 'personrel') { //在后台
			$('#content-avatar').attr('src', tools.siteData.url.avatar + tools.getCookie('avatar') + '!v1');
			$('#content-link').attr('href', '/user?id=' + uid + '&nid=' + nid).html(tools.getCookie('nickname'));
			$('#content-area').html(tools.getCookie('prov') + '/' + tools.getCookie('city'));
			$('.usernavrmlink').attr('href', '/space/personrel/index?id=' + uid + '&nid=' + nid);
		} else {
			//store.remove(_self.storeKey);
			var userSimple = store.get(_self.storeKey);
			//console.log(userSimple);
			if (userSimple) {
				var array = userSimple.data;
				var isCheck = false; //确定是否已经找到匹配
				for (var i = 0, len = array.length; i < len; i++) {
					if (array[i] && array[i]._id == queryId) {
						bindData(array[i]);
						isCheck = true;
						break;
					}
				}
				if (!isCheck) {
					getUserSimpleInfo(queryId, queryNid, userSimple);
				}
			} else {
				getUserSimpleInfo(queryId, queryNid, userSimple);
			}
		}
	}

	function getUserSimpleInfo(uid, nid, storeData) {
		$.ajax({
			url: '/user/user/getdoc',
			data: 'id=' + uid + '&nid=' + nid + tools.getCsrf(),
			success: function(msg) {
				var array = [];
				if (storeData) {
					array = storeData.data;
					if (array.length == 30) { //只保留30条记录
						array.push(msg.data);
						array.shift();
					} else {
						array.push(msg.data);
					}
				} else {
					array.push(msg.data);
				}
				store.set(_self.storeKey, {
					data: array
				});
				bindData(msg.data);
			}
		});
	}
	/**
	 * 绑定数据
	 * @param  {[type]} doc [description]
	 * @return {[type]}     [description]
	 */
	function bindData(doc) {
		$('#content-avatar').attr('src', tools.siteData.url.avatar + doc.avatar + '!v1');
		$('.content-avatar').attr('src', tools.siteData.url.avatar + doc.avatar + '!v1');
		$('.content-avatar-v2').attr('src', tools.siteData.url.avatar + doc.avatar + '!v2');
		$('#content-link').attr('href', '/user?id=' + doc._id + '&nid=' + doc.neoid).html(doc.nickName);
		$('.content-nickname-c').html(doc.nickName);
		$('.content-idcard').html('帐号：' + doc.userName);
		$('#content-area').html(doc.province + '/' + doc.city);
		$('.usernavrmlink').attr('href', '/space/personrel/index?id=' + doc._id + '&nid=' + doc.neoid);
	}
}

module.exports = pizzaContent;
