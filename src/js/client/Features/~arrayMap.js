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
 * 修复数组没有map函数
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/map
 */
if (!Array.prototype.map){
	/**
	 * @class Array
	 */
	
	/**
	 * 对数组每一项执行操作，并返回每一个操作的返回值组成的数组
	 * @method map
	 * @param {Function} fun 要执行的操作函数
	 * @param {Object} thisp 可选，指定函数执行的作用域
	 * @return {Array}
	 */
	Array.prototype.map = function(fun /*, thisp */){
		"use strict";
		
		if (typeof this == 'undefined' || this === null) 
			throw new TypeError();
		
		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function") 
			throw new TypeError();
		
		var res = new Array(len);
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in t) 
				res[i] = fun.call(thisp, t[i], i, t);
		}
		
		return res;
	};
}