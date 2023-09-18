/*!
 * mdui 1.0.2 (https://mdui.org)
 * Copyright 2016-2021 zdhxiong
 * Licensed under MIT
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).mdui=e()}(this,(function(){"use strict";
/**
   * @this {Promise}
   */
function t(t){var e=this.constructor;return this.then((function(n){
// @ts-ignore
return e.resolve(t()).then((function(){return n}))}),(function(n){
// @ts-ignore
return e.resolve(t()).then((function(){
// @ts-ignore
return e.reject(n)}))}))}function e(t){return new this((function(e,n){if(!t||void 0===t.length)return n(new TypeError(typeof t+" "+t+" is not iterable(cannot read property Symbol(Symbol.iterator))"));var i=Array.prototype.slice.call(t);if(0===i.length)return e([]);var o=i.length;function s(t,n){if(n&&("object"==typeof n||"function"==typeof n)){var r=n.then;if("function"==typeof r)return void r.call(n,(function(e){s(t,e)}),(function(n){i[t]={status:"rejected",reason:n},0==--o&&e(i)}))}i[t]={status:"fulfilled",value:n},0==--o&&e(i)}for(var r=0;r<i.length;r++)s(r,i[r])}))}
// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
!function(){try{return new MouseEvent("test")}catch(t){}var t=function(t,e){e=e||{bubbles:!1,cancelable:!1};var n=document.createEvent("MouseEvent");return n.initMouseEvent(t,e.bubbles,e.cancelable,window,0,e.screenX||0,e.screenY||0,e.clientX||0,e.clientY||0,e.ctrlKey||!1,e.altKey||!1,e.shiftKey||!1,e.metaKey||!1,e.button||0,e.relatedTarget||null),n};t.prototype=Event.prototype,window.MouseEvent=t}(),function(){function t(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}"function"!=typeof window.CustomEvent&&(t.prototype=window.Event.prototype,window.CustomEvent=t)}();var n=setTimeout;function i(t){return Boolean(t&&void 0!==t.length)}function o(){}
// Polyfill for Function.prototype.bind
/**
   * @constructor
   * @param {Function} fn
   */
function s(t){if(!(this instanceof s))throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");
/** @type {!number} */this._state=0,
/** @type {!boolean} */
this._handled=!1,
/** @type {Promise|undefined} */
this._value=void 0,
/** @type {!Array<!Function>} */
this._deferreds=[],d(t,this)}function r(t,e){for(;3===t._state;)t=t._value;0!==t._state?(t._handled=!0,s._immediateFn((function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null!==n){var i;try{i=n(t._value)}catch(t){return void u(e.promise,t)}a(e.promise,i)}else(1===t._state?a:u)(e.promise,t._value)}))):t._deferreds.push(e)}function a(t,e){try{
// Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof s)return t._state=3,t._value=e,void c(t);if("function"==typeof n)return void d((i=n,o=e,function(){i.apply(o,arguments)}),t)}t._state=1,t._value=e,c(t)}catch(e){u(t,e)}var i,o}function u(t,e){t._state=2,t._value=e,c(t)}function c(t){2===t._state&&0===t._deferreds.length&&s._immediateFn((function(){t._handled||s._unhandledRejectionFn(t._value)}));for(var e=0,n=t._deferreds.length;e<n;e++)r(t,t._deferreds[e]);t._deferreds=null}
/**
   * @constructor
   */function l(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}
/**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */function d(t,e){var n=!1;try{t((function(t){n||(n=!0,a(e,t))}),(function(t){n||(n=!0,u(e,t))}))}catch(t){if(n)return;n=!0,u(e,t)}}s.prototype.catch=function(t){return this.then(null,t)},s.prototype.then=function(t,e){
// @ts-ignore
var n=new this.constructor(o);return r(this,new l(t,e,n)),n},s.prototype.finally=t,s.all=function(t){return new s((function(e,n){if(!i(t))return n(new TypeError("Promise.all accepts an array"));var o=Array.prototype.slice.call(t);if(0===o.length)return e([]);var s=o.length;function r(t,i){try{if(i&&("object"==typeof i||"function"==typeof i)){var a=i.then;if("function"==typeof a)return void a.call(i,(function(e){r(t,e)}),n)}o[t]=i,0==--s&&e(o)}catch(t){n(t)}}for(var a=0;a<o.length;a++)r(a,o[a])}))},s.allSettled=e,s.resolve=function(t){return t&&"object"==typeof t&&t.constructor===s?t:new s((function(e){e(t)}))},s.reject=function(t){return new s((function(e,n){n(t)}))},s.race=function(t){return new s((function(e,n){if(!i(t))return n(new TypeError("Promise.race accepts an array"));for(var o=0,r=t.length;o<r;o++)s.resolve(t[o]).then(e,n)}))},
// Use polyfill for setImmediate for performance gains
s._immediateFn=
// @ts-ignore
"function"==typeof setImmediate&&function(t){
// @ts-ignore
setImmediate(t)}||function(t){n(t,0)},s._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)};
/** @suppress {undefinedVars} */
var h=function(){
// the only reliable means to get the global object is
// `Function('return this')()`
// However, this causes CSP violations in Chrome apps.
if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("unable to locate global object")}();
// Expose the polyfill if Promise is undefined or set to a
// non-function value. The latter can be due to a named HTMLElement
// being exposed by browsers for legacy reasons.
// https://github.com/taylorhakes/promise-polyfill/issues/114
function f(t){return"function"==typeof t}function p(t){return"string"==typeof t}function m(t){return"number"==typeof t}function v(t){return void 0===t}function g(t){return null===t}function y(t){return t instanceof Window}function b(t){return t instanceof Document}function x(t){return t instanceof Element}function C(t){return!f(t)&&!y(t)&&m(t.length)}function w(t){return"object"==typeof t&&null!==t}function $(t){return b(t)?t.documentElement:t}
/**
   * 把用 - 分隔的字符串转为驼峰（如 box-sizing 转换为 boxSizing）
   * @param string
   */function E(t){return t.replace(/^-ms-/,"ms-").replace(/-([a-z])/g,(function(t,e){return e.toUpperCase()}))}
/**
   * 把驼峰法转为用 - 分隔的字符串（如 boxSizing 转换为 box-sizing）
   * @param string
   */function O(t){return t.replace(/[A-Z]/g,(function(t){return"-"+t.toLowerCase()}))}
/**
   * 获取元素的样式值
   * @param element
   * @param name
   */function k(t,e){return window.getComputedStyle(t).getPropertyValue(O(e))}
/**
   * 检查元素的 box-sizing 是否是 border-box
   * @param element
   */function _(t){return"border-box"===k(t,"box-sizing")}
/**
   * 获取元素的 padding, border, margin 宽度（两侧宽度的和，单位为px）
   * @param element
   * @param direction
   * @param extra
   */function T(t,e,n){var i="width"===e?["Left","Right"]:["Top","Bottom"];return[0,1].reduce((function(e,o,s){var r=n+i[s];return"border"===n&&(r+="Width"),e+parseFloat(k(t,r)||"0")}),0)}
/**
   * 获取元素的样式值，对 width 和 height 进行过处理
   * @param element
   * @param name
   */function I(t,e){
// width、height 属性使用 getComputedStyle 得到的值不准确，需要使用 getBoundingClientRect 获取
if("width"===e||"height"===e){var n=t.getBoundingClientRect()[e];return _(t)?n+"px":n-T(t,e,"border")-T(t,e,"padding")+"px"}return k(t,e)}
/**
   * 获取子节点组成的数组
   * @param target
   * @param parent
   */function S(t,e){var n=document.createElement(e);return n.innerHTML=t,[].slice.call(n.childNodes)}
/**
   * 始终返回 false 的函数
   */function j(){return!1}
/**
   * 数值单位的 CSS 属性
   */"function"!=typeof h.Promise?h.Promise=s:h.Promise.prototype.finally?h.Promise.allSettled||(h.Promise.allSettled=e):h.Promise.prototype.finally=t;var M=["animationIterationCount","columnCount","fillOpacity","flexGrow","flexShrink","fontWeight","gridArea","gridColumn","gridColumnEnd","gridColumnStart","gridRow","gridRowEnd","gridRowStart","lineHeight","opacity","order","orphans","widows","zIndex","zoom"];function A(t,e){if(C(t)){for(var n=0;n<t.length;n+=1)if(!1===e.call(t[n],n,t[n]))return t}else for(var i=Object.keys(t),o=0;o<i.length;o+=1)if(!1===e.call(t[i[o]],i[o],t[i[o]]))return t;return t}
/**
   * 为了使用模块扩充，这里不能使用默认导出
   */var D=function(t){var e=this;return this.length=0,t?(A(t,(function(t,n){
// @ts-ignore
e[t]=n})),this.length=t.length,this):this};var R=function(){var t=function(e){if(!e)return new D;
// JQ
if(e instanceof D)return e;
// function
if(f(e))return/complete|loaded|interactive/.test(document.readyState)&&document.body?e.call(document,t):document.addEventListener("DOMContentLoaded",(function(){return e.call(document,t)}),!1),new D([document]);
// String
if(p(e)){var n=e.trim();
// 根据 HTML 字符串创建 JQ 对象
if("<"===n[0]&&">"===n[n.length-1]){var i="div";return A({li:"ul",tr:"tbody",td:"tr",th:"tr",tbody:"table",option:"select"},(function(t,e){if(0===n.indexOf("<"+t))return i=e,!1})),new D(S(n,i))}
// 根据 CSS 选择器创建 JQ 对象
if(!("#"===e[0]&&!e.match(/[ .<>:~]/)))return new D(document.querySelectorAll(e));var o=document.getElementById(e.slice(1));return o?new D([o]):new D}return!C(e)||e instanceof Node?new D([e]):new D(e)};return t.fn=D.prototype,t}();
// 避免页面加载完后直接执行css动画
// https://css-tricks.com/transitions-only-after-page-load/
setTimeout((function(){return R("body").addClass("mdui-loaded")}));var H={$:R};
/**
   * 检查 container 元素内是否包含 contains 元素
   * @param container 父元素
   * @param contains 子元素
   * @example
  ```js
  contains( document, document.body ); // true
  contains( document.getElementById('test'), document ); // false
  contains( $('.container').get(0), $('.contains').get(0) ); // false
  ```
   */
function L(t,e){return t!==e&&$(t).contains(e)}
/**
   * 把第二个数组的元素追加到第一个数组中，并返回合并后的数组
   * @param first 第一个数组
   * @param second 该数组的元素将被追加到第一个数组中
   * @example
  ```js
  merge( [ 0, 1, 2 ], [ 2, 3, 4 ] )
  // [ 0, 1, 2, 2, 3, 4 ]
  ```
   */function B(t,e){return A(e,(function(e,n){t.push(n)})),t}R.fn.each=function(t){return A(this,t)},R.fn.get=function(t){return void 0===t?[].slice.call(this):this[t>=0?t:t+this.length]},R.fn.find=function(t){var e=[];return this.each((function(n,i){B(e,R(i.querySelectorAll(t)).get())})),new D(e)};
// 存储事件
var P={},N=1;
// 元素ID
/**
   * 为元素赋予一个唯一的ID
   */
function z(t){var e="_mduiEventId";
// @ts-ignore
// @ts-ignore
return t[e]||(
// @ts-ignore
t[e]=++N),t[e]}
/**
   * 解析事件名中的命名空间
   */function F(t){var e=t.split(".");return{type:e[0],ns:e.slice(1).sort().join(" ")}}
/**
   * 命名空间匹配规则
   */function q(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}
/**
   * 获取匹配的事件
   * @param element
   * @param type
   * @param func
   * @param selector
   */
/**
   * 移除事件监听
   * @param element
   * @param types
   * @param func
   * @param selector
   */
function W(t,e,n,i){var o=P[z(t)]||[],s=function(e){delete o[e.id],t.removeEventListener(e.type,e.proxy,!1)};e?e.split(" ").forEach((function(e){e&&function(t,e,n,i){var o=F(e);return(P[z(t)]||[]).filter((function(t){return t&&(!o.type||t.type===o.type)&&(!o.ns||q(o.ns).test(t.ns))&&(!n||z(t.func)===z(n))&&(!i||t.selector===i)}))}
/**
   * 添加事件监听
   * @param element
   * @param types
   * @param func
   * @param data
   * @param selector
   */(t,e,n,i).forEach((function(t){return s(t)}))})):o.forEach((function(t){return s(t)}))}function Y(t,e){for(var n=[],i=arguments.length-2;i-- >0;)n[i]=arguments[i+2];return n.unshift(e),A(n,(function(e,n){A(n,(function(e,n){v(n)||(t[e]=n)}))})),t}
/**
   * 将数组或对象序列化，序列化后的字符串可作为 URL 查询字符串使用
   *
   * 若传入数组，则格式必须和 serializeArray 方法的返回值一样
   * @param obj 对象或数组
   * @example
  ```js
  param({ width: 1680, height: 1050 });
  // width=1680&height=1050
  ```
   * @example
  ```js
  param({ foo: { one: 1, two: 2 }})
  // foo[one]=1&foo[two]=2
  ```
   * @example
  ```js
  param({ids: [1, 2, 3]})
  // ids[]=1&ids[]=2&ids[]=3
  ```
   * @example
  ```js
  param([
    {"name":"name","value":"mdui"},
    {"name":"password","value":"123456"}
  ])
  // name=mdui&password=123456
  ```
   */function U(t){if(!w(t)&&!Array.isArray(t))return"";var e=[];function n(t,i){var o;w(i)?A(i,(function(e,s){o=Array.isArray(i)&&!w(s)?"":e,n(t+"["+o+"]",s)})):(o=null==i||""===i?"=":"="+encodeURIComponent(i),e.push(encodeURIComponent(t)+o))}return Array.isArray(t)?A(t,(function(){n(this.name,this.value)})):A(t,n),e.join("&")}
// 全局配置参数
R.fn.trigger=function(t,e){var n,i=F(t),o={bubbles:!0,cancelable:!0};return["click","mousedown","mouseup","mousemove"].indexOf(i.type)>-1?
// Note: MouseEvent 无法传入 detail 参数
n=new MouseEvent(i.type,o):(o.detail=e,n=new CustomEvent(i.type,o)),
// @ts-ignore
n._detail=e,
// @ts-ignore
n._ns=i.ns,this.each((function(){this.dispatchEvent(n)}))};var X={},V={ajaxStart:"start.mdui.ajax",ajaxSuccess:"success.mdui.ajax",ajaxError:"error.mdui.ajax",ajaxComplete:"complete.mdui.ajax"};
// 全局事件名
/**
   * 判断此请求方法是否通过查询字符串提交参数
   * @param method 请求方法，大写
   */
function J(t){return["GET","HEAD"].indexOf(t)>=0}
/**
   * 添加参数到 URL 上，且 URL 中不存在 ? 时，自动把第一个 & 替换为 ?
   * @param url
   * @param query
   */function K(t,e){return(t+"&"+e).replace(/[&?]{1,2}/,"?")}
/**
   * 合并请求参数，参数优先级：options > globalOptions > defaults
   * @param options
   */R.ajax=
/**
   * 发送 ajax 请求
   * @param options
   * @example
  ```js
  ajax({
    method: "POST",
    url: "some.php",
    data: { name: "John", location: "Boston" }
  }).then(function( msg ) {
    alert( "Data Saved: " + msg );
  });
  ```
   */
