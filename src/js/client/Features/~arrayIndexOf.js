/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-02-27 by mytharcher
 * 
 * update:
 * @2010-12-27 by mytharcher
 * 		[m] Simplify the code.
 */

/**
 * @ignore
 * 修复数组没有indexOf函数
 * https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
 */
if (!Array.prototype.indexOf) {
	/**
	 * @class Array
	 */
	
	/**
	 * 在数组中查找一个元素第一次出现的索引位置。
	 * @method indexOf
	 * @param {Any} searchElement
	 * @param {Number}  fromIndex
	 * @return {Number}
	 */
	Array.prototype.indexOf = function(searchElement /*, fromIndex */){
		"use strict";
		
		if (typeof this == 'undefined' || this === null) 
			throw new TypeError();
		
		var t = Object(this);
		var len = t.length >>> 0;
		if (len === 0) 
			return -1;
		
		var n = 0;
		if (arguments.length > 0) {
			n = Number(arguments[1]);
			if (n !== n) 
				n = 0;
			else 
				if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) 
					n = (n > 0 || -1) * Math.floor(Math.abs(n));
		}
		
		if (n >= len) 
			return -1;
		
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		
		for (; k < len; k++) {
			if (k in t && t[k] === searchElement) 
				return k;
		}
		return -1;
	};
}