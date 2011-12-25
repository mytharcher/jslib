/*
 * jslib JavaScript Library
 * 
 * create: 
 * @2010-12-09 by mytharcher
 * 
 * update:
 * @2011-08-13 by mytharcher
 * 		[m] Update comments.
 */

///import js.util.Type;

/**
 * @class js.util.Type
 */
js.util.Type.extend({
	/**
	 * 窗口对象类型标识
	 * @property js.util.Type.WINDOW
	 * @type {String}
	 */
	/**
	 * 判断对象是否是window对象
	 * @method js.util.Type.isWindow
	 * @static
	 * 
	 * @param {Any} 要判断的对象
	 * 
	 * @return {Boolean} 是window对象的话返回true，否返回false。
	 */
	'Window': function(obj){
		//解决IEMMNNM 
		return obj == obj.self;
	}
});