function(t){
// 是否已取消请求
var e,n=!1,i={},o=function(t){
// 默认参数
var e={url:"",method:"GET",data:"",processData:!0,async:!0,cache:!0,username:"",password:"",headers:{},xhrFields:{},statusCode:{},dataType:"text",contentType:"application/x-www-form-urlencoded",timeout:0,global:!0};
// globalOptions 中的回调函数不合并
return A(X,(function(t,n){
// @ts-ignore
["beforeSend","success","error","complete","statusCode"].indexOf(t)<0&&!v(n)&&(e[t]=n)})),Y({},e,t)}(t),s=o.url||window.location.toString(),r=o.method.toUpperCase(),a=o.data,u=o.processData,c=o.async,l=o.cache,d=o.username,h=o.password,f=o.headers,m=o.xhrFields,g=o.statusCode,y=o.dataType,b=o.contentType,x=o.timeout,C=o.global;
// 事件参数
/**
       * 触发事件和回调函数
       * @param event
       * @param params
       * @param callback
       * @param args
       */
function w(t,e,i){for(var s,r,a=[],u=arguments.length-3;u-- >0;)a[u]=arguments[u+3];
// 触发全局事件
C&&R(document).trigger(t,e),i&&(
// 全局回调
i in X&&(
// @ts-ignore
s=X[i].apply(X,a)),
// 自定义回调
o[i]&&(
// @ts-ignore
r=o[i].apply(o,a)),
// beforeSend 回调返回 false 时取消 ajax 请求
"beforeSend"!==i||!1!==s&&!1!==r||(n=!0));
// 触发 ajax 回调和事件
}
// XMLHttpRequest 请求
// 需要发送的数据
// GET/HEAD 请求和 processData 为 true 时，转换为查询字符串格式，特殊格式不转换
return!a||!J(r)&&!u||p(a)||a instanceof ArrayBuffer||a instanceof Blob||a instanceof Document||a instanceof FormData||(a=U(a)),
// 对于 GET、HEAD 类型的请求，把 data 数据添加到 URL 中
a&&J(r)&&(
// 查询字符串拼接到 URL 中
s=K(s,a),a=null),new Promise((function(t,u){
// GET/HEAD 请求的缓存处理
J(r)&&!l&&(s=K(s,"_="+Date.now()));
// 创建 XHR
var p,C=new XMLHttpRequest;C.open(r,s,c,d,h),(b||a&&!J(r)&&!1!==b)&&C.setRequestHeader("Content-Type",b),
// 设置 Accept
"json"===y&&C.setRequestHeader("Accept","application/json, text/javascript"),
// 添加 headers
f&&A(f,(function(t,e){
// undefined 值不发送，string 和 null 需要发送
v(e)||C.setRequestHeader(t,e+"")})),/^([\w-]+:)?\/\/([^/]+)/.test(s)&&RegExp.$2!==window.location.host||C.setRequestHeader("X-Requested-With","XMLHttpRequest"),m&&A(m,(function(t,e){
// @ts-ignore
C[t]=e})),i.xhr=C,i.options=o,C.onload=function(){p&&clearTimeout(p);
// AJAX 返回的 HTTP 响应码是否表示成功
var n,o=C.status>=200&&C.status<300||304===C.status||0===C.status;if(o)if(e=204===C.status||"HEAD"===r?"nocontent":304===C.status?"notmodified":"success","json"===y){try{n="HEAD"===r?void 0:JSON.parse(C.responseText),i.data=n}catch(t){e="parsererror",w(V.ajaxError,i,"error",C,e),u(new Error(e))}"parsererror"!==e&&(w(V.ajaxSuccess,i,"success",n,e,C),t(n))}else n="HEAD"===r?void 0:"text"===C.responseType||""===C.responseType?C.responseText:C.response,i.data=n,w(V.ajaxSuccess,i,"success",n,e,C),t(n);else e="error",w(V.ajaxError,i,"error",C,e),u(new Error(e));
// statusCode
A([X.statusCode,g],(function(t,i){i&&i[C.status]&&(o?i[C.status](n,e,C):i[C.status](C,e))})),w(V.ajaxComplete,i,"complete",C,e)},C.onerror=function(){p&&clearTimeout(p),w(V.ajaxError,i,"error",C,C.statusText),w(V.ajaxComplete,i,"complete",C,"error"),u(new Error(C.statusText))},C.onabort=function(){var t="abort";p&&(t="timeout",clearTimeout(p)),w(V.ajaxError,i,"error",C,t),w(V.ajaxComplete,i,"complete",C,t),u(new Error(t))},
// ajax start 回调
w(V.ajaxStart,i,"beforeSend",C),n?u(new Error("cancel")):(
// Timeout
x>0&&(p=setTimeout((function(){C.abort()}),x)),
// 发送 XHR
C.send(a))}))},R.ajaxSetup=
/**
   * 为 Ajax 请求设置全局配置参数
   * @param options 键值对参数
   * @example
  ```js
  ajaxSetup({
    dataType: 'json',
    method: 'POST',
  });
  ```
   */
function(t){return Y(X,t)},R.contains=L;var G="_mduiElementDataStorage";
/**
   * 在元素上设置键值对数据
   * @param element
   * @param object
   */function Q(t,e){
// @ts-ignore
t[G]||(
// @ts-ignore
t[G]={}),A(e,(function(e,n){
// @ts-ignore
t[G][E(e)]=n}))}function Z(t,e,n){var i;
// 根据键值对设置值
// data(element, { 'key' : 'value' })
return w(e)?(Q(t,e),e):
// 根据 key、value 设置值
// data(element, 'key', 'value')
v(n)?
// 获取所有值
// data(element)
v(e)?t[G]?t[G]:{}:(
// 从 dataNS 中获取指定值
// data(element, 'key')
e=E(e),
// @ts-ignore
t[G]&&e in t[G]?t[G][e]:void 0):(Q(t,((i={})[e]=n,i)),n)}function tt(t,e){var n,i,o=[];return A(t,(function(t,n){null!=(i=e.call(window,n,t))&&o.push(i)})),(n=[]).concat.apply(n,o)}
/**
   * 移除指定元素上存放的数据
   * @param element 存放数据的元素
   * @param name
   * 数据键名
   *
   * 若未指定键名，将移除元素上所有数据
   *
   * 多个键名可以用空格分隔，或者用数组表示多个键名
    @example
  ```js
  // 移除元素上键名为 name 的数据
  removeData(document.body, 'name');
  ```
   * @example
  ```js
  // 移除元素上键名为 name1 和 name2 的数据
  removeData(document.body, 'name1 name2');
  ```
   * @example
  ```js
  // 移除元素上键名为 name1 和 name2 的数据
  removeData(document.body, ['name1', 'name2']);
  ```
   * @example
  ```js
  // 移除元素上所有数据
  removeData(document.body);
  ```
   */
function et(t,e){
// @ts-ignore
if(t[G]){var n=function(e){e=E(e),
// @ts-ignore
t[G][e]&&(
// @ts-ignore
t[G][e]=null,
// @ts-ignore
delete t[G][e])};v(e)?(
// @ts-ignore
t[G]=null,
// @ts-ignore
delete t[G]):p(e)?e.split(" ").filter((function(t){return t})).forEach((function(t){return n(t)})):A(e,(function(t,e){return n(e)}))}}
/**
   * 过滤掉数组中的重复元素
   * @param arr 数组
   * @example
  ```js
  unique([1, 2, 12, 3, 2, 1, 2, 1, 1]);
  // [1, 2, 12, 3]
  ```
   */
function nt(t){var e=[];return A(t,(function(t,n){-1===e.indexOf(n)&&e.push(n)})),e}function it(t,e,n,i,o){var s,r=[];return t.each((function(t,a){
// 不能包含最顶层的 document 元素
for(s=a[n];s&&x(s);){
// prevUntil, nextUntil, parentsUntil
if(2===e){if(i&&R(s).is(i))break;o&&!R(s).is(o)||r.push(s)}
// prev, next, parent
else{if(0===e){i&&!R(s).is(i)||r.push(s);break}
// prevAll, nextAll, parents
// @ts-ignore
i&&!R(s).is(i)||r.push(s)}s=s[n]}})),new D(nt(r))}R.data=Z,R.each=A,R.extend=function(){for(var t=this,e=[],n=arguments.length;n--;)e[n]=arguments[n];return 1===e.length?(A(e[0],(function(e,n){t[e]=n})),this):Y.apply(void 0,[e.shift(),e.shift()].concat(e))},R.map=tt,R.merge=B,R.param=U,R.removeData=et,R.unique=nt,R.fn.add=function(t){return new D(nt(B(this.get(),R(t).get())))},A(["add","remove","toggle"],(function(t,e){R.fn[e+"Class"]=function(t){return"remove"!==e||arguments.length?this.each((function(n,i){if(x(i)){var o=(f(t)?t.call(i,n,i.getAttribute("class")||""):t).split(" ").filter((function(t){return t}));A(o,(function(t,n){i.classList[e](n)}))}})):this.each((function(t,e){e.setAttribute("class","")}))}})),A(["insertBefore","insertAfter"],(function(t,e){R.fn[e]=function(e){var n=t?R(this.get().reverse()):this,i=R(e),o=[];// 顺序和 jQuery 保持一致
return i.each((function(e,i){i.parentNode&&n.each((function(n,s){var r=e?s.cloneNode(!0):s,a=t?i.nextSibling:i;o.push(r),i.parentNode.insertBefore(r,a)}))})),R(t?o.reverse():o)}})),A(["before","after"],(function(t,e){R.fn[e]=function(){for(var e=[],n=arguments.length;n--;)e[n]=arguments[n];
// after 方法，多个参数需要按参数顺序添加到元素后面，所以需要将参数顺序反向处理
return 1===t&&(e=e.reverse()),this.each((function(n,i){A(f(e[0])?[e[0].call(i,n,i.innerHTML)]:e,(function(e,o){(
/**
   * 是否不是 HTML 字符串（包裹在 <> 中）
   * @param target
   */
function(t){return p(t)&&("<"!==t[0]||">"!==t[t.length-1])}(o)?R(S(o,"div")):n&&x(o)?R(o.cloneNode(!0)):R(o))[t?"insertAfter":"insertBefore"](i)}))}))}})),R.fn.off=function(t,e,n){var i=this;
// types 是对象
return w(t)?(A(t,(function(t,n){
// this.off('click', undefined, function () {})
// this.off('click', '.box', function () {})
i.off(t,e,n)})),this):(
// selector 不存在
(!1===e||f(e))&&(n=e,e=void 0),
// callback 传入 `false`，相当于 `return false`
!1===n&&(n=j),this.each((function(){W(this,t,n,e)})))},R.fn.on=function(t,e,n,i,o){var s=this;
// types 可以是 type/func 对象
if(w(t))
// (types-Object, selector, data)
return p(e)||(
// (types-Object, data)
n=n||e,e=void 0),A(t,(function(t,i){
// selector 和 data 都可能是 undefined
// @ts-ignore
s.on(t,e,n,i,o)})),this;if(null==n&&null==i?(
// (types, fn)
i=e,n=e=void 0):null==i&&(p(e)?(
// (types, selector, fn)
i=n,n=void 0):(
// (types, data, fn)
i=n,n=e,e=void 0)),!1===i)i=j;else if(!i)return this;
// $().one()
if(o){
// eslint-disable-next-line @typescript-eslint/no-this-alias
var r=this,a=i;i=function(t){
// eslint-disable-next-line prefer-rest-params
return r.off(t.type,e,i),a.apply(this,arguments)}}return this.each((function(){!function(t,e,n,i,o){var s=z(t);P[s]||(P[s]=[]);
// 传入 data.useCapture 来设置 useCapture: true
var r=!1;w(i)&&i.useCapture&&(r=!0),e.split(" ").forEach((function(e){if(e){var a=F(e),u={type:a.type,ns:a.ns,func:n,selector:o,id:P[s].length,proxy:l};P[s].push(u),t.addEventListener(u.type,l,r)}function c(t,e){!1===n.apply(e,
// @ts-ignore
void 0===t._detail?[t]:[t].concat(t._detail))&&(t.preventDefault(),t.stopPropagation())}function l(e){
// @ts-ignore
e._ns&&!q(e._ns).test(a.ns)||(
// @ts-ignore
e._data=i,o?
// 事件代理
R(t).find(o).get().reverse().forEach((function(t){(t===e.target||L(t,e.target))&&c(e,t)})):
// 不使用事件代理
c(e,t))}}))}(this,t,i,n,e)}))},A(V,(function(t,e){R.fn[t]=function(t){return this.on(e,(function(e,n){t(e,n.xhr,n.options,n.data)}))}})),R.fn.map=function(t){return new D(tt(this,(function(e,n){return t.call(e,n,e)})))},R.fn.clone=function(){return this.map((function(){return this.cloneNode(!0)}))},R.fn.is=function(t){var e=!1;if(f(t))return this.each((function(n,i){t.call(i,n,i)&&(e=!0)})),e;if(p(t))return this.each((function(n,i){b(i)||y(i)||(i.matches||i.msMatchesSelector).call(i,t)&&(e=!0);
// @ts-ignore
})),e;var n=R(t);return this.each((function(t,i){n.each((function(t,n){i===n&&(e=!0)}))})),e},R.fn.remove=function(t){return this.each((function(e,n){!n.parentNode||t&&!R(n).is(t)||n.parentNode.removeChild(n)}))},A(["prepend","append"],(function(t,e){R.fn[e]=function(){for(var e=[],n=arguments.length;n--;)e[n]=arguments[n];return this.each((function(n,i){var o,s=i.childNodes,r=s.length,a=r?s[t?r-1:0]:document.createElement("div");r||i.appendChild(a);var u=f(e[0])?[e[0].call(i,n,i.innerHTML)]:e;
// 如果不是字符串，则仅第一个元素使用原始元素，其他的都克隆自第一个元素
n&&(u=u.map((function(t){return p(t)?t:R(t).clone()}))),(o=R(a))[t?"after":"before"].apply(o,u),r||i.removeChild(a)}))}})),A(["appendTo","prependTo"],(function(t,e){R.fn[e]=function(e){var n=[],i=R(e).map((function(e,i){var o=i.childNodes,s=o.length;if(s)return o[t?0:s-1];var r=document.createElement("div");return i.appendChild(r),n.push(r),r})),o=this[t?"insertBefore":"insertAfter"](i);return R(n).remove(),o}})),A(["attr","prop","css"],(function(t,e){function n(e,n){switch(t){
// attr
case 0:
// 属性不存在时，原生 getAttribute 方法返回 null，而 jquery 返回 undefined。这里和 jquery 保持一致
var i=e.getAttribute(n);return g(i)?void 0:i;
// prop
case 1:
// @ts-ignore
return e[n];
// css
default:return I(e,n)}}R.fn[e]=function(i,o){var s=this;if(w(i))return A(i,(function(t,n){
// @ts-ignore
s[e](t,n)})),this;if(1===arguments.length){var r=this[0];return x(r)?n(r,i):void 0}return this.each((function(e,s){!function(e,n,i){
// 值为 undefined 时，不修改
if(!v(i))switch(t){
// attr
case 0:g(i)?e.removeAttribute(n):e.setAttribute(n,i);break;
// prop
case 1:
// @ts-ignore
e[n]=i;break;
// css
default:n=E(n),
// @ts-ignore
e.style[n]=m(i)?i+(M.indexOf(n)>-1?"":"px"):i}}(s,i,f(o)?o.call(s,e,n(s,i)):o)}))}})),R.fn.children=function(t){var e=[];return this.each((function(n,i){A(i.childNodes,(function(n,i){x(i)&&(t&&!R(i).is(t)||e.push(i))}))})),new D(nt(e))},R.fn.slice=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return new D([].slice.apply(this,t))},R.fn.eq=function(t){var e=-1===t?this.slice(t):this.slice(t,+t+1);return new D(e)},A(["","s","sUntil"],(function(t,e){R.fn["parent"+e]=function(e,n){return it(t?R(this.get().reverse()):this,t,"parentNode",e,n)}})),R.fn.closest=function(t){if(this.is(t))return this;var e=[];return this.parents().each((function(n,i){if(R(i).is(t))return e.push(i),!1})),new D(e)};var ot=/^(?:{[\w\W]*\}|\[[\w\W]*\])$/;
// 从 `data-*` 中获取的值，需要经过该函数转换
// 若 value 不存在，则从 `data-*` 中获取值
function st(t,e,n){if(v(n)&&1===t.nodeType){var i="data-"+O(e);if(p(n=t.getAttribute(i)))try{n=function(t){return"true"===t||"false"!==t&&("null"===t?null:t===+t+""?+t:ot.test(t)?JSON.parse(t):t)}(n)}catch(t){}else n=void 0}return n}
/**
   * 值上面的 padding、border、margin 处理
   * @param element
   * @param name
   * @param value
   * @param funcIndex
   * @param includeMargin
   * @param multiply
   */
