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

/**
 * @ignore
 * 修复Object没有keys函数
 */
if (!Object.keys) {
	/**
	 * @class Object
	 */
	
	/**
	 * 返回对象上所有可枚举的属性名组成的数组
	 * @method Object.keys
	 * @static
	 * @param {Object} o
	 * @return {Array}
	 */
	Object.keys = function (o) {
		var result = [];
		for(var name in o) {
			if (o.hasOwnProperty(name))
				result.push(name);
		}
		return result;
	}
}