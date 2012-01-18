/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-17 by mytharcher
 * 
 * update:
 * @2010-11-19 by mytharcher
 * @2010-11-30 by mytharcher
 * @2011-09-25 by mytharcher
 * 		[m] Move 'css()' method out of interface factory to be a single implement.
 */

///import js.util.Class;
///import js.dom;
///import js.dom.Node;
///import js.dom.Style;
///import js.dom.NodeInterfaceFactory;

/*
 * @class js.dom.INodeStyle
 * Node类实现Style的接口类
 * @interface
 * @singleton
 */
/**
 * @class js.dom.Node
 */

/**
 * 获取当前集合首个元素的指定样式
 * @method getStyle
 * @param {String} key 要获取的样式名称
 * @return {String} 返回样式的值
 */
/**
 * 设置当前元素集合的样式
 * @method setStyle
 * @param {String/Object} key 要设置的样式名称，或多个要设置的键值对
 * @param {String/undefined} value 要设置的样式值
 * @return {Node} 返回当前集合对象，供链式操作继续调用
 */
js.dom.INodeStyle = js.dom.INodeStyle || js.dom.NodeInterfaceFactory.create({
	name: 'Style',
	base: js.dom.Style,
	methods: [
		{method: 'get', single: true},
		'set'
	]
});

js.dom.INodeStyle.css = function (key, value) {
	if (arguments.length <= 1) {
		if (typeof key == 'undefined' || typeof key == 'string' && key.indexOf(':') < 0) {
			return this.getStyle(key);
		} else {
			return this.setStyle(key);
		}
	} else {
		return this.setStyle(key, value);
	}
};

js.util.Class.implement(js.dom.Node, js.dom.INodeStyle);