function rt(t,e,n,i,o,s){
// 获取元素的 padding, border, margin 宽度（两侧宽度的和）
var r=function(n){return T(t,e.toLowerCase(),n)*s};return 2===i&&o&&(n+=r("margin")),_(t)?(
// IE 为 box-sizing: border-box 时，得到的值不含 border 和 padding，这里先修复
// 仅获取时需要处理，multiply === 1 为 get
window.document.documentMode&&1===s&&(n+=r("border"),n+=r("padding")),0===i&&(n-=r("border")),1===i&&(n-=r("border"),n-=r("padding"))):(0===i&&(n+=r("padding")),2===i&&(n+=r("border"),n+=r("padding"))),n}
/**
   * 获取元素的样式值
   * @param element
   * @param name
   * @param funcIndex 0: innerWidth, innerHeight; 1: width, height; 2: outerWidth, outerHeight
   * @param includeMargin
   */function at(t,e,n,i){var o="client"+e,s="scroll"+e,r="offset"+e,a="inner"+e;
// $(window).width()
if(y(t))
// outerWidth, outerHeight 需要包含滚动条的宽度
return 2===n?t[a]:$(document)[o];
// $(document).width()
if(b(t)){var u=$(t);return Math.max(
// @ts-ignore
t.body[s],u[s],
// @ts-ignore
t.body[r],u[r],u[o])}var c=parseFloat(k(t,e.toLowerCase())||"0");return rt(t,e,c,n,i,1)}
/**
   * 设置元素的样式值
   * @param element
   * @param elementIndex
   * @param name
   * @param funcIndex 0: innerWidth, innerHeight; 1: width, height; 2: outerWidth, outerHeight
   * @param includeMargin
   * @param value
   */function ut(t,e){return parseFloat(t.css(e))}function ct(t){if(!t.getClientRects().length)return{top:0,left:0};var e=t.getBoundingClientRect(),n=t.ownerDocument.defaultView;return{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}}R.fn.data=function(t,e){
// 获取所有值
if(v(t)){if(!this.length)return;var n=this[0],i=Z(n);
// window, document 上不存在 `data-*` 属性
if(1!==n.nodeType)return i;
// 从 `data-*` 中获取值
for(var o=n.attributes,s=o.length;s--;)if(o[s]){var r=o[s].name;0===r.indexOf("data-")&&(i[r=E(r.slice(5))]=st(n,r,i[r]))}return i}
// 同时设置多个值
return w(t)?this.each((function(){Z(this,t)})):
// value 传入了 undefined
2===arguments.length&&v(e)?this:
// 设置值
v(e)?
// 获取值
this.length?st(this[0],t,Z(this[0],t)):void 0:this.each((function(){Z(this,t,e)}))},R.fn.empty=function(){return this.each((function(){this.innerHTML=""}))},R.fn.extend=function(t){return A(t,(function(t,e){
// 在 JQ 对象上扩展方法时，需要自己添加 typescript 的类型定义
R.fn[t]=e})),this},R.fn.filter=function(t){if(f(t))return this.map((function(e,n){return t.call(n,e,n)?n:void 0}));if(p(t))return this.map((function(e,n){return R(n).is(t)?n:void 0}));var e=R(t);return this.map((function(t,n){return e.get().indexOf(n)>-1?n:void 0}))},R.fn.first=function(){return this.eq(0)},R.fn.has=function(t){var e=p(t)?this.find(t):R(t),n=e.length;return this.map((function(){for(var t=0;t<n;t+=1)if(L(this,e[t]))return this}))},R.fn.hasClass=function(t){return this[0].classList.contains(t)},A(["Width","Height"],(function(t,e){A(["inner"+e,e.toLowerCase(),"outer"+e],(function(t,n){R.fn[n]=function(n,i){
// 是否是赋值操作
var o=arguments.length&&(t<2||!("boolean"==typeof n)),s=!0===n||!0===i;
// 获取第一个元素的值
return o?this.each((function(i,o){return function(t,e,n,i,o,s){var r=f(s)?s.call(t,e,at(t,n,i,o)):s;if(null!=r){var a=R(t),u=n.toLowerCase();
// 特殊的值，不需要计算 padding、border、margin
if(["auto","inherit",""].indexOf(r)>-1)a.css(u,r);else{
// 其他值保留原始单位。注意：如果不使用 px 作为单位，则算出的值一般是不准确的
var c=r.toString().replace(/\b[0-9.]*/,"");r=rt(t,n,parseFloat(r),i,o,-1)+(c||"px"),a.css(u,r)}}}(o,i,e,t,s,n)})):this.length?at(this[0],e,t,s):void 0;
// 设置每个元素的值
}}))})),R.fn.hide=function(){return this.each((function(){this.style.display="none"}))},A(["val","html","text"],(function(t,e){var n={0:"value",1:"innerHTML",2:"textContent"}[t];function i(e){
// text() 获取所有元素的文本
if(2===t)
// @ts-ignore
return tt(e,(function(t){return $(t)[n]})).join("");
// 空集合时，val() 和 html() 返回 undefined
if(e.length){
// val() 和 html() 仅获取第一个元素的内容
var i=e[0];
// select multiple 返回数组
return 0===t&&R(i).is("select[multiple]")?tt(R(i).find("option:checked"),(function(t){return t.value})):i[n];
// @ts-ignore
}}R.fn[e]=function(e){
// 获取值
return arguments.length?this.each((function(o,s){var r=f(e)?e.call(s,o,i(R(s))):e;
// value 是数组，则选中数组中的元素，反选不在数组中的元素
0===t&&Array.isArray(r)?
// select[multiple]
R(s).is("select[multiple]")?tt(R(s).find("option"),(function(t){return t.selected=r.indexOf(t.value)>-1})):s.checked=r.indexOf(s.value)>-1:function(e,i){
// text() 和 html() 赋值为 undefined，则保持原内容不变
// val() 赋值为 undefined 则赋值为空
if(v(i)){if(0!==t)return;i=""}1===t&&x(i)&&(i=i.outerHTML),
// @ts-ignore
e[n]=i}(s,r)})):i(this);
// 设置值
}})),R.fn.index=function(t){return arguments.length?p(t)?R(t).get().indexOf(this[0]):this.get().indexOf(R(t)[0]):this.eq(0).parent().children().get().indexOf(this[0])},R.fn.last=function(){return this.eq(-1)},A(["","All","Until"],(function(t,e){R.fn["next"+e]=function(e,n){return it(this,t,"nextElementSibling",e,n)}})),R.fn.not=function(t){var e=this.filter(t);return this.map((function(t,n){return e.index(n)>-1?void 0:n}))},
/**
   * 返回最近的用于定位的父元素
   */
R.fn.offsetParent=function(){return this.map((function(){for(var t=this.offsetParent;t&&"static"===R(t).css("position");)t=t.offsetParent;return t||document.documentElement}))},R.fn.position=function(){if(this.length){var t,e=this.eq(0),n={left:0,top:0};if("fixed"===e.css("position"))t=e[0].getBoundingClientRect();else{t=e.offset();var i=e.offsetParent();(n=i.offset()).top+=ut(i,"border-top-width"),n.left+=ut(i,"border-left-width")}return{top:t.top-n.top-ut(e,"margin-top"),left:t.left-n.left-ut(e,"margin-left")}}},R.fn.offset=function(t){
// 获取坐标
if(!arguments.length){if(!this.length)return;return ct(this[0])}
// 设置坐标
return this.each((function(e){!function(t,e,n){var i=R(t),o=i.css("position");"static"===o&&i.css("position","relative");var s,r,a=ct(t),u=i.css("top"),c=i.css("left");if(("absolute"===o||"fixed"===o)&&(u+c).indexOf("auto")>-1){var l=i.position();s=l.top,r=l.left}else s=parseFloat(u),r=parseFloat(c);var d=f(e)?e.call(t,n,Y({},a)):e;i.css({top:null!=d.top?d.top-a.top+s:void 0,left:null!=d.left?d.left-a.left+r:void 0})}(this,t,e)}))},R.fn.one=function(t,e,n,i){
// @ts-ignore
return this.on(t,e,n,i,!0)},A(["","All","Until"],(function(t,e){R.fn["prev"+e]=function(e,n){return it(t?R(this.get().reverse()):this,t,"previousElementSibling",e,n)}})),R.fn.removeAttr=function(t){var e=t.split(" ").filter((function(t){return t}));return this.each((function(){var t=this;A(e,(function(e,n){t.removeAttribute(n)}))}))},R.fn.removeData=function(t){return this.each((function(){et(this,t)}))},R.fn.removeProp=function(t){return this.each((function(){try{
// @ts-ignore
delete this[t]}catch(t){}}))},R.fn.replaceWith=function(t){return this.each((function(e,n){var i=t;f(i)?i=i.call(n,e,n.innerHTML):e&&!p(i)&&(i=R(i).clone()),R(n).before(i)})),this.remove()},R.fn.replaceAll=function(t){var e=this;return R(t).map((function(t,n){return R(n).replaceWith(t?e.clone():e),e.get()}))},
/**
   * 将表单元素的值组合成键值对数组
   * @returns {Array}
   */
R.fn.serializeArray=function(){var t=[];return this.each((function(e,n){var i=n instanceof HTMLFormElement?n.elements:[n];R(i).each((function(e,n){var i=R(n),o=n.type,s=n.nodeName.toLowerCase();if("fieldset"!==s&&n.name&&!n.disabled&&["input","select","textarea","keygen"].indexOf(s)>-1&&-1===["submit","button","image","reset","file"].indexOf(o)&&(-1===["radio","checkbox"].indexOf(o)||n.checked)){var r=i.val();(Array.isArray(r)?r:[r]).forEach((function(e){t.push({name:n.name,value:e})}))}}))})),t},R.fn.serialize=function(){return U(this.serializeArray())};var lt={};
/**
   * 获取元素的初始 display 值，用于 .show() 方法
   * @param nodeName
   */
/**
   * 显示指定元素
   * @returns {JQ}
   */
R.fn.show=function(){return this.each((function(){var t,e,n;"none"===this.style.display&&(this.style.display=""),"none"===I(this,"display")&&(this.style.display=(t=this.nodeName,lt[t]||(e=document.createElement(t),document.body.appendChild(e),n=I(e,"display"),e.parentNode.removeChild(e),"none"===n&&(n="block"),lt[t]=n),lt[t]))}))},
/**
   * 取得同辈元素的集合
   * @param selector {String=}
   * @returns {JQ}
   */
R.fn.siblings=function(t){return this.prevAll(t).add(this.nextAll(t))},
/**
   * 切换元素的显示状态
   */
R.fn.toggle=function(){return this.each((function(){"none"===I(this,"display")?R(this).show():R(this).hide()}))},R.fn.reflow=function(){return this.each((function(){return this.clientLeft}))},R.fn.transition=function(t){return m(t)&&(t+="ms"),this.each((function(){this.style.webkitTransitionDuration=t,this.style.transitionDuration=t}))},R.fn.transitionEnd=function(t){
// eslint-disable-next-line @typescript-eslint/no-this-alias
var e=this,n=["webkitTransitionEnd","transitionend"];function i(o){o.target===this&&(
// @ts-ignore
t.call(this,o),A(n,(function(t,n){e.off(n,i)})))}return A(n,(function(t,n){e.on(n,i)})),this},R.fn.transformOrigin=function(t){return this.each((function(){this.style.webkitTransformOrigin=t,this.style.transformOrigin=t}))},R.fn.transform=function(t){return this.each((function(){this.style.webkitTransform=t,this.style.transform=t}))};
/**
   * CSS 选择器和初始化函数组成的对象
   */
var dt={};
/**
   * 注册并执行初始化函数
   * @param selector CSS 选择器
   * @param apiInit 初始化函数
   * @param i 元素索引
   * @param element 元素
   */function ht(t,e,n,i){var o=Z(i,"_mdui_mutation");o||Z(i,"_mdui_mutation",o=[]),-1===o.indexOf(t)&&(o.push(t),e.call(i,n,i))}R.fn.mutation=function(){return this.each((function(t,e){var n=R(e);A(dt,(function(i,o){n.is(i)&&ht(i,o,t,e),n.find(i).each((function(t,e){ht(i,o,t,e)}))}))}))},R.showOverlay=function(t){var e=R(".mdui-overlay");e.length?(e.data("_overlay_is_deleted",!1),v(t)||e.css("z-index",t)):(v(t)&&(t=2e3),e=R('<div class="mdui-overlay">').appendTo(document.body).reflow().css("z-index",t));var n=e.data("_overlay_level")||0;return e.data("_overlay_level",++n).addClass("mdui-overlay-show")},R.hideOverlay=function(t){void 0===t&&(t=!1);var e=R(".mdui-overlay");if(e.length){var n=t?1:e.data("_overlay_level");n>1?e.data("_overlay_level",--n):e.data("_overlay_level",0).removeClass("mdui-overlay-show").data("_overlay_is_deleted",!0).transitionEnd((function(){e.data("_overlay_is_deleted")&&e.remove()}))}},R.lockScreen=function(){var t=R("body"),e=t.width(),n=t.data("_lockscreen_level")||0;
// 不直接把 body 设为 box-sizing: border-box，避免污染全局样式
t.addClass("mdui-locked").width(e).data("_lockscreen_level",++n)},R.unlockScreen=function(t){void 0===t&&(t=!1);var e=R("body"),n=t?1:e.data("_lockscreen_level");n>1?e.data("_lockscreen_level",--n):e.data("_lockscreen_level",0).removeClass("mdui-locked").width("")},R.throttle=function(t,e){void 0===e&&(e=16);var n=null;return function(){for(var i=this,o=[],s=arguments.length;s--;)o[s]=arguments[s];g(n)&&(n=setTimeout((function(){t.apply(i,o),n=null}),e))}};var ft={};
/**
   * 触发组件上的事件
   * @param eventName 事件名
   * @param componentName 组件名
   * @param target 在该元素上触发事件
   * @param instance 组件实例
   * @param parameters 事件参数
   */
function pt(t,e,n,i,o){o||(o={}),
// @ts-ignore
o.inst=i;var s=t+".mdui."+e;
// jQuery 事件
// @ts-ignore
"undefined"!=typeof jQuery&&
// @ts-ignore
jQuery(n).trigger(s,o);var r=R(n);
// mdui.jq 事件
r.trigger(s,o);var a=new CustomEvent(s,{bubbles:!0,cancelable:!0,detail:o});
// @ts-ignore
a._detail=o,r[0].dispatchEvent(a)}R.guid=function(t){if(!v(t)&&!v(ft[t]))return ft[t];function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}var n="_"+e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e();return v(t)||(ft[t]=n),n},H.mutation=function(t,e){v(t)||v(e)?R(document).mutation():(dt[t]=e,R(t).each((function(n,i){return ht(t,e,n,i)})))};var mt=R(document),vt=R(window);R("body");var gt={tolerance:5,offset:0,initialClass:"mdui-headroom",pinnedClass:"mdui-headroom-pinned-top",unpinnedClass:"mdui-headroom-unpinned-top"},yt=function(t,e){void 0===e&&(e={})
/**
       * 配置参数
       */,this.options=Y({},gt),
/**
       * 当前 headroom 的状态
       */
this.state="pinned",
/**
       * 当前是否启用
       */
this.isEnable=!1,
/**
       * 上次滚动后，垂直方向的距离
       */
this.lastScrollY=0,
/**
       * AnimationFrame ID
       */
this.rafId=0,this.$element=R(t).first(),Y(this.options,e);
// tolerance 参数若为数值，转换为对象
var n=this.options.tolerance;m(n)&&(this.options.tolerance={down:n,up:n}),this.enable()};
/**
   * 解析 DATA API 参数
   * @param element 元素
   * @param name 属性名
   */
function bt(t,e){var n=R(t).attr(e);return n?new Function("","var json = "+n+"; return JSON.parse(JSON.stringify(json));")():{}}
/**
   * 滚动时的处理
   */
