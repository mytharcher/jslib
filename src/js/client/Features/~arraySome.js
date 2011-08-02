/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-01-14 by mytharcher
 * 
 * update:
 */

/**
 * @ignore
 * 修复数组没有some函数
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
 */
if (!Array.prototype.some) {
	/**
	 * @class Array
	 */
	
	/**
	 * 测试数组中是否至少有一个元素能通过提供的测试函数
	 * @method some
	 * @param {Function} fun 要执行的测试函数
	 * @param {Object} thisp 可选，指定函数执行的作用域
	 * @return {Boolean} 如果有通过检测的元素，则返回true；如果一个都没有，则返回false。
	 */
	Array.prototype.some = function(fun /*, thisp */) {
		"use strict";
		
		if (typeof this == 'undefined' || this === null)
			throw new TypeError();
		
		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function")
			throw new TypeError();
		
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in t && fun.call(thisp, t[i], i, t))
				return true;
		}
		
		return false;
	};
}