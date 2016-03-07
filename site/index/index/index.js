
var $ = require('jquery');
var pizzalayer = require('pizzalayer');

var index = new function () {
  var that = this;

  that.init = function() {
    o.append(o.find('a').first().clone());
    pizzalayer.detail('.patent');
    setTimeout(ss, 2000);
    // 微信二维码
    $('.weixin').hover(function() {
      $('.weixin-erweima').css({'display':'block'});
    }, function() {
      $('.weixin-erweima').css({'display':'none'});
    });
    // 核心团队，显示彩色
    $('.teammates').hover(function() {
      that.getColorImg($(this), true);
    }, function() {
      that.getColorImg($(this), false);
    });

  }

  that.t = null;

  var m = 1;
  var o = $('#slide-content');
  function ss() {
    clearTimeout(that.t);
    $('#slide-nav').find('.present').removeClass('present');

    if(m == 5) {
      //$('#slide-nav').css({'left': 0});
      //$('#slide-nav .arrow').css({'left': 0});
      $('#slide-nav .arrow').animate({'left': 0}, 500);
      //$('#slide-nav a').eq(0).addClass('present');
    } else {
      //$('#slide-nav .arrow').css({'left': 200*m});
      $('#slide-nav .arrow').animate({'left': 200*m}, 500);
      //$('#slide-nav a').eq(m).addClass('present');
    }

    $('#slide-content').animate({ 'left':-1000*m }, 1000, function() {
      $('.banner-tip.present').removeClass('present');
      $('.banner-tip').eq(m).addClass('present');
      if(parseInt(o.css('left')) <= -5000) {
        m = 1;
        o.css({'left':0});
      } else {
        m++;
      }
      that.t = setTimeout(ss, 2000);
    });
  }

  var team = {
    1: __uri('/site/index/index/img/team-1-c.png'),
    2: __uri('/site/index/index/img/team-2-c.png'),
    3: __uri('/site/index/index/img/team-3-c.png'),
    4: __uri('/site/index/index/img/team-4-c.png')
  }

  that.getColorImg = function(obj, type) {
    var o = obj.children('img');
    var newSrc = team[o.attr('src').split('_')[0].split('-')[1]];
    if(!type) {
      o.attr('src', obj.attr('src'));
    } else {
      obj.attr('src', o.attr('src'));
      o.attr('src', newSrc);
    }
  }

};

module.exports = index;