yt.prototype.onScroll=function(){var t=this;this.rafId=window.requestAnimationFrame((function(){var e=window.pageYOffset,n=e>t.lastScrollY?"down":"up",i=t.options.tolerance[n],o=Math.abs(e-t.lastScrollY)>=i;e>t.lastScrollY&&e>=t.options.offset&&o?t.unpin():(e<t.lastScrollY&&o||e<=t.options.offset)&&t.pin(),t.lastScrollY=e}))},
/**
   * 触发组件事件
   * @param name
   */
yt.prototype.triggerEvent=function(t){pt(t,"headroom",this.$element,this)},
/**
   * 动画结束的回调
   */
yt.prototype.transitionEnd=function(){"pinning"===this.state&&(this.state="pinned",this.triggerEvent("pinned")),"unpinning"===this.state&&(this.state="unpinned",this.triggerEvent("unpinned"))},
/**
   * 使元素固定住
   */
yt.prototype.pin=function(){var t=this;"pinning"!==this.state&&"pinned"!==this.state&&this.$element.hasClass(this.options.initialClass)&&(this.triggerEvent("pin"),this.state="pinning",this.$element.removeClass(this.options.unpinnedClass).addClass(this.options.pinnedClass).transitionEnd((function(){return t.transitionEnd()})))},
/**
   * 使元素隐藏
   */
yt.prototype.unpin=function(){var t=this;"unpinning"!==this.state&&"unpinned"!==this.state&&this.$element.hasClass(this.options.initialClass)&&(this.triggerEvent("unpin"),this.state="unpinning",this.$element.removeClass(this.options.pinnedClass).addClass(this.options.unpinnedClass).transitionEnd((function(){return t.transitionEnd()})))},
/**
   * 启用 headroom 插件
   */
yt.prototype.enable=function(){var t=this;this.isEnable||(this.isEnable=!0,this.state="pinned",this.$element.addClass(this.options.initialClass).removeClass(this.options.pinnedClass).removeClass(this.options.unpinnedClass),this.lastScrollY=window.pageYOffset,vt.on("scroll",(function(){return t.onScroll()})))},
/**
   * 禁用 headroom 插件
   */
yt.prototype.disable=function(){var t=this;this.isEnable&&(this.isEnable=!1,this.$element.removeClass(this.options.initialClass).removeClass(this.options.pinnedClass).removeClass(this.options.unpinnedClass),vt.off("scroll",(function(){return t.onScroll()})),window.cancelAnimationFrame(this.rafId))},
/**
   * 获取当前状态。共包含四种状态：`pinning`、`pinned`、`unpinning`、`unpinned`
   */
yt.prototype.getState=function(){return this.state},H.Headroom=yt;var xt="mdui-headroom";R((function(){H.mutation("["+xt+"]",(function(){new H.Headroom(this,bt(this,xt))}))}));var Ct={accordion:!1},wt=function(t,e){void 0===e&&(e={})
/**
       * 配置参数
       */,this.options=Y({},Ct);
// CSS 类名
var n="mdui-"+this.getNamespace()+"-item";this.classItem=n,this.classItemOpen=n+"-open",this.classHeader=n+"-header",this.classBody=n+"-body",this.$element=R(t).first(),Y(this.options,e),this.bindEvent()};
/**
   * 绑定事件
   */
wt.prototype.bindEvent=function(){
// eslint-disable-next-line @typescript-eslint/no-this-alias
var t=this;
// 点击 header 时，打开/关闭 item
this.$element.on("click","."+this.classHeader,(function(){var e=R(this).parent();t.getItems().each((function(n,i){e.is(i)&&t.toggle(i)}))})),
// 点击关闭按钮时，关闭 item
this.$element.on("click","[mdui-"+this.getNamespace()+"-item-close]",(function(){var e=R(this).parents("."+t.classItem).first();t.close(e)}))},
/**
   * 指定 item 是否处于打开状态
   * @param $item
   */
wt.prototype.isOpen=function(t){return t.hasClass(this.classItemOpen)},
/**
   * 获取所有 item
   */
wt.prototype.getItems=function(){return this.$element.children("."+this.classItem)},
/**
   * 获取指定 item
   * @param item
   */
wt.prototype.getItem=function(t){return m(t)?this.getItems().eq(t):R(t).first()},
/**
   * 触发组件事件
   * @param name 事件名
   * @param $item 事件触发的目标 item
   */
wt.prototype.triggerEvent=function(t,e){pt(t,this.getNamespace(),e,this)},
/**
   * 动画结束回调
   * @param $content body 元素
   * @param $item item 元素
   */
wt.prototype.transitionEnd=function(t,e){this.isOpen(e)?(t.transition(0).height("auto").reflow().transition(""),this.triggerEvent("opened",e)):(t.height(""),this.triggerEvent("closed",e))},
/**
   * 打开指定面板项
   * @param item 面板项的索引号、或 CSS 选择器、或 DOM 元素、或 JQ 对象
   */
wt.prototype.open=function(t){var e=this,n=this.getItem(t);if(!this.isOpen(n)){
// 关闭其他项
this.options.accordion&&this.$element.children("."+this.classItemOpen).each((function(t,i){var o=R(i);o.is(n)||e.close(o)}));var i=n.children("."+this.classBody);i.height(i[0].scrollHeight).transitionEnd((function(){return e.transitionEnd(i,n)})),this.triggerEvent("open",n),n.addClass(this.classItemOpen)}},
/**
   * 关闭指定面板项
   * @param item 面板项的索引号、或 CSS 选择器、或 DOM 元素、或 JQ 对象
   */
wt.prototype.close=function(t){var e=this,n=this.getItem(t);if(this.isOpen(n)){var i=n.children("."+this.classBody);this.triggerEvent("close",n),n.removeClass(this.classItemOpen),i.transition(0).height(i[0].scrollHeight).reflow().transition("").height("").transitionEnd((function(){return e.transitionEnd(i,n)}))}},
/**
   * 切换指定面板项的打开状态
   * @param item 面板项的索引号、或 CSS 选择器、或 DOM 元素、或 JQ 对象
   */
wt.prototype.toggle=function(t){var e=this.getItem(t);this.isOpen(e)?this.close(e):this.open(e)},
/**
   * 打开所有面板项
   */
wt.prototype.openAll=function(){var t=this;this.getItems().each((function(e,n){return t.open(n)}))},
/**
   * 关闭所有面板项
   */
wt.prototype.closeAll=function(){var t=this;this.getItems().each((function(e,n){return t.close(n)}))};var $t=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getNamespace=function(){return"collapse"},e}(wt);H.Collapse=$t;var Et="mdui-collapse";R((function(){H.mutation("["+Et+"]",(function(){new H.Collapse(this,bt(this,Et))}))}));var Ot=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getNamespace=function(){return"panel"},e}(wt);H.Panel=Ot;var kt="mdui-panel";R((function(){H.mutation("["+kt+"]",(function(){new H.Panel(this,bt(this,kt))}))}));var _t=function(t){
/**
       * 表头 tr 元素
       */
this.$thRow=R(),
/**
       * 表格 body 中的 tr 元素
       */
this.$tdRows=R(),
/**
       * 表头的 checkbox 元素
       */
this.$thCheckbox=R(),
/**
       * 表格 body 中的 checkbox 元素
       */
this.$tdCheckboxs=R(),
/**
       * 表格行是否可选择
       */
this.selectable=!1,
/**
       * 已选中的行数
       */
this.selectedRow=0,this.$element=R(t).first(),this.init()};
/**
   * 初始化表格
   */_t.prototype.init=function(){this.$thRow=this.$element.find("thead tr"),this.$tdRows=this.$element.find("tbody tr"),this.selectable=this.$element.hasClass("mdui-table-selectable"),this.updateThCheckbox(),this.updateTdCheckbox(),this.updateNumericCol()},
/**
   * 生成 checkbox 的 HTML 结构
   * @param tag 标签名
   */
_t.prototype.createCheckboxHTML=function(t){return"<"+t+' class="mdui-table-cell-checkbox"><label class="mdui-checkbox"><input type="checkbox"/><i class="mdui-checkbox-icon"></i></label></'+t+">"},
/**
   * 更新表头 checkbox 的状态
   */
_t.prototype.updateThCheckboxStatus=function(){var t=this.$thCheckbox[0],e=this.selectedRow,n=this.$tdRows.length;t.checked=e===n,t.indeterminate=!!e&&e!==n},
/**
   * 更新表格行的 checkbox
   */
_t.prototype.updateTdCheckbox=function(){var t=this,e="mdui-table-row-selected";this.$tdRows.each((function(n,i){var o=R(i);
// 移除旧的 checkbox
if(o.find(".mdui-table-cell-checkbox").remove(),t.selectable){
// 创建 DOM
var s=R(t.createCheckboxHTML("td")).prependTo(o).find('input[type="checkbox"]');
// 默认选中的行
o.hasClass(e)&&(s[0].checked=!0,t.selectedRow++),t.updateThCheckboxStatus(),
// 绑定事件
s.on("change",(function(){s[0].checked?(o.addClass(e),t.selectedRow++):(o.removeClass(e),t.selectedRow--),t.updateThCheckboxStatus()})),t.$tdCheckboxs=t.$tdCheckboxs.add(s)}}))},
/**
   * 更新表头的 checkbox
   */
_t.prototype.updateThCheckbox=function(){var t=this;
// 移除旧的 checkbox
this.$thRow.find(".mdui-table-cell-checkbox").remove(),this.selectable&&(this.$thCheckbox=R(this.createCheckboxHTML("th")).prependTo(this.$thRow).find('input[type="checkbox"]').on("change",(function(){var e=t.$thCheckbox[0].checked;t.selectedRow=e?t.$tdRows.length:0,t.$tdCheckboxs.each((function(t,n){n.checked=e})),t.$tdRows.each((function(t,n){e?R(n).addClass("mdui-table-row-selected"):R(n).removeClass("mdui-table-row-selected")}))})))},
/**
   * 更新数值列
   */
_t.prototype.updateNumericCol=function(){var t=this,e="mdui-table-col-numeric";this.$thRow.find("th").each((function(n,i){var o=R(i).hasClass(e);t.$tdRows.each((function(t,i){var s=R(i).find("td").eq(n);o?s.addClass(e):s.removeClass(e)}))}))};var Tt="_mdui_table";R((function(){H.mutation(".mdui-table",(function(){var t=R(this);t.data(Tt)||t.data(Tt,new _t(t))}))})),H.updateTables=function(t){(v(t)?R(".mdui-table"):R(t)).each((function(t,e){var n=R(e),i=n.data(Tt);i?i.init():n.data(Tt,new _t(n))}))};
/**
   * touch 事件后的 500ms 内禁用 mousedown 事件
   *
   * 不支持触控的屏幕上事件顺序为 mousedown -> mouseup -> click
   * 支持触控的屏幕上事件顺序为 touchstart -> touchend -> mousedown -> mouseup -> click
   *
   * 在每一个事件中都使用 TouchHandler.isAllow(event) 判断事件是否可执行
   * 在 touchstart 和 touchmove、touchend、touchcancel
   *
   * (function () {
   *   $document
   *     .on(start, function (e) {
   *       if (!isAllow(e)) {
   *         return;
   *       }
   *       register(e);
   *       console.log(e.type);
   *     })
   *     .on(move, function (e) {
   *       if (!isAllow(e)) {
   *         return;
   *       }
   *       console.log(e.type);
   *     })
   *     .on(end, function (e) {
   *       if (!isAllow(e)) {
   *         return;
   *       }
   *       console.log(e.type);
   *     })
   *     .on(unlock, register);
   * })();
   */
var It="touchstart mousedown",St="touchmove mousemove",jt="touchend mouseup",Mt="touchcancel mouseleave",At="touchend touchmove touchcancel",Dt=0;
/**
   * 该事件是否被允许，在执行事件前调用该方法判断事件是否可以执行
   * 若已触发 touch 事件，则阻止之后的鼠标事件
   * @param event
   */
function Rt(t){return!(Dt&&["mousedown","mouseup","mousemove","click","mouseover","mouseout","mouseenter","mouseleave"].indexOf(t.type)>-1)}
/**
   * 在 touchstart 和 touchmove、touchend、touchcancel 事件中调用该方法注册事件
   * @param event
   */function Ht(t){"touchstart"===t.type?
// 触发了 touch 事件
Dt+=1:["touchmove","touchend","touchcancel"].indexOf(t.type)>-1&&
// touch 事件结束 500ms 后解除对鼠标事件的阻止
setTimeout((function(){Dt&&(Dt-=1)}),500)}
/**
   * Inspired by https://github.com/nolimits4web/Framework7/blob/master/src/js/fast-clicks.js
   * https://github.com/nolimits4web/Framework7/blob/master/LICENSE
   *
   * Inspired by https://github.com/fians/Waves
   */
/**
   * 显示涟漪动画
   * @param event
   * @param $ripple
   */function Lt(t,e){
// 鼠标右键不产生涟漪
if(!(t instanceof MouseEvent&&2===t.button)){
// 点击位置坐标
var n="undefined"!=typeof TouchEvent&&t instanceof TouchEvent&&t.touches.length?t.touches[0]:t,i=n.pageX,o=n.pageY,s=e.offset(),r=e.innerHeight(),a=e.innerWidth(),u=i-s.left,c=o-s.top,l=Math.max(Math.pow(Math.pow(r,2)+Math.pow(a,2),.5),48),d="translate3d("+(a/2-u)+"px,"+(r/2-c)+"px, 0) scale(1)";
// 涟漪的 DOM 结构，并缓存动画效果
R('<div class="mdui-ripple-wave" style="width:'+l+"px;height:"+l+"px;margin-top:-"+l/2+"px;margin-left:-"+l/2+"px;left:"+u+"px;top:"+c+'px;"></div>').data("_ripple_wave_translate",d).prependTo(e).reflow().transform(d)}}
/**
   * 隐藏并移除涟漪
   * @param $wave
   */
/**
   * 隐藏涟漪动画
   * @param this
   */
function Bt(){var t=R(this);t.children(".mdui-ripple-wave").each((function(t,e){!function(t){if(t.length&&!t.data("_ripple_wave_removed")){t.data("_ripple_wave_removed",!0);var e=setTimeout((function(){return t.remove()}),400),n=t.data("_ripple_wave_translate");t.addClass("mdui-ripple-wave-fill").transform(n.replace("scale(1)","scale(1.01)")).transitionEnd((function(){clearTimeout(e),t.addClass("mdui-ripple-wave-out").transform(n.replace("scale(1)","scale(1.01)")),e=setTimeout((function(){return t.remove()}),700),setTimeout((function(){t.transitionEnd((function(){clearTimeout(e),t.remove()}))}),0)}))}}(R(e))})),t.off(St+" "+jt+" "+Mt,Bt)}
/**
   * 显示涟漪，并绑定 touchend 等事件
   * @param event
   */function Pt(t){if(Rt(t)&&(Ht(t),t.target!==document))
// Chrome 59 点击滚动条时，会在 document 上触发事件
{var e=R(t.target),n=e.hasClass("mdui-ripple")?e:e.parents(".mdui-ripple").first();
// 获取含 .mdui-ripple 类的元素
if(n.length&&!n.prop("disabled")&&v(n.attr("disabled")))if("touchstart"===t.type){var i=!1,o=setTimeout((function(){o=0,Lt(t,n)}),200),s=function(){
// 如果手指没有移动，且涟漪动画还没有开始，则开始涟漪动画
o&&(clearTimeout(o),o=0,Lt(t,n)),i||(i=!0,Bt.call(n))};
// touchstart 触发指定时间后开始涟漪动画，避免手指滑动时也触发涟漪
n.on("touchmove",(function(){o&&(clearTimeout(o),o=0),s()})).on("touchend touchcancel",s)}else Lt(t,n),n.on(St+" "+jt+" "+Mt,Bt);
// 禁用状态的元素上不产生涟漪效果
}}R((function(){mt.on(It,Pt).on(At,Ht)}));var Nt={reInit:!1,domLoadedEvent:!1};
/**
   * 输入框事件
   * @param event
   * @param data
   */function zt(t,e){void 0===e&&(e={}),e=Y({},Nt,e);var n=t.target,i=R(n),o=t.type,s=i.val(),r=i.attr("type")||"";if(!(["checkbox","button","submit","range","radio","image"].indexOf(r)>-1)){var a=i.parent(".mdui-textfield");
// 输入框是否聚焦
// textarea 高度自动调整
if("focus"===o&&a.addClass("mdui-textfield-focus"),"blur"===o&&a.removeClass("mdui-textfield-focus"),
// 输入框是否为空
"blur"!==o&&"input"!==o||(s?a.addClass("mdui-textfield-not-empty"):a.removeClass("mdui-textfield-not-empty")),
// 输入框是否禁用
n.disabled?a.addClass("mdui-textfield-disabled"):a.removeClass("mdui-textfield-disabled"),
// 表单验证
"input"!==o&&"blur"!==o||e.domLoadedEvent||!n.validity||(n.validity.valid?a.removeClass("mdui-textfield-invalid-html5"):a.addClass("mdui-textfield-invalid-html5")),i.is("textarea")){
// IE bug：textarea 的值仅为多个换行，不含其他内容时，textarea 的高度不准确
//         此时，在计算高度前，在值的开头加入一个空格，计算完后，移除空格
var u=s,c=!1;""===u.replace(/[\r\n]/g,"")&&(i.val(" "+u),c=!0),
// 设置 textarea 高度
i.outerHeight("");var l=i.outerHeight(),d=n.scrollHeight;d>l&&i.outerHeight(d),
// 计算完，还原 textarea 的值
c&&i.val(u)}
// 实时字数统计
e.reInit&&a.find(".mdui-textfield-counter").remove();var h=i.attr("maxlength");h&&((e.reInit||e.domLoadedEvent)&&R('<div class="mdui-textfield-counter"><span class="mdui-textfield-counter-inputed"></span> / '+h+"</div>").appendTo(a),a.find(".mdui-textfield-counter-inputed").text(s.length.toString())),
// 含 帮助文本、错误提示、字数统计 时，增加文本框底部内边距
(a.find(".mdui-textfield-helper").length||a.find(".mdui-textfield-error").length||h)&&a.addClass("mdui-textfield-has-bottom")}}
/**
   * 滑块的值改变后修改滑块样式
   * @param $slider
   */
