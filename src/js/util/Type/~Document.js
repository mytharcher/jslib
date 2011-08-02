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
	 * 文档对象类型标识
	 * @static
	 * @property DOCUMENT
	 * @type {String}
	 */
	/**
	 * 判断对象是否是document对象
	 * @method isDocument
	 * @param {Any} 要判断的对象
	 * @return {Boolean} 是返回true，否返回false。
	 */
	'Document': function (obj) {
		return obj && obj.nodeType == 9;
	}
});