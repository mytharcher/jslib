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
	 * DOM元素类型标识
	 * @property js.util.Type.ELEMENT
	 * @type {String}
	 */
	/**
	 * 判断对象是否是HTML元素
	 * @method js.util.Type.isElement
	 * @static
	 * 
	 * @param {Object} 要判断的对象
	 * 
	 * @return {Boolean} 是返回true，否返回false。
	 */
	'Element': function(obj){
		return !!(obj && obj.nodeType == 1 && obj.nodeName);
		return Object(obj) instanceof Element;
	}
});