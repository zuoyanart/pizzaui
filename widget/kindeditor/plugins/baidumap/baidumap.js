KindEditor.plugin("baidumap",function(e){var t=this,n="baidumap",a=t.lang(n+".");t.clickToolbar(n,function(){function i(){o=p[0].contentWindow,d=e.iframeDoc(p)}var o,d,s=['<div style="padding:10px 20px;">','<div class="ke-dialog-row">',a.address+' <input id="kindeditor_plugin_map_address" name="address" class="ke-input-text" value="" style="width:200px;" /> ','<span class="ke-button-common ke-button-outer">','<input type="button" name="searchBtn" class="ke-button-common ke-button" value="'+a.search+'" />',"</span>","</div>",'<div class="ke-map" style="width:558px;height:360px;"></div>',"</div>"].join(""),c=t.createDialog({name:n,width:600,title:t.lang(n),body:s,yesBtn:{name:t.lang("yes"),click:function(){var e=o.map,n=e.getCenter(),a=n.lng+","+n.lat,i=e.getZoom(),d=["http://api.map.baidu.com/staticimage","?center="+encodeURIComponent(a),"&zoom="+encodeURIComponent(i),"&width=558","&height=360","&markers="+encodeURIComponent(a),"&markerStyles="+encodeURIComponent("l,A")].join("");t.exec("insertimage",d).hideDialog().focus()}},beforeRemove:function(){l.remove(),d&&d.write(""),p.remove()}}),m=c.div,r=e('[name="address"]',m),l=e('[name="searchBtn"]',m),p=e('<iframe class="ke-textarea" frameborder="0" src="'+t.pluginsPath+'baidumap/map.html" style="width:558px;height:360px;"></iframe>');p.bind("load",function(){p.unbind("load"),e.IE?i():setTimeout(i,0)}),e(".ke-map",m).replaceWith(p),l.click(function(){o.search(r.val())})})});