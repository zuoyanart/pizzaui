var $ = require('jquery');
var tools = require('pizzatools');

var rightMenu = new function() {
    var _self = this;
    _self.init = function() {
        var s = '<ul>';
        var time = '';
        $('.leftside').find('h2').each(function() {
            time = tools.randomChar(15);
            $(this).attr('id', time)
            s += '<li><a href="#'+time+'">'+$(this).text()+'</a></li>'
        });
        s += '<li><a href="#top">返回顶部</a></li></ul>'
        $('.rightside').html(s);
    }
}

module.exports = rightMenu;