function Ft(t){var e=t.data(),n=e._slider_$track,i=e._slider_$fill,o=e._slider_$thumb,s=e._slider_$input,r=e._slider_min,a=e._slider_max,u=e._slider_disabled,c=e._slider_discrete,l=e._slider_$thumbText,d=s.val(),h=(d-r)/(a-r)*100;i.width(h+"%"),n.width(100-h+"%"),u&&(i.css("padding-right","6px"),n.css("padding-left","6px")),o.css("left",h+"%"),c&&l.text(d),0===h?t.addClass("mdui-slider-zero"):t.removeClass("mdui-slider-zero")}
/**
   * 重新初始化滑块
   * @param $slider
   */function qt(t){var e=R('<div class="mdui-slider-track"></div>'),n=R('<div class="mdui-slider-fill"></div>'),i=R('<div class="mdui-slider-thumb"></div>'),o=t.find('input[type="range"]'),s=o[0].disabled,r=t.hasClass("mdui-slider-discrete");
// 禁用状态
s?t.addClass("mdui-slider-disabled"):t.removeClass("mdui-slider-disabled"),
// 重新填充 HTML
t.find(".mdui-slider-track").remove(),t.find(".mdui-slider-fill").remove(),t.find(".mdui-slider-thumb").remove(),t.append(e).append(n).append(i);
// 间续型滑块
var a=R();r&&(a=R("<span></span>"),i.empty().append(a)),t.data("_slider_$track",e),t.data("_slider_$fill",n),t.data("_slider_$thumb",i),t.data("_slider_$input",o),t.data("_slider_min",o.attr("min")),t.data("_slider_max",o.attr("max")),t.data("_slider_disabled",s),t.data("_slider_discrete",r),t.data("_slider_$thumbText",a),
// 设置默认值
Ft(t)}R((function(){
// 绑定事件
mt.on("input focus blur",".mdui-textfield-input",{useCapture:!0},zt),
// 可展开文本框展开
mt.on("click",".mdui-textfield-expandable .mdui-textfield-icon",(function(){R(this).parents(".mdui-textfield").addClass("mdui-textfield-expanded").find(".mdui-textfield-input")[0].focus()})),
// 可展开文本框关闭
mt.on("click",".mdui-textfield-expanded .mdui-textfield-close",(function(){R(this).parents(".mdui-textfield").removeClass("mdui-textfield-expanded").find(".mdui-textfield-input").val("")})),
/**
       * 初始化文本框
       */
H.mutation(".mdui-textfield",(function(){R(this).find(".mdui-textfield-input").trigger("input",{domLoadedEvent:!0})}))})),H.updateTextFields=function(t){(v(t)?R(".mdui-textfield"):R(t)).each((function(t,e){R(e).find(".mdui-textfield-input").trigger("input",{reInit:!0})}))};var Wt='.mdui-slider input[type="range"]';R((function(){
// 滑块滑动事件
mt.on("input change",Wt,(function(){Ft(R(this).parent())})),
// 开始触摸滑块事件
mt.on(It,Wt,(function(t){Rt(t)&&(Ht(t),this.disabled||R(this).parent().addClass("mdui-slider-focus"))})),
// 结束触摸滑块事件
mt.on(jt,Wt,(function(t){Rt(t)&&(this.disabled||R(this).parent().removeClass("mdui-slider-focus"))})),mt.on(At,Wt,Ht),
/**
       * 初始化滑块
       */
H.mutation(".mdui-slider",(function(){qt(R(this))}))})),H.updateSliders=function(t){(v(t)?R(".mdui-slider"):R(t)).each((function(t,e){qt(R(e))}))};var Yt={trigger:"hover"},Ut=function(t,e){var n=this;void 0===e&&(e={})
/**
       * 配置参数
       */,this.options=Y({},Yt),
/**
       * 当前 fab 的状态
       */
this.state="closed",this.$element=R(t).first(),Y(this.options,e),this.$btn=this.$element.find(".mdui-fab"),this.$dial=this.$element.find(".mdui-fab-dial"),this.$dialBtns=this.$dial.find(".mdui-fab"),"hover"===this.options.trigger&&(this.$btn.on("touchstart mouseenter",(function(){return n.open()})),this.$element.on("mouseleave",(function(){return n.close()}))),"click"===this.options.trigger&&this.$btn.on(It,(function(){return n.open()})),
// 触摸屏幕其他地方关闭快速拨号
mt.on(It,(function(t){R(t.target).parents(".mdui-fab-wrapper").length||n.close()}))};
/**
   * 触发组件事件
   * @param name
   */
Ut.prototype.triggerEvent=function(t){pt(t,"fab",this.$element,this)},
/**
   * 当前是否为打开状态
   */
Ut.prototype.isOpen=function(){return"opening"===this.state||"opened"===this.state},
/**
   * 打开快速拨号菜单
   */
Ut.prototype.open=function(){var t=this;this.isOpen()||(
// 为菜单中的按钮添加不同的 transition-delay
this.$dialBtns.each((function(e,n){var i=15*(t.$dialBtns.length-e)+"ms";n.style.transitionDelay=i,n.style.webkitTransitionDelay=i})),this.$dial.css("height","auto").addClass("mdui-fab-dial-show"),
// 如果按钮中存在 .mdui-fab-opened 的图标，则进行图标切换
this.$btn.find(".mdui-fab-opened").length&&this.$btn.addClass("mdui-fab-opened"),this.state="opening",this.triggerEvent("open"),
// 打开顺序为从下到上逐个打开，最上面的打开后才表示动画完成
this.$dialBtns.first().transitionEnd((function(){t.$btn.hasClass("mdui-fab-opened")&&(t.state="opened",t.triggerEvent("opened"))})))},
/**
   * 关闭快速拨号菜单
   */
Ut.prototype.close=function(){var t=this;this.isOpen()&&(
// 为菜单中的按钮添加不同的 transition-delay
this.$dialBtns.each((function(t,e){var n=15*t+"ms";e.style.transitionDelay=n,e.style.webkitTransitionDelay=n})),this.$dial.removeClass("mdui-fab-dial-show"),this.$btn.removeClass("mdui-fab-opened"),this.state="closing",this.triggerEvent("close"),
// 从上往下依次关闭，最后一个关闭后才表示动画完成
this.$dialBtns.last().transitionEnd((function(){t.$btn.hasClass("mdui-fab-opened")||(t.state="closed",t.triggerEvent("closed"),t.$dial.css("height",0))})))},
/**
   * 切换快速拨号菜单的打开状态
   */
Ut.prototype.toggle=function(){this.isOpen()?this.close():this.open()},
/**
   * 以动画的形式显示整个浮动操作按钮
   */
Ut.prototype.show=function(){this.$element.removeClass("mdui-fab-hide")},
/**
   * 以动画的形式隐藏整个浮动操作按钮
   */
Ut.prototype.hide=function(){this.$element.addClass("mdui-fab-hide")},
/**
   * 返回当前快速拨号菜单的打开状态。共包含四种状态：`opening`、`opened`、`closing`、`closed`
   */
Ut.prototype.getState=function(){return this.state},H.Fab=Ut;var Xt="mdui-fab";R((function(){
// mouseenter 不冒泡，无法进行事件委托，这里用 mouseover 代替。
// 不管是 click 、 mouseover 还是 touchstart ，都先初始化。
mt.on("touchstart mousedown mouseover","["+Xt+"]",(function(){new H.Fab(this,bt(this,Xt))}))}));
/**
   * 最终生成的元素结构为：
   *  <select class="mdui-select" mdui-select="{position: 'top'}" style="display: none;"> // $native
   *    <option value="1">State 1</option>
   *    <option value="2">State 2</option>
   *    <option value="3" disabled="">State 3</option>
   *  </select>
   *  <div class="mdui-select mdui-select-position-top" style="" id="88dec0e4-d4a2-c6d0-0e7f-1ba4501e0553"> // $element
   *    <span class="mdui-select-selected">State 1</span> // $selected
   *    <div class="mdui-select-menu" style="transform-origin: center 100% 0px;"> // $menu
   *      <div class="mdui-select-menu-item mdui-ripple" selected="">State 1</div> // $items
   *      <div class="mdui-select-menu-item mdui-ripple">State 2</div>
   *      <div class="mdui-select-menu-item mdui-ripple" disabled="">State 3</div>
   *    </div>
   *  </div>
   */
var Vt={position:"auto",gutter:16},Jt=function(t,e){var n=this;void 0===e&&(e={})
/**
       * 生成的 `<div class="mdui-select">` 元素的 JQ 对象
       */,this.$element=R(),
/**
       * 配置参数
       */
this.options=Y({},Vt),
/**
       * select 的 size 属性的值，根据该值设置 select 的高度
       */
this.size=0,
/**
       * 占位元素，显示已选中菜单项的文本
       */
this.$selected=R(),
/**
       * 菜单项的外层元素的 JQ 对象
       */
this.$menu=R(),
/**
       * 菜单项数组的 JQ 对象
       */
this.$items=R(),
/**
       * 当前选中的菜单项的索引号
       */
this.selectedIndex=0,
/**
       * 当前选中菜单项的文本
       */
this.selectedText="",
/**
       * 当前选中菜单项的值
       */
this.selectedValue="",
/**
       * 当前 select 的状态
       */
this.state="closed",this.$native=R(t).first(),this.$native.hide(),Y(this.options,e),
// 为当前 select 生成唯一 ID
this.uniqueID=R.guid(),
// 生成 select
this.handleUpdate(),
// 点击 select 外面区域关闭
mt.on("click touchstart",(function(t){var e=R(t.target);!n.isOpen()||e.is(n.$element)||L(n.$element[0],e[0])||n.close()}))};
/**
   * 调整菜单位置
   */
Jt.prototype.readjustMenu=function(){var t,e,n=vt.height(),i=this.$element.height(),o=this.$items.first(),s=o.height(),r=parseInt(o.css("margin-top")),a=this.$element.innerWidth()+.01,u=s*this.size+2*r,c=this.$element[0].getBoundingClientRect().top;
// mdui-select 高度
if("bottom"===this.options.position)e=i,t="0px";else if("top"===this.options.position)e=-u-1,t="100%";else{
// 菜单高度不能超过窗口高度
var l=n-2*this.options.gutter;u>l&&(u=l),
// 菜单的 margin-top
e=-(r+this.selectedIndex*s+(s-i)/2);var d=-(r+(this.size-1)*s+(s-i)/2);e<d&&(e=d);
// 菜单不能超出窗口
var h=c+e;h<this.options.gutter?
// 不能超出窗口上方
e=-(c-this.options.gutter):h+u+this.options.gutter>n&&(
// 不能超出窗口下方
e=-(c+u+this.options.gutter-n)),
// transform 的 Y 轴坐标
t=this.selectedIndex*s+s/2+r+"px"}
// 设置样式
this.$element.innerWidth(a),this.$menu.innerWidth(a).height(u).css({"margin-top":e+"px","transform-origin":"center "+t+" 0"})},
/**
   * select 是否为打开状态
   */
Jt.prototype.isOpen=function(){return"opening"===this.state||"opened"===this.state},
/**
   * 对原生 select 组件进行了修改后，需要调用该方法
   */
Jt.prototype.handleUpdate=function(){var t=this;this.isOpen()&&this.close(),this.selectedValue=this.$native.val();var e=[];this.$items=R(),
// 生成 HTML
this.$native.find("option").each((function(n,i){var o=i.textContent||"",s=i.value,r=i.disabled,a=t.selectedValue===s;e.push({value:s,text:o,disabled:r,selected:a,index:n}),a&&(t.selectedText=o,t.selectedIndex=n),t.$items=t.$items.add('<div class="mdui-select-menu-item mdui-ripple"'+(r?" disabled":"")+(a?" selected":"")+">"+o+"</div>")})),this.$selected=R('<span class="mdui-select-selected">'+this.selectedText+"</span>"),this.$element=R('<div class="mdui-select mdui-select-position-'+this.options.position+'" style="'+this.$native.attr("style")+'" id="'+this.uniqueID+'"></div>').show().append(this.$selected),this.$menu=R('<div class="mdui-select-menu"></div>').appendTo(this.$element).append(this.$items),R("#"+this.uniqueID).remove(),this.$native.after(this.$element),
// 根据 select 的 size 属性设置高度
this.size=parseInt(this.$native.attr("size")||"0"),this.size<=0&&(this.size=this.$items.length,this.size>8&&(this.size=8));
// 点击选项时关闭下拉菜单
// eslint-disable-next-line @typescript-eslint/no-this-alias
var n=this;this.$items.on("click",(function(){if("closing"!==n.state){var t=R(this),i=t.index(),o=e[i];o.disabled||(n.$selected.text(o.text),n.$native.val(o.value),n.$items.removeAttr("selected"),t.attr("selected",""),n.selectedIndex=o.index,n.selectedValue=o.value,n.selectedText=o.text,n.$native.trigger("change"),n.close())}})),
// 点击 $element 时打开下拉菜单
this.$element.on("click",(function(e){var n=R(e.target);
// 在菜单上点击时不打开
n.is(".mdui-select-menu")||n.is(".mdui-select-menu-item")||t.toggle()}))},
/**
   * 动画结束的回调
   */
Jt.prototype.transitionEnd=function(){this.$element.removeClass("mdui-select-closing"),"opening"===this.state&&(this.state="opened",this.triggerEvent("opened"),this.$menu.css("overflow-y","auto")),"closing"===this.state&&(this.state="closed",this.triggerEvent("closed"),
// 恢复样式
this.$element.innerWidth(""),this.$menu.css({"margin-top":"",height:"",width:""}))},
/**
   * 触发组件事件
   * @param name
   */
Jt.prototype.triggerEvent=function(t){pt(t,"select",this.$native,this)},
/**
   * 切换下拉菜单的打开状态
   */
Jt.prototype.toggle=function(){this.isOpen()?this.close():this.open()},
/**
   * 打开下拉菜单
   */
Jt.prototype.open=function(){var t=this;this.isOpen()||(this.state="opening",this.triggerEvent("open"),this.readjustMenu(),this.$element.addClass("mdui-select-open"),this.$menu.transitionEnd((function(){return t.transitionEnd()})))},
/**
   * 关闭下拉菜单
   */
