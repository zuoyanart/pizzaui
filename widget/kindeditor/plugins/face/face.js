function hideFace(){$(".face").remove(),$("body").unbind("click")}var ke_nface;KindEditor.plugin("face",function(e){var c=this,a="face",i=c.facePath||c.pluginsPath+"face/images/",n=1;c.clickToolbar(a,function(){function a(a,n,t){a.mouseover(function(){clearTimeout(ke_nface),e(this).children().css("border","1px solid blue"),$(".face00").html('<img src="'+i+t+'.gif" style="margin-top:24px;"/>').css(7>=t%14?{display:"block",left:429}:{display:"block",left:73})}),a.mouseout(function(){e(this).children().removeAttr("style"),ke_nface=setTimeout(function(){$(".face00").removeAttr("style")},1e3)}),a.click(function(e){c.insertHtml('<img src="'+i+t+'.gif" border="0" />'),editor.focus(),e.stop(),hideFace()})}function t(c){var i=document.createElement("table");p.div.append(i),i.className="facec",i.cellPadding=0,i.cellSpacing=0,i.border=0;for(var n=(c-1)*r+f,t=0;o>t;t++)for(var l=i.insertRow(t),u=0;s>u;u++){var m=e(l.insertCell(u));a(m,u,n);var h=e('<span class="faceb0 face'+n+'"></span>');m.append(h),d.push(m),n++}$("body").bind("click",function(){$(".face").remove(),$("body").unbind("click")})}$(".letter").remove();var o=5,s=14,l=70,f=0,r=o*s,d=(Math.ceil(l/r),Math.floor(s/2),[]),p=e.widget({width:583,x:parseInt($("#mailsend").offset().left),y:parseInt($("#mailsend").offset().top)-225,z:101,centerLineMode:!1,html:'<span class="iicon44" style="left:399px;"></span><span class="iicon18" onclick="hideFace();"></span><p class="face00"></p>',css:{background:"#ffffff"},cls:"face",shadowMode:!0});t(n)})});