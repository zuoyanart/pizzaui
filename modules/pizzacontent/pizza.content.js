define("pizzacontent",function(t,a,e){var r=t("pizzatools");t("store");var n=new function(){function t(t,n,i){$.ajax({url:"/user/user/getdoc",data:"id="+t+"&nid="+n+r.getCsrf(),success:function(t){var r=[];i?(r=i.data,30==r.length?(r.push(t.data),r.shift()):r.push(t.data)):r.push(t.data),store.set(e.storeKey,{data:r}),a(t.data)}})}function a(t){$("#content-avatar").attr("src",r.siteData.url.avatar+t.avatar+"!v1"),$(".content-avatar").attr("src",r.siteData.url.avatar+t.avatar+"!v1"),$(".content-avatar-v2").attr("src",r.siteData.url.avatar+t.avatar+"!v2"),$("#content-link").attr("href","/user?id="+t._id+"&nid="+t.neoid).html(t.nickName),$(".content-nickname-c").html(t.nickName),$(".content-idcard").html("帐号："+t.userName),$("#content-area").html(t.province+"/"+t.city),$(".usernavrmlink").attr("href","/space/personrel/index?id="+t._id+"&nid="+t.neoid)}var e=this;e.storeKey="userSimple",e.init=function(){e.getUserInfo()},e.getUserInfo=function(){var n=document.location.href.split("?")[0].split("/"),i=r.getPara("id"),o=r.getPara("nid"),s=r.getCookie("nid"),c=r.getCookie("id"),d=n[5]?n[5]:"",v=n[4]?n[4]:"";if("space"==n[3]&&"usercon"!=d&&"personrel"!=v)$("#content-avatar").attr("src",r.siteData.url.avatar+r.getCookie("avatar")+"!v1"),$("#content-link").attr("href","/user?id="+c+"&nid="+s).html(r.getCookie("nickname")),$("#content-area").html(r.getCookie("prov")+"/"+r.getCookie("city")),$(".usernavrmlink").attr("href","/space/personrel/index?id="+c+"&nid="+s);else{var l=store.get(e.storeKey);if(l){for(var u=l.data,f=!1,h=0,p=u.length;p>h;h++)if(u[h]&&u[h]._id==i){a(u[h]),f=!0;break}f||t(i,o,l)}else t(i,o,l)}}};e.exports=n});