Jt.prototype.close=function(){var t=this;this.isOpen()&&(this.state="closing",this.triggerEvent("close"),this.$menu.css("overflow-y",""),this.$element.removeClass("mdui-select-open").addClass("mdui-select-closing"),this.$menu.transitionEnd((function(){return t.transitionEnd()})))},
/**
   * 获取当前菜单的状态。共包含四种状态：`opening`、`opened`、`closing`、`closed`
   */
Jt.prototype.getState=function(){return this.state},H.Select=Jt;var Kt="mdui-select";R((function(){H.mutation("["+Kt+"]",(function(){new H.Select(this,bt(this,Kt))}))})),R((function(){
// 滚动时隐藏应用栏
H.mutation(".mdui-appbar-scroll-hide",(function(){new H.Headroom(this)})),
// 滚动时只隐藏应用栏中的工具栏
H.mutation(".mdui-appbar-scroll-toolbar-hide",(function(){new H.Headroom(this,{pinnedClass:"mdui-headroom-pinned-toolbar",unpinnedClass:"mdui-headroom-unpinned-toolbar"})}))}));var Gt={trigger:"click",loop:!1},Qt=function(t,e){var n=this;void 0===e&&(e={})
/**
       * 配置参数
       */,this.options=Y({},Gt),
/**
       * 当前激活的 tab 的索引号。为 -1 时表示没有激活的选项卡，或不存在选项卡
       */
this.activeIndex=-1,this.$element=R(t).first(),Y(this.options,e),this.$tabs=this.$element.children("a"),this.$indicator=R('<div class="mdui-tab-indicator"></div>').appendTo(this.$element);
// 根据 url hash 获取默认激活的选项卡
var i=window.location.hash;i&&this.$tabs.each((function(t,e){return R(e).attr("href")!==i||(n.activeIndex=t,!1)})),
// 含 .mdui-tab-active 的元素默认激活
-1===this.activeIndex&&this.$tabs.each((function(t,e){return!R(e).hasClass("mdui-tab-active")||(n.activeIndex=t,!1)})),
// 存在选项卡时，默认激活第一个选项卡
this.$tabs.length&&-1===this.activeIndex&&(this.activeIndex=0),
// 设置激活状态选项卡
this.setActive(),
// 监听窗口大小变化事件，调整指示器位置
vt.on("resize",R.throttle((function(){return n.setIndicatorPosition()}),100)),
// 监听点击选项卡事件
this.$tabs.each((function(t,e){n.bindTabEvent(e)}))};
/**
   * 指定选项卡是否已禁用
   * @param $tab
   */
Qt.prototype.isDisabled=function(t){return void 0!==t.attr("disabled")},
/**
   * 绑定在 Tab 上点击或悬浮的事件
   * @param tab
   */
Qt.prototype.bindTabEvent=function(t){var e=this,n=R(t),i=function(){
// 禁用状态的选项卡无法选中
if(e.isDisabled(n))return!1;e.activeIndex=e.$tabs.index(t),e.setActive()};
// 无论 trigger 是 click 还是 hover，都会响应 click 事件
n.on("click",i),
// trigger 为 hover 时，额外响应 mouseenter 事件
"hover"===this.options.trigger&&n.on("mouseenter",i),
// 阻止链接的默认点击动作
n.on("click",(function(){if(0===(n.attr("href")||"").indexOf("#"))return!1}))},
/**
   * 触发组件事件
   * @param name
   * @param $element
   * @param parameters
   */
Qt.prototype.triggerEvent=function(t,e,n){void 0===n&&(n={}),pt(t,"tab",e,this,n)},
/**
   * 设置激活状态的选项卡
   */
Qt.prototype.setActive=function(){var t=this;this.$tabs.each((function(e,n){var i=R(n),o=i.attr("href")||"";
// 设置选项卡激活状态
e!==t.activeIndex||t.isDisabled(i)?(i.removeClass("mdui-tab-active"),R(o).hide()):(i.hasClass("mdui-tab-active")||(t.triggerEvent("change",t.$element,{index:t.activeIndex,id:o.substr(1)}),t.triggerEvent("show",i),i.addClass("mdui-tab-active")),R(o).show(),t.setIndicatorPosition())}))},
/**
   * 设置选项卡指示器的位置
   */
Qt.prototype.setIndicatorPosition=function(){
// 选项卡数量为 0 时，不显示指示器
if(-1!==this.activeIndex){var t=this.$tabs.eq(this.activeIndex);if(!this.isDisabled(t)){var e=t.offset();this.$indicator.css({left:e.left+this.$element[0].scrollLeft-this.$element[0].getBoundingClientRect().left+"px",width:t.innerWidth()+"px"})}}else this.$indicator.css({left:0,width:0})},
/**
   * 切换到下一个选项卡
   */
Qt.prototype.next=function(){-1!==this.activeIndex&&(this.$tabs.length>this.activeIndex+1?this.activeIndex++:this.options.loop&&(this.activeIndex=0),this.setActive())},
/**
   * 切换到上一个选项卡
   */
Qt.prototype.prev=function(){-1!==this.activeIndex&&(this.activeIndex>0?this.activeIndex--:this.options.loop&&(this.activeIndex=this.$tabs.length-1),this.setActive())},
/**
   * 显示指定索引号、或指定id的选项卡
   * @param index 索引号、或id
   */
Qt.prototype.show=function(t){var e=this;-1!==this.activeIndex&&(m(t)?this.activeIndex=t:this.$tabs.each((function(n,i){if(i.id===t)return e.activeIndex=n,!1})),this.setActive())},
/**
   * 在父元素的宽度变化时，需要调用该方法重新调整指示器位置
   * 在添加或删除选项卡时，需要调用该方法
   */
Qt.prototype.handleUpdate=function(){var t=this,e=this.$tabs,n=this.$element.children("a"),i=e.get(),o=n.get();// 新的 tabs 元素数组
if(!n.length)return this.activeIndex=-1,this.$tabs=n,void this.setIndicatorPosition();
// 重新遍历选项卡，找出新增的选项卡
n.each((function(e,n){
// 有新增的选项卡
i.indexOf(n)<0&&(t.bindTabEvent(n),-1===t.activeIndex?t.activeIndex=0:e<=t.activeIndex&&t.activeIndex++)})),
// 找出被移除的选项卡
e.each((function(e,n){
// 有被移除的选项卡
o.indexOf(n)<0&&(e<t.activeIndex?t.activeIndex--:e===t.activeIndex&&(t.activeIndex=0))})),this.$tabs=n,this.setActive()},H.Tab=Qt;var Zt="mdui-tab";R((function(){H.mutation("["+Zt+"]",(function(){new H.Tab(this,bt(this,Zt))}))}));
/**
   * 在桌面设备上默认显示抽屉栏，不显示遮罩层
   * 在手机和平板设备上默认不显示抽屉栏，始终显示遮罩层，且覆盖导航栏
   */
var te={overlay:!1,swipe:!1},ee=function(t,e){var n=this;void 0===e&&(e={})
/**
       * 配置参数
       */,this.options=Y({},te),
/**
       * 当前是否显示着遮罩层
       */
this.overlay=!1,this.$element=R(t).first(),Y(this.options,e),this.position=this.$element.hasClass("mdui-drawer-right")?"right":"left",this.$element.hasClass("mdui-drawer-close")?this.state="closed":this.$element.hasClass("mdui-drawer-open")||this.isDesktop()?this.state="opened":this.state="closed",
// 浏览器窗口大小调整时
vt.on("resize",R.throttle((function(){n.isDesktop()?(
// 由手机平板切换到桌面时
// 如果显示着遮罩，则隐藏遮罩
n.overlay&&!n.options.overlay&&(R.hideOverlay(),n.overlay=!1,R.unlockScreen()),
// 没有强制关闭，则状态为打开状态
n.$element.hasClass("mdui-drawer-close")||(n.state="opened")):n.overlay||"opened"!==n.state||(
// 由桌面切换到手机平板时。如果抽屉栏是打开着的且没有遮罩层，则关闭抽屉栏
n.$element.hasClass("mdui-drawer-open")?(R.showOverlay(),n.overlay=!0,R.lockScreen(),R(".mdui-overlay").one("click",(function(){return n.close()}))):n.state="closed")}),100)),
// 绑定关闭按钮事件
this.$element.find("[mdui-drawer-close]").each((function(t,e){R(e).on("click",(function(){return n.close()}))})),this.swipeSupport()};
/**
   * 是否是桌面设备
   */
ee.prototype.isDesktop=function(){return vt.width()>=1024},
/**
   * 滑动手势支持
   */
ee.prototype.swipeSupport=function(){
// eslint-disable-next-line @typescript-eslint/no-this-alias
var t,e,n,i,o=this,s=null,r=!1,a=R("body"),u=24;
// 抽屉栏滑动手势控制
function c(t){var e="translate("+-1*("right"===o.position?-1:1)*t+"px, 0) !important;";o.$element.css("cssText","transform: "+e+"; transition: initial !important;;")}function l(){o.$element[0].style.transform="",o.$element[0].style.webkitTransform="",o.$element[0].style.transition="",o.$element[0].style.webkitTransition=""}function d(){return o.$element.width()+10}function h(t){return Math.min(Math.max("closing"===s?i-t:d()+i-t,0),d())}function f(t){if(s){var e=t.changedTouches[0].pageX;"right"===o.position&&(e=a.width()-e);var n=h(e)/d();r=!1;var i=s;s=null,"opening"===i?n<.92?(l(),o.open()):l():n>.08?(l(),o.close()):l(),R.unlockScreen()}else r=!1;a.off({
// eslint-disable-next-line @typescript-eslint/no-use-before-define
touchmove:p,touchend:f,
// eslint-disable-next-line @typescript-eslint/no-use-before-define
touchcancel:p})}function p(t){var u=t.touches[0].pageX;"right"===o.position&&(u=a.width()-u);var l=t.touches[0].pageY;if(s)c(h(u));else if(r){var d=Math.abs(u-e),p=Math.abs(l-n);d>8&&p<=8?(i=u,s="opened"===o.state?"closing":"opening",R.lockScreen(),c(h(u))):d<=8&&p>8&&f()}}function m(i){e=i.touches[0].pageX,"right"===o.position&&(e=a.width()-e),n=i.touches[0].pageY,"opened"!==o.state&&(e>u||t!==m)||(r=!0,a.on({touchmove:p,touchend:f,touchcancel:p}))}this.options.swipe&&(t||(a.on("touchstart",m),t=m))},
/**
   * 触发组件事件
   * @param name
   */
ee.prototype.triggerEvent=function(t){pt(t,"drawer",this.$element,this)},
/**
   * 动画结束回调
   */
ee.prototype.transitionEnd=function(){this.$element.hasClass("mdui-drawer-open")?(this.state="opened",this.triggerEvent("opened")):(this.state="closed",this.triggerEvent("closed"))},
/**
   * 是否处于打开状态
   */
ee.prototype.isOpen=function(){return"opening"===this.state||"opened"===this.state},
/**
   * 打开抽屉栏
   */
ee.prototype.open=function(){var t=this;this.isOpen()||(this.state="opening",this.triggerEvent("open"),this.options.overlay||R("body").addClass("mdui-drawer-body-"+this.position),this.$element.removeClass("mdui-drawer-close").addClass("mdui-drawer-open").transitionEnd((function(){return t.transitionEnd()})),this.isDesktop()&&!this.options.overlay||(this.overlay=!0,R.showOverlay().one("click",(function(){return t.close()})),R.lockScreen()))},
/**
   * 关闭抽屉栏
   */
ee.prototype.close=function(){var t=this;this.isOpen()&&(this.state="closing",this.triggerEvent("close"),this.options.overlay||R("body").removeClass("mdui-drawer-body-"+this.position),this.$element.addClass("mdui-drawer-close").removeClass("mdui-drawer-open").transitionEnd((function(){return t.transitionEnd()})),this.overlay&&(R.hideOverlay(),this.overlay=!1,R.unlockScreen()))},
/**
   * 切换抽屉栏打开/关闭状态
   */
ee.prototype.toggle=function(){this.isOpen()?this.close():this.open()},
/**
   * 返回当前抽屉栏的状态。共包含四种状态：`opening`、`opened`、`closing`、`closed`
   */
ee.prototype.getState=function(){return this.state},H.Drawer=ee;var ne="mdui-drawer";R((function(){H.mutation("["+ne+"]",(function(){var t=R(this),e=bt(this,ne),n=e.target;
// @ts-ignore
delete e.target;var i=R(n).first(),o=new H.Drawer(i,e);t.on("click",(function(){return o.toggle()}))}))}));var ie={};function oe(t,e){if(v(ie[t])&&(ie[t]=[]),v(e))return ie[t];ie[t].push(e)}
/**
   * 从队列中移除第一个函数，并执行该函数
   * @param name 队列满
   */function se(t){v(ie[t])||ie[t].length&&ie[t].shift()()}var re,ae={history:!0,overlay:!0,modal:!1,closeOnEsc:!0,closeOnCancel:!0,closeOnConfirm:!0,destroyOnClosed:!1},ue=null,ce="_mdui_dialog",le=!1,de=function(t,e){var n=this;void 0===e&&(e={})
/**
       * 配置参数
       */,this.options=Y({},ae),
/**
       * 当前 dialog 的状态
       */
this.state="closed",
/**
       * dialog 元素是否是动态添加的
       */
this.append=!1,this.$element=R(t).first(),
// 如果对话框元素没有在当前文档中，则需要添加
L(document.body,this.$element[0])||(this.append=!0,R("body").append(this.$element)),Y(this.options,e),
// 绑定取消按钮事件
this.$element.find("[mdui-dialog-cancel]").each((function(t,e){R(e).on("click",(function(){n.triggerEvent("cancel"),n.options.closeOnCancel&&n.close()}))})),
// 绑定确认按钮事件
this.$element.find("[mdui-dialog-confirm]").each((function(t,e){R(e).on("click",(function(){n.triggerEvent("confirm"),n.options.closeOnConfirm&&n.close()}))})),
// 绑定关闭按钮事件
this.$element.find("[mdui-dialog-close]").each((function(t,e){R(e).on("click",(function(){return n.close()}))}))};
/**
   * 当前显示的对话框实例
   */
/**
   * 触发组件事件
   * @param name
   */
de.prototype.triggerEvent=function(t){pt(t,"dialog",this.$element,this)},
/**
   * 窗口宽度变化，或对话框内容变化时，调整对话框位置和对话框内的滚动条
   */
de.prototype.readjust=function(){if(ue){var t=ue.$element,e=t.children(".mdui-dialog-title"),n=t.children(".mdui-dialog-content"),i=t.children(".mdui-dialog-actions");
// 调整 dialog 的 top 和 height 值
t.height(""),n.height("");var o=t.height();t.css({top:(vt.height()-o)/2+"px",height:o+"px"}),
// 调整 mdui-dialog-content 的高度
n.innerHeight(o-(e.innerHeight()||0)-(i.innerHeight()||0))}},
/**
   * hashchange 事件触发时关闭对话框
   */
de.prototype.hashchangeEvent=function(){window.location.hash.substring(1).indexOf("mdui-dialog")<0&&ue.close(!0)},
/**
   * 点击遮罩层关闭对话框
   * @param event
   */
de.prototype.overlayClick=function(t){R(t.target).hasClass("mdui-overlay")&&ue&&ue.close()},
/**
   * 动画结束回调
   */
de.prototype.transitionEnd=function(){this.$element.hasClass("mdui-dialog-open")?(this.state="opened",this.triggerEvent("opened")):(this.state="closed",this.triggerEvent("closed"),this.$element.hide(),
// 所有对话框都关闭，且当前没有打开的对话框时，解锁屏幕
oe(ce).length||ue||!le||(R.unlockScreen(),le=!1),vt.off("resize",R.throttle(this.readjust,100)),this.options.destroyOnClosed&&this.destroy())},
/**
   * 打开指定对话框
   */
