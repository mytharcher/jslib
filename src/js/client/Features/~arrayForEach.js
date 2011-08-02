/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-15 by mytharcher
 * 
 * update:
 * @2010-12-27 by mytharcher
 */

/**
 * @ignore
 * 修复数组没有forEach函数
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
 */
if (!Array.prototype.forEach) {
	/**
	 * @class Array
	 */
	
	/**
	 * 对数组每一项执行操作
	 * @method forEach
	 * @param {Function} fun 要执行的操作函数
	 * @param {Object} thisp 可选，指定函数执行的作用域
	 */
	Array.prototype.forEach = function(fun /*, thisp */){
		"use strict";
		
		if (typeof this == 'undefined' || this === null) 
			throw new TypeError();
		
		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function") 
			throw new TypeError();
		
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in t) 
				fun.call(thisp, t[i], i, t);
		}
	};
}