/*
 * js Javascript Library
 * 
 * craete:
 * @2010-11-07 by mytharcher
 * 
 * update:
 * @2010-11-16 by mytharcher
 * @2010-12-26 by mytharcher
 */

///import js.client.Browser;

/**
 * @ignore
 * form: http://arguments.callee.info/2008/11/10/passing-arguments-to-settimeout-and-setinterval/
 * 
 * 解决ie下setInterval不能传参数的问题
 * 但在IE8下仅能使用window.setInterval调用
 */
if (js.client.Browser.IE) {
	(function (oSetInterval, host) {
		host.setInterval = function(fn, time){
			var args = [].slice.call(arguments, 2);
			return oSetInterval(function(){
				fn.apply(this, args);
			}, time);
		};
	})(setInterval, this);
}