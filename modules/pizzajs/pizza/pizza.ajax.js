define("pizzajs",function(){var e=function(t){function a(e,t,a,n){var o=e.status;if(o>=200&&500>=o){var r="";switch(t){case"text":r=e.responseText;break;case"json":r=JSON.parse(e.responseText);break;case"xml":r=e.responseXML}a(r)}else 0==o?n(e,"request time out"):n(e,e.status)}function n(e){var t=[];for(var a in e){var n=e[a];if(n.constructor==Array)for(var o=0,r=n.length;r>o;o++)t.push(a+"="+encodeURIComponent(n[o]));else t.push(a+"="+encodeURIComponent(n))}return t.join("&")}return t.ajax=function(t){var o={async:!0,type:"GET",data:null,url:"/",dataType:"json",cache:!1,timeout:5e3,success:function(){},error:function(){}},t=e.extend(o,t);t.type=t.type.toUpperCase(),t.data&&"object"==typeof data&&(t.data=n(t.data)),"GET"==t.type&&t.data&&(t.url+=(-1==t.url.indexOf("?")?"?":"&")+t.data,t.data=null);var r,s=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),u=!1;t.timeout>0&&(r=setTimeout(function(){u=!0},t.timeout)),s.onreadystatechange=function(){4!=s.readyState||u||(a(s,t.dataType,t.success,t.error),clearTimeout(r))},s.open(t.type,t.url,t.async),"POST"==t.type&&s.setRequestHeader("Content-type","application/x-www-form-urlencoded;"),s.send(t.data)},t}(e)});