de.prototype.doOpen=function(){var t=this;if(ue=this,le||(R.lockScreen(),le=!0),this.$element.show(),this.readjust(),vt.on("resize",R.throttle(this.readjust,100)),
// 打开消息框
this.state="opening",this.triggerEvent("open"),this.$element.addClass("mdui-dialog-open").transitionEnd((function(){return t.transitionEnd()})),
// 不存在遮罩层元素时，添加遮罩层
re||(re=R.showOverlay(5100)),
// 点击遮罩层时是否关闭对话框
this.options.modal?re.off("click",this.overlayClick):re.on("click",this.overlayClick),
// 是否显示遮罩层，不显示时，把遮罩层背景透明
re.css("opacity",this.options.overlay?"":0),this.options.history){
// 如果 hash 中原来就有 mdui-dialog，先删除，避免后退历史纪录后仍然有 mdui-dialog 导致无法关闭
// 包括 mdui-dialog 和 &mdui-dialog 和 ?mdui-dialog
var e=window.location.hash.substring(1);e.indexOf("mdui-dialog")>-1&&(e=e.replace(/[&?]?mdui-dialog/g,"")),
// 后退按钮关闭对话框
window.location.hash=e?e+(e.indexOf("?")>-1?"&":"?")+"mdui-dialog":"mdui-dialog",vt.on("hashchange",this.hashchangeEvent)}},
/**
   * 当前对话框是否为打开状态
   */
de.prototype.isOpen=function(){return"opening"===this.state||"opened"===this.state},
/**
   * 打开对话框
   */
de.prototype.open=function(){var t=this;this.isOpen()||(
// 如果当前有正在打开或已经打开的对话框,或队列不为空，则先加入队列，等旧对话框开始关闭时再打开
ue&&("opening"===ue.state||"opened"===ue.state)||oe(ce).length?oe(ce,(function(){return t.doOpen()})):this.doOpen())},
/**
   * 关闭对话框
   */
de.prototype.close=function(t){var e=this;void 0===t&&(t=!1),
// historyBack 是否需要后退历史纪录，默认为 `false`。该参数仅内部使用
// 为 `false` 时是通过 js 关闭，需要后退一个历史记录
// 为 `true` 时是通过后退按钮关闭，不需要后退历史记录
// setTimeout 的作用是：
// 当同时关闭一个对话框，并打开另一个对话框时，使打开对话框的操作先执行，以使需要打开的对话框先加入队列
setTimeout((function(){e.isOpen()&&(ue=null,e.state="closing",e.triggerEvent("close"),
// 所有对话框都关闭，且当前没有打开的对话框时，隐藏遮罩
!oe(ce).length&&re&&(R.hideOverlay(),re=null,
// 若仍存在遮罩，恢复遮罩的 z-index
R(".mdui-overlay").css("z-index",2e3)),e.$element.removeClass("mdui-dialog-open").transitionEnd((function(){return e.transitionEnd()})),e.options.history&&!oe(ce).length&&(t||window.history.back(),vt.off("hashchange",e.hashchangeEvent)),
// 关闭旧对话框，打开新对话框。
// 加一点延迟，仅仅为了视觉效果更好。不加延时也不影响功能
setTimeout((function(){se(ce)}),100))}))},
/**
   * 切换对话框打开/关闭状态
   */
de.prototype.toggle=function(){this.isOpen()?this.close():this.open()},
/**
   * 获取对话框状态。共包含四种状态：`opening`、`opened`、`closing`、`closed`
   */
de.prototype.getState=function(){return this.state},
/**
   * 销毁对话框
   */
de.prototype.destroy=function(){this.append&&this.$element.remove(),oe(ce).length||ue||(re&&(R.hideOverlay(),re=null),le&&(R.unlockScreen(),le=!1))},
/**
   * 对话框内容变化时，需要调用该方法来调整对话框位置和滚动条高度
   */
de.prototype.handleUpdate=function(){this.readjust()},
// esc 按下时关闭对话框
mt.on("keydown",(function(t){ue&&ue.options.closeOnEsc&&"opened"===ue.state&&27===t.keyCode&&ue.close()})),H.Dialog=de;var he="mdui-dialog",fe="_mdui_dialog";R((function(){mt.on("click","["+he+"]",(function(){var t=bt(this,he),e=t.target;
// @ts-ignore
delete t.target;var n=R(e).first(),i=n.data(fe);i||(i=new H.Dialog(n,t),n.data(fe,i)),i.open()}))}));var pe={text:"",bold:!1,close:!0,
// eslint-disable-next-line @typescript-eslint/no-empty-function
onClick:function(){}},me={title:"",content:"",buttons:[],stackedButtons:!1,cssClass:"",history:!0,overlay:!0,modal:!1,closeOnEsc:!0,destroyOnClosed:!0,
// eslint-disable-next-line @typescript-eslint/no-empty-function
onOpen:function(){},
// eslint-disable-next-line @typescript-eslint/no-empty-function
onOpened:function(){},
// eslint-disable-next-line @typescript-eslint/no-empty-function
onClose:function(){},
// eslint-disable-next-line @typescript-eslint/no-empty-function
onClosed:function(){}};H.dialog=function(t){var e,n;
// 合并配置参数
A((t=Y({},me,t)).buttons,(function(e,n){t.buttons[e]=Y({},pe,n)}));
// 按钮的 HTML
var i="";(null===(e=t.buttons)||void 0===e?void 0:e.length)&&(i='<div class="mdui-dialog-actions'+(t.stackedButtons?" mdui-dialog-actions-stacked":"")+'">',A(t.buttons,(function(t,e){i+='<a href="javascript:void(0)" class="mdui-btn mdui-ripple mdui-text-color-primary '+(e.bold?"mdui-btn-bold":"")+'">'+e.text+"</a>"})),i+="</div>");
// Dialog 的 HTML
var o='<div class="mdui-dialog '+t.cssClass+'">'+(t.title?'<div class="mdui-dialog-title">'+t.title+"</div>":"")+(t.content?'<div class="mdui-dialog-content">'+t.content+"</div>":"")+i+"</div>",s=new H.Dialog(o,{history:t.history,overlay:t.overlay,modal:t.modal,closeOnEsc:t.closeOnEsc,destroyOnClosed:t.destroyOnClosed});
// 实例化 Dialog
// 绑定按钮事件
return(null===(n=t.buttons)||void 0===n?void 0:n.length)&&s.$element.find(".mdui-dialog-actions .mdui-btn").each((function(e,n){R(n).on("click",(function(){t.buttons[e].onClick(s),t.buttons[e].close&&s.close()}))})),
// 绑定打开关闭事件
s.$element.on("open.mdui.dialog",(function(){t.onOpen(s)})).on("opened.mdui.dialog",(function(){t.onOpened(s)})).on("close.mdui.dialog",(function(){t.onClose(s)})).on("closed.mdui.dialog",(function(){t.onClosed(s)})),s.open(),s};var ve={confirmText:"ok",history:!0,modal:!1,closeOnEsc:!0,closeOnConfirm:!0};H.alert=function(t,e,n,i){return f(e)&&(i=n,n=e,e=""),v(n)&&(
// eslint-disable-next-line @typescript-eslint/no-empty-function
n=function(){}),v(i)&&(i={}),i=Y({},ve,i),H.dialog({title:e,content:t,buttons:[{text:i.confirmText,bold:!1,close:i.closeOnConfirm,onClick:n}],cssClass:"mdui-dialog-alert",history:i.history,modal:i.modal,closeOnEsc:i.closeOnEsc})};var ge={confirmText:"ok",cancelText:"cancel",history:!0,modal:!1,closeOnEsc:!0,closeOnCancel:!0,closeOnConfirm:!0};H.confirm=function(t,e,n,i,o){return f(e)&&(o=i,i=n,n=e,e=""),v(n)&&(
// eslint-disable-next-line @typescript-eslint/no-empty-function
n=function(){}),v(i)&&(
// eslint-disable-next-line @typescript-eslint/no-empty-function
i=function(){}),v(o)&&(o={}),o=Y({},ge,o),H.dialog({title:e,content:t,buttons:[{text:o.cancelText,bold:!1,close:o.closeOnCancel,onClick:i},{text:o.confirmText,bold:!1,close:o.closeOnConfirm,onClick:n}],cssClass:"mdui-dialog-confirm",history:o.history,modal:o.modal,closeOnEsc:o.closeOnEsc})};var ye={confirmText:"ok",cancelText:"cancel",history:!0,modal:!1,closeOnEsc:!0,closeOnCancel:!0,closeOnConfirm:!0,type:"text",maxlength:0,defaultValue:"",confirmOnEnter:!1};H.prompt=function(t,e,n,i,o){f(e)&&(o=i,i=n,n=e,e=""),v(n)&&(
// eslint-disable-next-line @typescript-eslint/no-empty-function
n=function(){}),v(i)&&(
// eslint-disable-next-line @typescript-eslint/no-empty-function
i=function(){}),v(o)&&(o={});var s='<div class="mdui-textfield">'+(t?'<label class="mdui-textfield-label">'+t+"</label>":"")+("text"===(o=Y({},ye,o)).type?'<input class="mdui-textfield-input" type="text" value="'+o.defaultValue+'" '+(o.maxlength?'maxlength="'+o.maxlength+'"':"")+"/>":"")+("textarea"===o.type?'<textarea class="mdui-textfield-input" '+(o.maxlength?'maxlength="'+o.maxlength+'"':"")+">"+o.defaultValue+"</textarea>":"")+"</div>";return H.dialog({title:e,content:s,buttons:[{text:o.cancelText,bold:!1,close:o.closeOnCancel,onClick:function(t){var e=t.$element.find(".mdui-textfield-input").val();i(e,t)}},{text:o.confirmText,bold:!1,close:o.closeOnConfirm,onClick:function(t){var e=t.$element.find(".mdui-textfield-input").val();n(e,t)}}],cssClass:"mdui-dialog-prompt",history:o.history,modal:o.modal,closeOnEsc:o.closeOnEsc,onOpen:function(t){
// 初始化输入框
var e=t.$element.find(".mdui-textfield-input");H.updateTextFields(e),
// 聚焦到输入框
e[0].focus(),
// 捕捉文本框回车键，在单行文本框的情况下触发回调
"textarea"!==o.type&&!0===o.confirmOnEnter&&e.on("keydown",(function(e){if(13===e.keyCode){var i=t.$element.find(".mdui-textfield-input").val();return n(i,t),o.closeOnConfirm&&t.close(),!1}})),
// 如果是多行输入框，监听输入框的 input 事件，更新对话框高度
"textarea"===o.type&&e.on("input",(function(){return t.handleUpdate()})),
// 有字符数限制时，加载完文本框后 DOM 会变化，需要更新对话框高度
o.maxlength&&t.handleUpdate()}})};var be={position:"auto",delay:0,content:""},xe=function(t,e){void 0===e&&(e={})
/**
       * 配置参数
       */,this.options=Y({},be),
/**
       * 当前 tooltip 的状态
       */
this.state="closed",
/**
       * setTimeout 的返回值
       */
this.timeoutId=null,this.$target=R(t).first(),Y(this.options,e),
// 创建 Tooltip HTML
this.$element=R('<div class="mdui-tooltip" id="'+R.guid()+'">'+this.options.content+"</div>").appendTo(document.body);
// 绑定事件。元素处于 disabled 状态时无法触发鼠标事件，为了统一，把 touch 事件也禁用
// eslint-disable-next-line @typescript-eslint/no-this-alias
var n=this;this.$target.on("touchstart mouseenter",(function(t){n.isDisabled(this)||Rt(t)&&(Ht(t),n.open())})).on("touchend mouseleave",(function(t){n.isDisabled(this)||Rt(t)&&n.close()})).on(At,(function(t){n.isDisabled(this)||Ht(t)}))};
/**
   * 元素是否已禁用
   * @param element
   */
xe.prototype.isDisabled=function(t){return t.disabled||void 0!==R(t).attr("disabled")},
/**
   * 是否是桌面设备
   */
xe.prototype.isDesktop=function(){return vt.width()>1024},
/**
   * 设置 Tooltip 的位置
   */
xe.prototype.setPosition=function(){var t,e,n=this.$target[0].getBoundingClientRect(),i=this.isDesktop()?14:24,o=this.$element[0].offsetWidth,s=this.$element[0].offsetHeight,r=this.options.position;
// 设置位置
switch(
// 自动判断位置，加 2px，使 Tooltip 距离窗口边框至少有 2px 的间距
"auto"===r&&(r=n.top+n.height+i+s+2<vt.height()?"bottom":i+s+2<n.top?"top":i+o+2<n.left?"left":n.width+i+o+2<vt.width()-n.left?"right":"bottom"),r){case"bottom":t=o/2*-1,e=n.height/2+i,this.$element.transformOrigin("top center");break;case"top":t=o/2*-1,e=-1*(s+n.height/2+i),this.$element.transformOrigin("bottom center");break;case"left":t=-1*(o+n.width/2+i),e=s/2*-1,this.$element.transformOrigin("center right");break;case"right":t=n.width/2+i,e=s/2*-1,this.$element.transformOrigin("center left")}var a=this.$target.offset();this.$element.css({top:a.top+n.height/2+"px",left:a.left+n.width/2+"px","margin-left":t+"px","margin-top":e+"px"})},
/**
   * 触发组件事件
   * @param name
   */
xe.prototype.triggerEvent=function(t){pt(t,"tooltip",this.$target,this)},
/**
   * 动画结束回调
   */
xe.prototype.transitionEnd=function(){this.$element.hasClass("mdui-tooltip-open")?(this.state="opened",this.triggerEvent("opened")):(this.state="closed",this.triggerEvent("closed"))},
/**
   * 当前 tooltip 是否为打开状态
   */
xe.prototype.isOpen=function(){return"opening"===this.state||"opened"===this.state},
/**
   * 执行打开 tooltip
   */
xe.prototype.doOpen=function(){var t=this;this.state="opening",this.triggerEvent("open"),this.$element.addClass("mdui-tooltip-open").transitionEnd((function(){return t.transitionEnd()}))},
/**
   * 打开 Tooltip
   * @param options 允许每次打开时设置不同的参数
   */
xe.prototype.open=function(t){var e=this;if(!this.isOpen()){var n=Y({},this.options);t&&Y(this.options,t),
// tooltip 的内容有更新
n.content!==this.options.content&&this.$element.html(this.options.content),this.setPosition(),this.options.delay?this.timeoutId=setTimeout((function(){return e.doOpen()}),this.options.delay):(this.timeoutId=null,this.doOpen())}},
/**
   * 关闭 Tooltip
   */
xe.prototype.close=function(){var t=this;this.timeoutId&&(clearTimeout(this.timeoutId),this.timeoutId=null),this.isOpen()&&(this.state="closing",this.triggerEvent("close"),this.$element.removeClass("mdui-tooltip-open").transitionEnd((function(){return t.transitionEnd()})))},
/**
   * 切换 Tooltip 的打开状态
   */
xe.prototype.toggle=function(){this.isOpen()?this.close():this.open()},
/**
   * 获取 Tooltip 状态。共包含四种状态：`opening`、`opened`、`closing`、`closed`
   */
xe.prototype.getState=function(){return this.state},H.Tooltip=xe;var Ce="mdui-tooltip",we="_mdui_tooltip";R((function(){
// mouseenter 不能冒泡，所以这里用 mouseover 代替
mt.on("touchstart mouseover","["+Ce+"]",(function(){var t=R(this),e=t.data(we);e||(e=new H.Tooltip(this,bt(this,Ce)),t.data(we,e))}))}));var $e={message:"",timeout:4e3,position:"bottom",buttonText:"",buttonColor:"",closeOnButtonClick:!0,closeOnOutsideClick:!0,
// eslint-disable-next-line @typescript-eslint/no-empty-function
onClick:function(){},
// eslint-disable-next-line @typescript-eslint/no-empty-function
onButtonClick:function(){},
// eslint-disable-next-line @typescript-eslint/no-empty-function
onOpen:function(){},
// eslint-disable-next-line @typescript-eslint/no-empty-function
onOpened:function(){},
// eslint-disable-next-line @typescript-eslint/no-empty-function
onClose:function(){},
// eslint-disable-next-line @typescript-eslint/no-empty-function
onClosed:function(){}},Ee=null,Oe="_mdui_snackbar",ke=function(t){
/**
       * 配置参数
       */
this.options=Y({},$e),
/**
       * 当前 Snackbar 的状态
       */
this.state="closed",
/**
       * setTimeout 的 ID
       */
this.timeoutId=null,Y(this.options,t);
// 按钮颜色
var e="",n="";0===this.options.buttonColor.indexOf("#")||0===this.options.buttonColor.indexOf("rgb")?e='style="color:'+this.options.buttonColor+'"':""!==this.options.buttonColor&&(n="mdui-text-color-"+this.options.buttonColor),
// 添加 HTML
this.$element=R('<div class="mdui-snackbar"><div class="mdui-snackbar-text">'+this.options.message+"</div>"+(this.options.buttonText?'<a href="javascript:void(0)" class="mdui-snackbar-action mdui-btn mdui-ripple mdui-ripple-white '+n+'" '+e+">"+this.options.buttonText+"</a>":"")+"</div>").appendTo(document.body),
// 设置位置
this.setPosition("close"),this.$element.reflow().addClass("mdui-snackbar-"+this.options.position)};
/**
   * 当前打开着的 Snackbar
   */
