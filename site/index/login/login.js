/**
 * 用户登录页面
 * @authors 左盐 (huabinglan@163.com)
 * @date    2015-09-08 13:34:56
 * @version $Id$
 */

var $ = require('jquery');
var pizzaLayer = require('pizzalayer');
var tools = require('pizzatools');
require('pizzaui');

var login = new function() {
    var _self = this;

    _self.init = function() {
        $("#loginform").pizzaValidate({
            'fields': {
                '#username': {
                    'must': true,
                    'minLength': 2,
                    'maxLength': 12,
                    'focusMsg': "请输入用户名",
                    'errMsg': '用户名不能为空或用户名必须在5-12个字符之间'
                },
                '#password': {
                    'must': true,
                    'minLength': 6,
                    'maxLength': 16,
                    'focusMsg': "请输入6-16位的密码",
                    'errMsg': '密码不能为空且密码须在6-16个字符之间'
                }
            },
            ajaxFun: function(data) {
                $.ajax({
                    type: 'post',
                    url: '/index/login',
                    data: data + tools.getCsrf(),
                    dataType: 'json',
                    success: function(msg) {
                        console.log(msg);
                        if (msg.state != 'true') {
                            pizzaLayer.msg({
                                id: '#password',
                                msg: '用户名或密码错误，请重新登录'
                            })
                        } else {
                            var url = tools.getPara('f');
                            if (url != '') {
                                document.location.href = url;
                            } else {
                                document.location.href = '/space/';
                            }
                        }
                    }
                });
            }
        });

    }

    _self.login = function() {

    }

}

module.exports = login;
