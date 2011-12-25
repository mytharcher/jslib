/*
 * jslib JavaScript Library
 * 
 * create: 
 * @2011-09-27 by mytharcher
 * 
 * update:
 */

///import js.util.Type;
///import js.util.XArray;

/**
 * @class js.util.Type
 */
js.util.Type.extend({
	/**
	 * XArray类型标识
	 * @property js.util.Type.XArray
	 * @type {String}
	 */
	/**
	 * 判断对象是否是XArray实例
	 * @method js.util.Type.isXArray
	 * @static
	 * 
	 * @param {Object} 要判断的对象
	 * 
	 * @return {Boolean} 是返回true，否返回false。
	 */
	'XArray': function(obj){
		return obj instanceof js.util.XArray;
	}
});