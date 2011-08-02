/*
 * jslib JavaScript Library
 * 
 * create: 
 * @2010-12-09 by mytharcher
 * 
 * update:
 */

///import js.util;
///import js.util.Type;

/**
 * @class js.util.Type
 */
js.util.Type.extend({
	/**
	 * 窗口对象类型标识
	 * @static
	 * @property WINDOW
	 * @type {String}
	 */
	/**
	 * 判断对象是否是window对象
	 * @method isWindow
	 * @param {Any} 要判断的对象
	 * @return {Boolean} 是window对象的话返回true，否返回false。
	 */
	'Window': function(obj){
		//解决IEMMNNM 
		return obj == obj.self;
	}
});