/**
   * layer 的 HTML 结构
   * @param index
   */
function _e(t){return void 0===t&&(t=!1),'<div class="mdui-spinner-layer '+(t?"mdui-spinner-layer-"+t:"")+'"><div class="mdui-spinner-circle-clipper mdui-spinner-left"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-gap-patch"><div class="mdui-spinner-circle"></div></div><div class="mdui-spinner-circle-clipper mdui-spinner-right"><div class="mdui-spinner-circle"></div></div></div>'}
/**
   * 填充 HTML
   * @param spinner
   */function Te(t){var e=R(t),n=e.hasClass("mdui-spinner-colorful")?_e(1)+_e(2)+_e(3)+_e(4):_e();e.html(n)}
/**
   * 点击 Snackbar 外面的区域关闭
   * @param event
   */
ke.prototype.closeOnOutsideClick=function(t){var e=R(t.target);e.hasClass("mdui-snackbar")||e.parents(".mdui-snackbar").length||Ee.close()},
/**
   * 设置 Snackbar 的位置
   * @param state
   */
ke.prototype.setPosition=function(t){var e,n,i=this.$element[0].clientHeight,o=this.options.position;
// translateX
e="bottom"===o||"top"===o?"-50%":"0",
// translateY
"open"===t?n="0":("bottom"===o&&(n=i),"top"===o&&(n=-i),"left-top"!==o&&"right-top"!==o||(n=-i-24),"left-bottom"!==o&&"right-bottom"!==o||(n=i+24)),this.$element.transform("translate("+e+","+n+"px")},
/**
   * 打开 Snackbar
   */
ke.prototype.open=function(){var t=this;"opening"!==this.state&&"opened"!==this.state&&(
// 如果当前有正在显示的 Snackbar，则先加入队列，等旧 Snackbar 关闭后再打开
Ee?oe(Oe,(function(){return t.open()})):(Ee=this,
// 开始打开
this.state="opening",this.options.onOpen(this),this.setPosition("open"),this.$element.transitionEnd((function(){"opening"===t.state&&(t.state="opened",t.options.onOpened(t),
// 有按钮时绑定事件
t.options.buttonText&&t.$element.find(".mdui-snackbar-action").on("click",(function(){t.options.onButtonClick(t),t.options.closeOnButtonClick&&t.close()})),
// 点击 snackbar 的事件
t.$element.on("click",(function(e){R(e.target).hasClass("mdui-snackbar-action")||t.options.onClick(t)})),
// 点击 Snackbar 外面的区域关闭
t.options.closeOnOutsideClick&&mt.on(It,t.closeOnOutsideClick),
// 超时后自动关闭
t.options.timeout&&(t.timeoutId=setTimeout((function(){return t.close()}),t.options.timeout)))}))))},
/**
   * 关闭 Snackbar
   */
ke.prototype.close=function(){var t=this;"closing"!==this.state&&"closed"!==this.state&&(this.timeoutId&&clearTimeout(this.timeoutId),this.options.closeOnOutsideClick&&mt.off(It,this.closeOnOutsideClick),this.state="closing",this.options.onClose(this),this.setPosition("close"),this.$element.transitionEnd((function(){"closing"===t.state&&(Ee=null,t.state="closed",t.options.onClosed(t),t.$element.remove(),se(Oe))})))},H.snackbar=function(t,e){void 0===e&&(e={}),p(t)?e.message=t:e=t;var n=new ke(e);return n.open(),n},R((function(){
// 切换导航项
mt.on("click",".mdui-bottom-nav>a",(function(){var t=R(this),e=t.parent();e.children("a").each((function(n,i){var o=t.is(i);o&&pt("change","bottomNav",e[0],void 0,{index:n}),o?R(i).addClass("mdui-bottom-nav-active"):R(i).removeClass("mdui-bottom-nav-active")}))})),
// 滚动时隐藏 mdui-bottom-nav-scroll-hide
H.mutation(".mdui-bottom-nav-scroll-hide",(function(){new H.Headroom(this,{pinnedClass:"mdui-headroom-pinned-down",unpinnedClass:"mdui-headroom-unpinned-down"})}))})),R((function(){
// 页面加载完后自动填充 HTML 结构
H.mutation(".mdui-spinner",(function(){Te(this)}))})),H.updateSpinners=function(t){(v(t)?R(".mdui-spinner"):R(t)).each((function(){Te(this)}))};var Ie={position:"auto",align:"auto",gutter:16,fixed:!1,covered:"auto",subMenuTrigger:"hover",subMenuDelay:200},Se=function(t,e,n){var i=this;
// 触发菜单的元素 和 菜单必须是同级的元素，否则菜单可能不能定位
if(void 0===n&&(n={})
/**
       * 配置参数
       */,this.options=Y({},Ie),
/**
       * 当前菜单状态
       */
this.state="closed",this.$anchor=R(t).first(),this.$element=R(e).first(),!this.$anchor.parent().is(this.$element.parent()))throw new Error("anchorSelector and menuSelector must be siblings");Y(this.options,n),
// 是否是级联菜单
this.isCascade=this.$element.hasClass("mdui-menu-cascade"),
// covered 参数处理
this.isCovered="auto"===this.options.covered?!this.isCascade:this.options.covered,
// 点击触发菜单切换
this.$anchor.on("click",(function(){return i.toggle()})),
// 点击菜单外面区域关闭菜单
mt.on("click touchstart",(function(t){var e=R(t.target);!i.isOpen()||e.is(i.$element)||L(i.$element[0],e[0])||e.is(i.$anchor)||L(i.$anchor[0],e[0])||i.close()}));
// 点击不含子菜单的菜单条目关闭菜单
// eslint-disable-next-line @typescript-eslint/no-this-alias
var o=this;mt.on("click",".mdui-menu-item",(function(){var t=R(this);t.find(".mdui-menu").length||void 0!==t.attr("disabled")||o.close()})),
// 绑定点击或鼠标移入含子菜单的条目的事件
this.bindSubMenuEvent(),
// 窗口大小变化时，重新调整菜单位置
vt.on("resize",R.throttle((function(){return i.readjust()}),100))};
/**
   * 是否为打开状态
   */
Se.prototype.isOpen=function(){return"opening"===this.state||"opened"===this.state},
/**
   * 触发组件事件
   * @param name
   */
Se.prototype.triggerEvent=function(t){pt(t,"menu",this.$element,this)},
/**
   * 调整主菜单位置
   */
Se.prototype.readjust=function(){var t,e,n,i,o,s,r=vt.height(),a=vt.width(),u=this.options.gutter,c=this.isCovered,l=this.options.fixed,d=this.$element.width(),h=this.$element.height(),f=this.$anchor[0].getBoundingClientRect(),p=f.top,m=f.left,v=f.height,g=f.width,y=r-p-v,b=a-m-g,x=this.$anchor[0].offsetTop,C=this.$anchor[0].offsetLeft;
// 设置菜单位置
if(
// 自动判断菜单位置
// 判断下方是否放得下菜单
n="auto"===this.options.position?y+(c?v:0)>h+u?"bottom":p+(c?v:0)>h+u?"top":"center":this.options.position,
// 自动判断菜单对齐方式
// 判断右侧是否放得下菜单
i="auto"===this.options.align?b+g>d+u?"left":m+g>d+u?"right":"center":this.options.align,"bottom"===n)s="0",e=(c?0:v)+(l?p:x);else if("top"===n)s="100%",e=(c?v:0)+(l?p-h:x-h);else{s="50%";
// =====================在窗口中居中
// 显示的菜单的高度，简单菜单高度不超过窗口高度，若超过了则在菜单内部显示滚动条
// 级联菜单内部不允许出现滚动条
var w=h;
// 简单菜单比窗口高时，限制菜单高度
this.isCascade||h+2*u>r&&(w=r-2*u,this.$element.height(w)),e=(r-w)/2+(l?0:x-p)}
// 设置菜单对齐方式
if(this.$element.css("top",e+"px"),"left"===i)o="0",t=l?m:C;else if("right"===i)o="100%",t=l?m+g-d:C+g-d;else{o="50%";
//=======================在窗口中居中
// 显示的菜单的宽度，菜单宽度不能超过窗口宽度
var $=d;
// 菜单比窗口宽，限制菜单宽度
d+2*u>a&&($=a-2*u,this.$element.width($)),t=(a-$)/2+(l?0:C-m)}this.$element.css("left",t+"px"),
// 设置菜单动画方向
this.$element.transformOrigin(o+" "+s)},
/**
   * 调整子菜单的位置
   * @param $submenu
   */
Se.prototype.readjustSubmenu=function(t){var e,n,i,o,s,r,a=t.parent(".mdui-menu-item"),u=vt.height(),c=vt.width(),l=t.width(),d=t.height(),h=a[0].getBoundingClientRect(),f=h.width,p=h.height,m=h.left,v=h.top;
// 判断菜单左右位置
// 判断右侧是否放得下菜单
o=c-m-f>l?"left":m>l?"right":"left",
// 设置菜单位置
"bottom"===(
// 判断菜单上下位置
// 判断下方是否放得下菜单
i=u-v>d?"bottom":v+p>d?"top":"bottom")?(r="0",e="0"):"top"===i&&(r="100%",e=-d+p),t.css("top",e+"px"),
// 设置菜单对齐方式
"left"===o?(s="0",n=f):"right"===o&&(s="100%",n=-l),t.css("left",n+"px"),
// 设置菜单动画方向
t.transformOrigin(s+" "+r)},
/**
   * 打开子菜单
   * @param $submenu
   */
Se.prototype.openSubMenu=function(t){this.readjustSubmenu(t),t.addClass("mdui-menu-open").parent(".mdui-menu-item").addClass("mdui-menu-item-active")},
/**
   * 关闭子菜单，及其嵌套的子菜单
   * @param $submenu
   */
Se.prototype.closeSubMenu=function(t){
// 关闭子菜单
t.removeClass("mdui-menu-open").addClass("mdui-menu-closing").transitionEnd((function(){return t.removeClass("mdui-menu-closing")})).parent(".mdui-menu-item").removeClass("mdui-menu-item-active"),
// 循环关闭嵌套的子菜单
t.find(".mdui-menu").each((function(t,e){var n=R(e);n.removeClass("mdui-menu-open").addClass("mdui-menu-closing").transitionEnd((function(){return n.removeClass("mdui-menu-closing")})).parent(".mdui-menu-item").removeClass("mdui-menu-item-active")}))},
/**
   * 切换子菜单状态
   * @param $submenu
   */
Se.prototype.toggleSubMenu=function(t){t.hasClass("mdui-menu-open")?this.closeSubMenu(t):this.openSubMenu(t)},
/**
   * 绑定子菜单事件
   */
Se.prototype.bindSubMenuEvent=function(){
// eslint-disable-next-line @typescript-eslint/no-this-alias
var t=this;
// 点击打开子菜单
if(this.$element.on("click",".mdui-menu-item",(function(e){var n=R(this),i=R(e.target);
// 禁用状态菜单不操作
if(void 0===n.attr("disabled")&&!i.is(".mdui-menu")&&!i.is(".mdui-divider")&&i.parents(".mdui-menu-item").first().is(n))
// 阻止冒泡，点击菜单项时只在最后一级的 mdui-menu-item 上生效，不向上冒泡
{
// 当前菜单的子菜单
var o=n.children(".mdui-menu");
// 先关闭除当前子菜单外的所有同级子菜单
n.parent(".mdui-menu").children(".mdui-menu-item").each((function(e,n){var i=R(n).children(".mdui-menu");!i.length||o.length&&i.is(o)||t.closeSubMenu(i)})),
// 切换当前子菜单
o.length&&t.toggleSubMenu(o)}
// 没有点击在子菜单的菜单项上时，不操作（点在了子菜单的空白区域、或分隔线上）
})),"hover"===this.options.subMenuTrigger){
// 临时存储 setTimeout 对象
var e=null,n=null;this.$element.on("mouseover mouseout",".mdui-menu-item",(function(i){var o=R(this),s=i.type,r=R(i.relatedTarget);
// 禁用状态的菜单不操作
if(void 0===o.attr("disabled")){
// 用 mouseover 模拟 mouseenter
if("mouseover"===s){if(!o.is(r)&&L(o[0],r[0]))return}else if("mouseout"===s&&(o.is(r)||L(o[0],r[0])))return;
// 当前菜单项下的子菜单，未必存在
var a=o.children(".mdui-menu");
// 鼠标移入菜单项时，显示菜单项下的子菜单
if("mouseover"===s){if(a.length){
// 当前子菜单准备打开时，如果当前子菜单正准备着关闭，不用再关闭了
var u=a.data("timeoutClose.mdui.menu");
// 如果当前子菜单已经打开，不操作
if(u&&clearTimeout(u),a.hasClass("mdui-menu-open"))return;
// 当前子菜单准备打开时，其他准备打开的子菜单不用再打开了
clearTimeout(n),
// 准备打开当前子菜单
e=n=setTimeout((function(){return t.openSubMenu(a)}),t.options.subMenuDelay),a.data("timeoutOpen.mdui.menu",e)}}else if("mouseout"===s&&a.length){
// 鼠标移出菜单项时，如果当前菜单项下的子菜单正准备打开，不用再打开了
var c=a.data("timeoutOpen.mdui.menu");c&&clearTimeout(c),
// 准备关闭当前子菜单
e=setTimeout((function(){return t.closeSubMenu(a)}),t.options.subMenuDelay),a.data("timeoutClose.mdui.menu",e)}}}))}},
/**
   * 动画结束回调
   */
Se.prototype.transitionEnd=function(){this.$element.removeClass("mdui-menu-closing"),"opening"===this.state&&(this.state="opened",this.triggerEvent("opened")),"closing"===this.state&&(this.state="closed",this.triggerEvent("closed"),
// 关闭后，恢复菜单样式到默认状态，并恢复 fixed 定位
this.$element.css({top:"",left:"",width:"",position:"fixed"}))},
/**
   * 切换菜单状态
   */
Se.prototype.toggle=function(){this.isOpen()?this.close():this.open()},
/**
   * 打开菜单
   */
Se.prototype.open=function(){var t=this;this.isOpen()||(this.state="opening",this.triggerEvent("open"),this.readjust(),this.$element.css("position",this.options.fixed?"fixed":"absolute").addClass("mdui-menu-open").transitionEnd((function(){return t.transitionEnd()})))},
/**
   * 关闭菜单
   */
Se.prototype.close=function(){var t=this;this.isOpen()&&(this.state="closing",this.triggerEvent("close"),
// 菜单开始关闭时，关闭所有子菜单
this.$element.find(".mdui-menu").each((function(e,n){t.closeSubMenu(R(n))})),this.$element.removeClass("mdui-menu-open").addClass("mdui-menu-closing").transitionEnd((function(){return t.transitionEnd()})))},H.Menu=Se;var je="mdui-menu",Me="_mdui_menu";return R((function(){mt.on("click","["+je+"]",(function(){var t=R(this),e=t.data(Me);if(!e){var n=bt(this,je),i=n.target;
// @ts-ignore
delete n.target,e=new H.Menu(t,i,n),t.data(Me,e),e.toggle()}}))})),H}));
//# sourceMappingURL=mdui.js.map