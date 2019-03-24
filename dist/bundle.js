!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.FontColor=e():t.FontColor=e()}(window,function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=0)}([function(t,e,n){function o(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function a(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}n(1).toString();var s={colors:["#009900","#990000","#000099","#000000"],columnsCount:4,colorButton:{width:24,height:24,spacingX:8,spacingY:8,borderRadius:"100%"},debug:!1,iconColor:"#009900"},c=function(){function t(e){var n=e.api,o=e.config;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.api=n,this.button=void 0,this.config=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){r(t,e,n[e])})}return t}({},s,{config:o}),this.color="inherit",this.createColorClasses(),this.debug=this.config.debug,this.panel=void 0,this.range=void 0,this.tag="SPAN",this.iconClasses={base:this.api.styles.inlineToolButton,active:this.api.styles.inlineToolButtonActive}}return a(t,null,[{key:"classFor",value:function(e){return[t.inlineBlockClass,e.replace("#","hash")].join("_")}},{key:"isInline",get:function(){return!0}},{key:"colorButtonClass",get:function(){return"cdx-font-color__color-button"}},{key:"noColorButtonClass",get:function(){return"cdx-font-color__color-button_no-color"}},{key:"inlineBlockClass",get:function(){return"cdx-font-color"}},{key:"iconClass",get:function(){return"cdx-font-color__icon"}},{key:"panelBaseClass",get:function(){return t.inlineBlockClass+"__panel"}},{key:"panelHiddenClass",get:function(){return t.panelBaseClass+"_hidden"}},{key:"stylesDataAttributeColorSeparator",get:function(){return";"}},{key:"stylesDataAttribute",get:function(){return"data-editorjs_font_color_plugin"}},{key:"sanitize",get:function(){return{span:{class:!0,"data-color":!0}}}}]),a(t,[{key:"clear",value:function(){this.hidePanel()}},{key:"createColorButton",value:function(e){var n=this,o=document.createElement("button");return o.classList.add(t.colorButtonClass),e||o.classList.add(t.noColorButtonClass),o.style.backgroundColor=e||"transparent",o.style.width=this.config.colorButton.width+"px",o.style.height=this.config.colorButton.height+"px",o.style.marginBottom=this.config.colorButton.spacingY+"px",o.style.marginRight=this.config.colorButton.spacingX+"px",o.style.borderRadius=this.config.colorButton.borderRadius,o.addEventListener("click",function(){return n.handleColorButtonClick(e)}),o}},{key:"createColorClasses",value:function(){var e=document.head.getElementsByTagName("style"),n=[].filter.call(e,function(e){return e.hasAttribute(t.stylesDataAttribute)}).map(function(e){return e.getAttribute(t.stylesDataAttribute).split(t.stylesDataAttributeColorSeparator)}).flat(),o=this.config.colors.filter(function(t){return-1===n.indexOf(t)}).map(function(e){return".".concat(t.classFor(e),"{color:").concat(e,"}")}).join("").trim();if(o){var r=document.createElement("style");r.type="text/css",r.innerHTML=o;var i=this.config.colors.join(t.stylesDataAttributeColorSeparator);r.setAttribute(t.stylesDataAttribute,i),document.head.appendChild(r)}}},{key:"handleColorButtonClick",value:function(e){if(this.debug&&console.log("clicked on color: ",e),this.color=e||"inherit",this.range){var n=this.api.selection.findParentTag(this.tag,t.inlineBlockClass);this.debug&&console.log("termWrapper: ",n),n&&this.unwrap(n),e&&this.wrap(this.range)}else this.debug&&console.warn("Color applied without range: ",this.range)}},{key:"hidePanel",value:function(){this.panel.classList.toggle(t.panelHiddenClass,!0)}},{key:"render",value:function(){var e=this;this.button=document.createElement("button"),this.button.type="button",this.button.classList.add(this.iconClasses.base);var n=document.createElement("b");return n.append("a"),n.style.color=this.config.iconColor,n.classList.add(t.iconClass),this.button.appendChild(n),this.button.addEventListener("click",function(){return e.panel.classList.toggle(t.panelHiddenClass)}),setTimeout(function(){[].filter.call(e.button.parentElement.children,function(t){return e.button!==t}).forEach(function(t){return t.addEventListener("click",function(){return e.hidePanel()})})},50),this.button}},{key:"renderActions",value:function(){var e,n=this;this.panel=document.createElement("div");var r=this.config.colors.map(function(t){return n.createColorButton(t)}),i=[this.createColorButton()].concat(o(r));return this.panel.classList.add(t.panelBaseClass,t.panelHiddenClass),this.panel.style.width=this.config.columnsCount*(this.config.colorButton.width+this.config.colorButton.spacingX)+this.config.colorButton.spacingX+"px",this.panel.style.paddingLeft=this.config.colorButton.spacingX+"px",this.panel.style.paddingTop=this.config.colorButton.spacingY+"px",(e=this.panel).append.apply(e,o(i)),this.panel.tabIndex=0,this.panel}},{key:"showPanel",value:function(){this.panel.classList.toggle(t.panelHiddenClass,!1)}},{key:"surround",value:function(t){this.debug&&console.log("surround: ",t),this.range=t}},{key:"wrap",value:function(e){var n=document.createElement(this.tag);n.classList.add(t.inlineBlockClass,t.classFor(this.color)),n.setAttribute("data-color",this.color),n.appendChild(e.extractContents()),e.insertNode(n),this.api.selection.expandToTag(n)}},{key:"unwrap",value:function(t){this.api.selection.expandToTag(t);var e=window.getSelection();this.range=e.getRangeAt(0);var n=this.range.extractContents();t.remove(),this.range.insertNode(n),e.removeAllRanges(),e.addRange(this.range)}},{key:"checkState",value:function(){var e=this.api.selection.findParentTag(this.tag,t.inlineBlockClass);this.button.classList.toggle(this.iconClasses.active,!!e)}}]),t}();t.exports=c},function(t,e,n){var o=n(2);"string"==typeof o&&(o=[[t.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(4)(o,r);o.locals&&(t.exports=o.locals)},function(t,e,n){(t.exports=n(3)(!1)).push([t.i,".cdx-font-color__container {\n  position: relative;\n}\n.cdx-font-color__color-button {\n  border: 1px solid #abcdef;\n  box-shadow: 0 1px 1px #091215;\n  cursor: pointer;\n}\n.cdx-font-color__color-button_no-color {\n  position: relative;\n}\n.cdx-font-color__color-button_no-color::before, .cdx-font-color__color-button_no-color::after {\n  position: absolute;\n  left: calc(50% - 1px);\n  top: 0px;\n  content: ' ';\n  height: 23px;\n  width: 2px;\n  background-color: #abcdef;\n}\n.cdx-font-color__color-button_no-color::before {\n  transform: rotate(45deg);\n}\n.cdx-font-color__color-button_no-color::after {\n  transform: rotate(-45deg);\n}\n.cdx-font-color__icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  font-size: 24px;\n}\n.cdx-font-color__panel {\n  display: flex;\n  flex-wrap: wrap;\n  margin: 0 auto;\n  box-sizing: border-box;\n  outline: none;\n}\n.cdx-font-color__panel_hidden {\n  display: none;\n}\n\n",""])},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"==typeof btoa){var r=(a=o,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=o.sources.map(function(t){return"/*# sourceURL="+o.sourceRoot+t+" */"});return[n].concat(i).concat([r]).join("\n")}var a;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<t.length;r++){var a=t[r];"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(t,e,n){var o,r,i={},a=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=o.apply(this,arguments)),r}),s=function(t){var e={};return function(t){if("function"==typeof t)return t();if(void 0===e[t]){var n=function(t){return document.querySelector(t)}.call(this,t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}}(),c=null,l=0,u=[],f=n(5);function d(t,e){for(var n=0;n<t.length;n++){var o=t[n],r=i[o.id];if(r){r.refs++;for(var a=0;a<r.parts.length;a++)r.parts[a](o.parts[a]);for(;a<o.parts.length;a++)r.parts.push(v(o.parts[a],e))}else{var s=[];for(a=0;a<o.parts.length;a++)s.push(v(o.parts[a],e));i[o.id]={id:o.id,refs:1,parts:s}}}}function p(t,e){for(var n=[],o={},r=0;r<t.length;r++){var i=t[r],a=e.base?i[0]+e.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};o[a]?o[a].parts.push(s):n.push(o[a]={id:a,parts:[s]})}return n}function h(t,e){var n=s(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=u[u.length-1];if("top"===t.insertAt)o?o.nextSibling?n.insertBefore(e,o.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),u.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=s(t.insertInto+" "+t.insertAt.before);n.insertBefore(e,r)}}function g(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=u.indexOf(t);e>=0&&u.splice(e,1)}function b(t){var e=document.createElement("style");return void 0===t.attrs.type&&(t.attrs.type="text/css"),y(e,t.attrs),h(t,e),e}function y(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function v(t,e){var n,o,r,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var a=l++;n=c||(c=b(e)),o=C.bind(null,n,a,!1),r=C.bind(null,n,a,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",y(e,t.attrs),h(t,e),e}(e),o=function(t,e,n){var o=n.css,r=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&r;(e.convertToAbsoluteUrls||i)&&(o=f(o));r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,n,e),r=function(){g(n),n.href&&URL.revokeObjectURL(n.href)}):(n=b(e),o=function(t,e){var n=e.css,o=e.media;o&&t.setAttribute("media",o);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),r=function(){g(n)});return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else r()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=p(t,e);return d(n,e),function(t){for(var o=[],r=0;r<n.length;r++){var a=n[r];(s=i[a.id]).refs--,o.push(s)}t&&d(p(t,e),e);for(r=0;r<o.length;r++){var s;if(0===(s=o[r]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete i[s.id]}}}};var m,x=(m=[],function(t,e){return m[t]=e,m.filter(Boolean).join("\n")});function C(t,e,n,o){var r=n?"":o.css;if(t.styleSheet)t.styleSheet.cssText=x(e,r);else{var i=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(i,a[e]):t.appendChild(i)}}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,o=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var r,i=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(r=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:o+i.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}}])});