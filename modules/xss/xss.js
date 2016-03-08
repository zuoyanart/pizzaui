define("xss",function(t){!function e(r,i,n){function o(s,l){if(!i[s]){if(!r[s]){var c="function"==typeof t&&t;if(!l&&c)return c(s,!0);if(a)return a(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var f=i[s]={exports:{}};r[s][0].call(f.exports,function(t){var e=r[s][1][t];return o(e?e:t)},f,f.exports,e,r,i,n)}return i[s].exports}for(var a="function"==typeof t&&t,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(t,e,r){function i(){}function n(){}function o(){}function a(){}function s(t){return t.replace(T,"&lt;").replace(I,"&gt;")}function l(t,e,r,i){if(i=i||A,r=d(r),"href"===e||"src"===e){if(r=y.trim(r),"#"===r)return"#";if("http://"!==r.substr(0,7)&&"https://"!==r.substr(0,8)&&"mailto:"!==r.substr(0,7)&&"/"!==r[0])return""}else if("background"===e){if(E.lastIndex=0,E.test(r))return""}else if("style"===e){if(j.lastIndex=0,j.test(r))return"";if(F.lastIndex=0,F.test(r)&&(E.lastIndex=0,E.test(r)))return"";r=i.process(r)}return r=m(r)}function c(t){return t.replace(S,"&quot;")}function u(t){return t.replace(C,'"')}function f(t){return t.replace(O,function(t,e){return String.fromCharCode("x"===e[0]||"X"===e[0]?parseInt(e.substr(1),16):parseInt(e,10))})}function g(t){return t.replace(z,":").replace(L," ")}function p(t){for(var e="",r=0,i=t.length;i>r;r++)e+=t.charCodeAt(r)<32?" ":t.charAt(r);return y.trim(e)}function d(t){return t=u(t),t=f(t),t=g(t),t=p(t)}function m(t){return t=c(t),t=s(t)}function h(){return""}function b(t,e){function r(e){return i?!0:-1!==y.indexOf(t,e)}"function"!=typeof e&&(e=function(){});var i=!Array.isArray(t),n=[],o=!1;return{onIgnoreTag:function(t,i,a){if(r(t)){if(a.isClosing){var s="[/removed]",l=a.position+s.length;return n.push([o!==!1?o:a.position,l]),o=!1,s}return o||(o=a.position),"[removed]"}return e(t,i,a)},remove:function(t){var e="",r=0;return y.forEach(n,function(i){e+=t.slice(r,i[0]),r=i[1]}),e+=t.slice(r)}}}function v(t){return t.replace(B,"")}function x(t){var e=t.split("");return e=e.filter(function(t){var e=t.charCodeAt(0);return 127===e?!1:31>=e?10===e||13===e?!0:!1:!0}),e.join("")}var w=t("cssfilter").FilterCSS,y=t("./util"),k={a:["target","href","title"],abbr:["title"],address:[],area:["shape","coords","href","alt"],article:[],aside:[],audio:["autoplay","controls","loop","preload","src"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:[],dl:[],dt:[],em:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["src","alt","title","width","height"],ins:["datetime"],li:[],mark:[],nav:[],ol:[],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],sup:[],strong:[],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","colspan","align","valign"],tfoot:["align","valign"],th:["width","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],video:["autoplay","controls","loop","preload","src","height","width"]},A=new w,T=/</g,I=/>/g,S=/"/g,C=/&quot;/g,O=/&#([a-zA-Z0-9]*);?/gim,z=/&colon;?/gim,L=/&newline;?/gim,E=/((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi,j=/e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi,F=/u\s*r\s*l\s*\(.*/gi,B=/<!--[\s\S]*?-->/g;r.whiteList=k,r.onTag=i,r.onIgnoreTag=n,r.onTagAttr=o,r.onIgnoreTagAttr=a,r.safeAttrValue=l,r.escapeHtml=s,r.escapeQuote=c,r.unescapeQuote=u,r.escapeHtmlEntities=f,r.escapeDangerHtml5Entities=g,r.clearNonPrintableCharacter=p,r.friendlyAttrValue=d,r.escapeAttrValue=m,r.onIgnoreTagStripAll=h,r.StripTagBody=b,r.stripCommentTag=v,r.stripBlankChar=x,r.cssFilter=A},{"./util":4,cssfilter:8}],2:[function(t,e,r){function i(t,e){var r=new a(e);return r.process(t)}var n=t("./default"),o=t("./parser"),a=t("xss");r=e.exports=i,r.FilterXSS=a;for(var s in n)r[s]=n[s];for(var s in o)r[s]=o[s];"function"==typeof define&&define.amd&&define(function(){return e.exports}),"undefined"!=typeof window&&(window.filterXSS=e.exports)},{"./default":1,"./parser":3,"./xss":5}],3:[function(t,e,r){function i(t){var e=t.indexOf(" ");if(-1===e)var r=t.slice(1,-1);else var r=t.slice(1,e+1);return r=f.trim(r).toLowerCase(),"/"===r.slice(0,1)&&(r=r.slice(1)),"/"===r.slice(-1)&&(r=r.slice(0,-1)),r}function n(t){return"</"===t.slice(0,2)}function o(t,e,r){"user strict";var o="",a=0,s=!1,l=!1,c=0,u=t.length,f="",g="";for(c=0;u>c;c++){var p=t.charAt(c);if(s===!1){if("<"===p){s=c;continue}}else if(l===!1){if("<"===p){o+=r(t.slice(a,c)),s=c,a=c;continue}if(">"===p){o+=r(t.slice(a,s)),f=t.slice(s,c+1),g=i(f),o+=e(s,o.length,g,f,n(f)),a=c+1,s=!1;continue}if(('"'===p||"'"===p)&&"="===t.charAt(c-1)){l=p;continue}}else if(p===l){l=!1;continue}}return a<t.length&&(o+=r(t.substr(a))),o}function a(t,e){"user strict";function r(t,r){if(t=f.trim(t),t=t.replace(g,"").toLowerCase(),!(t.length<1)){var i=e(t,r||"");i&&n.push(i)}}for(var i=0,n=[],o=!1,a=t.length,c=0;a>c;c++){var p,d,m=t.charAt(c);if(o!==!1||"="!==m)if(o===!1||c!==i||'"'!==m&&"'"!==m||"="!==t.charAt(c-1))if(" "!==m);else{if(o===!1){if(d=s(t,c),-1===d){p=f.trim(t.slice(i,c)),r(p),o=!1,i=c+1;continue}c=d-1;continue}if(d=l(t,c-1),-1===d){p=f.trim(t.slice(i,c)),p=u(p),r(o,p),o=!1,i=c+1;continue}}else{if(d=t.indexOf(m,c+1),-1===d)break;p=f.trim(t.slice(i+1,d)),r(o,p),o=!1,c=d,i=c+1}else o=t.slice(i,c),i=c+1}return i<t.length&&(o===!1?r(t.slice(i)):r(o,u(f.trim(t.slice(i))))),f.trim(n.join(" "))}function s(t,e){for(;e<t.length;e++){var r=t[e];if(" "!==r)return"="===r?e:-1}}function l(t,e){for(;e>0;e--){var r=t[e];if(" "!==r)return"="===r?e:-1}}function c(t){return'"'===t[0]&&'"'===t[t.length-1]||"'"===t[0]&&"'"===t[t.length-1]?!0:!1}function u(t){return c(t)?t.substr(1,t.length-2):t}var f=t("./util"),g=/[^a-zA-Z0-9_:\.\-]/gim;r.parseTag=o,r.parseAttr=a},{"./util":4}],4:[function(t,e){e.exports={indexOf:function(t,e){var r,i;if(Array.prototype.indexOf)return t.indexOf(e);for(r=0,i=t.length;i>r;r++)if(t[r]===e)return r;return-1},forEach:function(t,e,r){var i,n;if(Array.prototype.forEach)return t.forEach(e,r);for(i=0,n=t.length;n>i;i++)e.call(r,t[i],i,t)},trim:function(t){return String.prototype.trim?t.trim():t.replace(/(^\s*)|(\s*$)/g,"")}}},{}],5:[function(t,e){function r(t){return void 0===t||null===t}function i(t){var e=t.indexOf(" ");if(-1===e)return{html:"",closing:"/"===t[t.length-2]};t=u.trim(t.slice(e+1,-1));var r="/"===t[t.length-1];return r&&(t=u.trim(t.slice(0,-1))),{html:t,closing:r}}function n(t){t=t||{},t.stripIgnoreTag&&(t.onIgnoreTag&&console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'),t.onIgnoreTag=a.onIgnoreTagStripAll),t.whiteList=t.whiteList||a.whiteList,t.onTag=t.onTag||a.onTag,t.onTagAttr=t.onTagAttr||a.onTagAttr,t.onIgnoreTag=t.onIgnoreTag||a.onIgnoreTag,t.onIgnoreTagAttr=t.onIgnoreTagAttr||a.onIgnoreTagAttr,t.safeAttrValue=t.safeAttrValue||a.safeAttrValue,t.escapeHtml=t.escapeHtml||a.escapeHtml,t.css=t.css||{},this.options=t,this.cssFilter=new o(t.css)}var o=t("cssfilter").FilterCSS,a=t("./default"),s=t("./parser"),l=s.parseTag,c=s.parseAttr,u=t("./util");n.prototype.process=function(t){if(t=t||"",t=t.toString(),!t)return"";var e=this,n=e.options,o=n.whiteList,s=n.onTag,f=n.onIgnoreTag,g=n.onTagAttr,p=n.onIgnoreTagAttr,d=n.safeAttrValue,m=n.escapeHtml,h=e.cssFilter;if(n.stripBlankChar&&(t=a.stripBlankChar(t)),n.allowCommentTag||(t=a.stripCommentTag(t)),n.stripIgnoreTagBody){var b=a.StripTagBody(n.stripIgnoreTagBody,f);f=b.onIgnoreTag}else b=!1;var v=l(t,function(t,e,n,a,l){var b={sourcePosition:t,position:e,isClosing:l,isWhite:n in o},v=s(n,a,b);if(!r(v))return v;if(b.isWhite){if(b.isClosing)return"</"+n+">";var x=i(a),w=o[n],y=c(x.html,function(t,e){var i=-1!==u.indexOf(w,t),o=g(n,t,e,i);if(!r(o))return o;if(i)return e=d(n,t,e,h),e?t+'="'+e+'"':t;var o=p(n,t,e,i);return r(o)?void 0:o}),a="<"+n;return y&&(a+=" "+y),x.closing&&(a+=" /"),a+=">"}var v=f(n,a,b);return r(v)?m(a):v},m);return b&&(v=b.remove(v)),v},e.exports=n},{"./default":1,"./parser":3,"./util":4,cssfilter:8}],6:[function(t,e){function r(t){return void 0===t||null===t}function i(t){t=t||{},t.whiteList=t.whiteList||n.whiteList,t.onAttr=t.onAttr||n.onAttr,t.onIgnoreAttr=t.onIgnoreAttr||n.onIgnoreAttr,this.options=t}{var n=t("./default"),o=t("./parser");t("./util")}i.prototype.process=function(t){if(t=t||"",t=t.toString(),!t)return"";var e=this,i=e.options,n=i.whiteList,a=i.onAttr,s=i.onIgnoreAttr,l=o(t,function(t,e,i,o,l){var c=n[i],u=!1;c===!0?u=c:"function"==typeof c?u=c(o):c instanceof RegExp&&(u=c.test(o)),u!==!0&&(u=!1);var f={position:e,sourcePosition:t,source:l,isWhite:u};if(u){var g=a(i,o,f);return r(g)?i+":"+o:g}var g=s(i,o,f);return r(g)?void 0:g});return l},e.exports=i},{"./default":7,"./parser":9,"./util":10}],7:[function(t,e,r){function i(){}function n(){}var o={};o["align-content"]=!1,o["align-items"]=!1,o["align-self"]=!1,o["alignment-adjust"]=!1,o["alignment-baseline"]=!1,o.all=!1,o["anchor-point"]=!1,o.animation=!1,o["animation-delay"]=!1,o["animation-direction"]=!1,o["animation-duration"]=!1,o["animation-fill-mode"]=!1,o["animation-iteration-count"]=!1,o["animation-name"]=!1,o["animation-play-state"]=!1,o["animation-timing-function"]=!1,o.azimuth=!1,o["backface-visibility"]=!1,o.background=!0,o["background-attachment"]=!0,o["background-clip"]=!0,o["background-color"]=!0,o["background-image"]=!0,o["background-origin"]=!0,o["background-position"]=!0,o["background-repeat"]=!0,o["background-size"]=!0,o["baseline-shift"]=!1,o.binding=!1,o.bleed=!1,o["bookmark-label"]=!1,o["bookmark-level"]=!1,o["bookmark-state"]=!1,o.border=!0,o["border-bottom"]=!0,o["border-bottom-color"]=!0,o["border-bottom-left-radius"]=!0,o["border-bottom-right-radius"]=!0,o["border-bottom-style"]=!0,o["border-bottom-width"]=!0,o["border-collapse"]=!0,o["border-color"]=!0,o["border-image"]=!0,o["border-image-outset"]=!0,o["border-image-repeat"]=!0,o["border-image-slice"]=!0,o["border-image-source"]=!0,o["border-image-width"]=!0,o["border-left"]=!0,o["border-left-color"]=!0,o["border-left-style"]=!0,o["border-left-width"]=!0,o["border-radius"]=!0,o["border-right"]=!0,o["border-right-color"]=!0,o["border-right-style"]=!0,o["border-right-width"]=!0,o["border-spacing"]=!0,o["border-style"]=!0,o["border-top"]=!0,o["border-top-color"]=!0,o["border-top-left-radius"]=!0,o["border-top-right-radius"]=!0,o["border-top-style"]=!0,o["border-top-width"]=!0,o["border-width"]=!0,o.bottom=!1,o["box-decoration-break"]=!0,o["box-shadow"]=!0,o["box-sizing"]=!0,o["box-snap"]=!0,o["box-suppress"]=!0,o["break-after"]=!0,o["break-before"]=!0,o["break-inside"]=!0,o["caption-side"]=!1,o.chains=!1,o.clear=!0,o.clip=!1,o["clip-path"]=!1,o["clip-rule"]=!1,o.color=!0,o["color-interpolation-filters"]=!0,o["column-count"]=!1,o["column-fill"]=!1,o["column-gap"]=!1,o["column-rule"]=!1,o["column-rule-color"]=!1,o["column-rule-style"]=!1,o["column-rule-width"]=!1,o["column-span"]=!1,o["column-width"]=!1,o.columns=!1,o.contain=!1,o.content=!1,o["counter-increment"]=!1,o["counter-reset"]=!1,o["counter-set"]=!1,o.crop=!1,o.cue=!1,o["cue-after"]=!1,o["cue-before"]=!1,o.cursor=!1,o.direction=!1,o.display=!0,o["display-inside"]=!0,o["display-list"]=!0,o["display-outside"]=!0,o["dominant-baseline"]=!1,o.elevation=!1,o["empty-cells"]=!1,o.filter=!1,o.flex=!1,o["flex-basis"]=!1,o["flex-direction"]=!1,o["flex-flow"]=!1,o["flex-grow"]=!1,o["flex-shrink"]=!1,o["flex-wrap"]=!1,o["float"]=!1,o["float-offset"]=!1,o["flood-color"]=!1,o["flood-opacity"]=!1,o["flow-from"]=!1,o["flow-into"]=!1,o.font=!0,o["font-family"]=!0,o["font-feature-settings"]=!0,o["font-kerning"]=!0,o["font-language-override"]=!0,o["font-size"]=!0,o["font-size-adjust"]=!0,o["font-stretch"]=!0,o["font-style"]=!0,o["font-synthesis"]=!0,o["font-variant"]=!0,o["font-variant-alternates"]=!0,o["font-variant-caps"]=!0,o["font-variant-east-asian"]=!0,o["font-variant-ligatures"]=!0,o["font-variant-numeric"]=!0,o["font-variant-position"]=!0,o["font-weight"]=!0,o.grid=!1,o["grid-area"]=!1,o["grid-auto-columns"]=!1,o["grid-auto-flow"]=!1,o["grid-auto-rows"]=!1,o["grid-column"]=!1,o["grid-column-end"]=!1,o["grid-column-start"]=!1,o["grid-row"]=!1,o["grid-row-end"]=!1,o["grid-row-start"]=!1,o["grid-template"]=!1,o["grid-template-areas"]=!1,o["grid-template-columns"]=!1,o["grid-template-rows"]=!1,o["hanging-punctuation"]=!1,o.height=!0,o.hyphens=!1,o.icon=!1,o["image-orientation"]=!1,o["image-resolution"]=!1,o["ime-mode"]=!1,o["initial-letters"]=!1,o["inline-box-align"]=!1,o["justify-content"]=!1,o["justify-items"]=!1,o["justify-self"]=!1,o.left=!1,o["letter-spacing"]=!0,o["lighting-color"]=!0,o["line-box-contain"]=!1,o["line-break"]=!1,o["line-grid"]=!1,o["line-height"]=!1,o["line-snap"]=!1,o["line-stacking"]=!1,o["line-stacking-ruby"]=!1,o["line-stacking-shift"]=!1,o["line-stacking-strategy"]=!1,o["list-style"]=!0,o["list-style-image"]=!0,o["list-style-position"]=!0,o["list-style-type"]=!0,o.margin=!0,o["margin-bottom"]=!0,o["margin-left"]=!0,o["margin-right"]=!0,o["margin-top"]=!0,o["marker-offset"]=!1,o["marker-side"]=!1,o.marks=!1,o.mask=!1,o["mask-box"]=!1,o["mask-box-outset"]=!1,o["mask-box-repeat"]=!1,o["mask-box-slice"]=!1,o["mask-box-source"]=!1,o["mask-box-width"]=!1,o["mask-clip"]=!1,o["mask-image"]=!1,o["mask-origin"]=!1,o["mask-position"]=!1,o["mask-repeat"]=!1,o["mask-size"]=!1,o["mask-source-type"]=!1,o["mask-type"]=!1,o["max-height"]=!0,o["max-lines"]=!1,o["max-width"]=!0,o["min-height"]=!0,o["min-width"]=!0,o["move-to"]=!1,o["nav-down"]=!1,o["nav-index"]=!1,o["nav-left"]=!1,o["nav-right"]=!1,o["nav-up"]=!1,o["object-fit"]=!1,o["object-position"]=!1,o.opacity=!1,o.order=!1,o.orphans=!1,o.outline=!1,o["outline-color"]=!1,o["outline-offset"]=!1,o["outline-style"]=!1,o["outline-width"]=!1,o.overflow=!1,o["overflow-wrap"]=!1,o["overflow-x"]=!1,o["overflow-y"]=!1,o.padding=!0,o["padding-bottom"]=!0,o["padding-left"]=!0,o["padding-right"]=!0,o["padding-top"]=!0,o.page=!1,o["page-break-after"]=!1,o["page-break-before"]=!1,o["page-break-inside"]=!1,o["page-policy"]=!1,o.pause=!1,o["pause-after"]=!1,o["pause-before"]=!1,o.perspective=!1,o["perspective-origin"]=!1,o.pitch=!1,o["pitch-range"]=!1,o["play-during"]=!1,o.position=!1,o["presentation-level"]=!1,o.quotes=!1,o["region-fragment"]=!1,o.resize=!1,o.rest=!1,o["rest-after"]=!1,o["rest-before"]=!1,o.richness=!1,o.right=!1,o.rotation=!1,o["rotation-point"]=!1,o["ruby-align"]=!1,o["ruby-merge"]=!1,o["ruby-position"]=!1,o["shape-image-threshold"]=!1,o["shape-outside"]=!1,o["shape-margin"]=!1,o.size=!1,o.speak=!1,o["speak-as"]=!1,o["speak-header"]=!1,o["speak-numeral"]=!1,o["speak-punctuation"]=!1,o["speech-rate"]=!1,o.stress=!1,o["string-set"]=!1,o["tab-size"]=!1,o["table-layout"]=!1,o["text-align"]=!0,o["text-align-last"]=!0,o["text-combine-upright"]=!0,o["text-decoration"]=!0,o["text-decoration-color"]=!0,o["text-decoration-line"]=!0,o["text-decoration-skip"]=!0,o["text-decoration-style"]=!0,o["text-emphasis"]=!0,o["text-emphasis-color"]=!0,o["text-emphasis-position"]=!0,o["text-emphasis-style"]=!0,o["text-height"]=!0,o["text-indent"]=!0,o["text-justify"]=!0,o["text-orientation"]=!0,o["text-overflow"]=!0,o["text-shadow"]=!0,o["text-space-collapse"]=!0,o["text-transform"]=!0,o["text-underline-position"]=!0,o["text-wrap"]=!0,o.top=!1,o.transform=!1,o["transform-origin"]=!1,o["transform-style"]=!1,o.transition=!1,o["transition-delay"]=!1,o["transition-duration"]=!1,o["transition-property"]=!1,o["transition-timing-function"]=!1,o["unicode-bidi"]=!1,o["vertical-align"]=!1,o.visibility=!1,o["voice-balance"]=!1,o["voice-duration"]=!1,o["voice-family"]=!1,o["voice-pitch"]=!1,o["voice-range"]=!1,o["voice-rate"]=!1,o["voice-stress"]=!1,o["voice-volume"]=!1,o.volume=!1,o["white-space"]=!1,o.widows=!1,o.width=!0,o["will-change"]=!1,o["word-break"]=!0,o["word-spacing"]=!0,o["word-wrap"]=!0,o["wrap-flow"]=!1,o["wrap-through"]=!1,o["writing-mode"]=!1,o["z-index"]=!1,r.whiteList=o,r.onAttr=i,r.onIgnoreAttr=n},{}],8:[function(t,e,r){function i(t,e){var r=new o(e);return r.process(t)}var n=t("./default"),o=t("./css");r=e.exports=i,r.FilterCSS=o;for(var a in n)r[a]=n[a];"function"==typeof define&&define.amd&&define(function(){return e.exports}),"undefined"!=typeof window&&(window.filterCSS=e.exports)},{"./css":6,"./default":7}],9:[function(t,e){function r(t,e){function r(){if(!o){var r=i.trim(t.slice(a,s)),n=r.indexOf(":");if(-1!==n){var c=i.trim(r.slice(0,n)),u=i.trim(r.slice(n+1));if(c){var f=e(a,l.length,c,u,r);f&&(l+=f+"; ")}}}a=s+1}t=i.trimRight(t),";"!==t[t.length-1]&&(t+=";");for(var n=t.length,o=!1,a=0,s=0,l="";n>s;s++){var c=t[s];if("/"===c&&"*"===t[s+1]){var u=t.indexOf("*/",s+2);if(-1===u)break;s=u+1,a=s+1,o=!1}else"("===c?o=!0:")"===c?o=!1:";"===c?o||r():"\n"===c&&r()}return i.trim(l)}var i=t("./util");e.exports=r},{"./util":10}],10:[function(t,e){e.exports={indexOf:function(t,e){var r,i;if(Array.prototype.indexOf)return t.indexOf(e);for(r=0,i=t.length;i>r;r++)if(t[r]===e)return r;return-1},forEach:function(t,e,r){var i,n;if(Array.prototype.forEach)return t.forEach(e,r);for(i=0,n=t.length;n>i;i++)e.call(r,t[i],i,t)},trim:function(t){return String.prototype.trim?t.trim():t.replace(/(^\s*)|(\s*$)/g,"")},trimRight:function(t){return String.prototype.trimRight?t.trimRight():t.replace(/(\s*$)/g,"")}}},{}]},{},[2])});