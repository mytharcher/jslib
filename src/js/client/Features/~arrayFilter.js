/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-01-15 by mytharcher
 * 
 * update:
 */

/**
 * @ignore
 * 修复数组没有filter函数
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/filter
 */
if (!Array.prototype.filter) {
	/**
	 * @class Array
	 */
	
	/**
	 * 根据条件过滤数组
	 * @method filter
	 * @param {Function} fun 要执行的操作函数
	 * @param {Object} thisp 可选，指定函数执行的作用域
	 * @return {Array} 返回通过过滤条件的元素组成的副本数组
	 */
	Array.prototype.filter = function(fun /*, thisp */){
		"use strict";
		if (typeof this == 'undefined' || this === null) 
			throw new TypeError();
		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun !== "function") 
			throw new TypeError();
		var res = [];
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in t) {
				var val = t[i]; // in case fun mutates this
				if (fun.call(thisp, val, i, t)) 
					res.push(val);
			}
		}
		return res;
	};
}