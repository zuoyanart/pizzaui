define("tag/tag",function(e,t,i){var a=e("jquery"),n=e("pizzalayer"),s=e("pizzatools"),r=function(e){var t=this;t.values=",",t.valuesLength=0;var i={isPost:!1,url:"/space/person/updatedoc"};option=a.extend(i,e);var r=a(".mcren-tag > div > ul");t.init=function(e){if(n.detail("#tag"),r.on("focus","input",function(){n.tips(this,{msg:"鼠标离开或回车键确认",time:3e3})}),r.on("blur","input",function(){t.add(this)}),r.on("keydown","input",function(e){var e=e||event,i=e.which||e.keyCode;13==i&&t.add(this)}),r.on("click","a",function(){t.del(this)}),e){t.values=","+e+",";for(var i=e.split(","),a=t.valuesLength=i.length,s="",u=0;a>u;u++)s+="<li>"+i[u]+'<a href="javascript:void(0);"><i class="icon-remove btn-icon"></i></a></li>';r.html(8==t.valuesLength?s:s+'<li><input type="text" /></li>')}},t.add=function(e){var i=a(e),r=/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,u=s.xss(a.trim(i.val())),l=s.getCharLen(u);if(0==l)return void layer.closeAll("tips");if(l>10||1>l||!r.test(u))return void n.tips(i,{msg:"请输入1—5个字并且不包含特殊字符",skin:"layer-pizza-tip-danger",time:5e3});if(t.values.indexOf(","+u+",")>-1)return void n.tips(i,{msg:"该标签已存在",skin:"layer-pizza-tip-danger",time:5e3});layer.closeAll("tips"),t.values+=u+",";var o={id:i.parent(),success:function(){t.valuesLength++;var e=i.parent();e.html(u+'<a href="javascript:void(0);"><i class="icon-remove btn-icon"></i></a>'),t.valuesLength<8&&(e.after('<li><input type="text" /></li>'),e.next().find("input").focus())},error:function(){t.values=t.values.replace(","+u+",",",")}};t.update(o)},t.del=function(e){t.valuesLength--;var e=a(e).parent(),i=e.text();if(t.values==","+i+",")return void n.msg({msg:"标签不能全部删除",id:e});t.values=t.values.replace(","+i+",",",");var s={id:e.parent(),success:function(){7==t.valuesLength&&e.parent().append('<li><input type="text"></li>'),e.remove()},error:function(){t.values=t.values+i+","}};t.update(s)},t.getValues=function(){var e="";return","==t.values?e="":(e=t.values.substring(1,t.values.length),e=e.substring(0,e.length-1)),s.xss(e)},t.update=function(i){e.isPost&&a.ajax({type:"post",url:e.url,dataType:"json",data:"name=tag&value="+t.getValues()+s.getCsrf(),success:function(e){"true"==e.state?(i.success(),n.msg({msg:"更新成功",id:i.id,time:2e3})):(n.msg({msg:"更新失败，请稍后重试",id:i.id,time:2e3}),i.error())},error:function(){n.msg({msg:"更新失败，请稍后重试",id:i.id,time:2e3}),i.error()}})}};i.exports=r});