/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-17 by mytharcher
 * 
 * update:
 * @2010-11-19 by mytharcher
 * @2010-11-30 by mytharcher
 * 
 */

///import js.util.Class;
///import js.dom;
///import js.dom.Node;
///import js.dom.Attribute;
///import js.dom.NodeInterfaceFactory;

/*
 * @class js.dom.INodeAttribute
 * Node类实现Style的接口类
 * @interface
 * @singleton
 */
/**
 * @class js.dom.Node
 */

/**
 * 获取当前集合首个元素的指定属性
 * @method getAttribute
 * @param {String} key 要获取的属性名称
 * @return {String} 返回属性的值
 */
/**
 * 设置当前元素集合的属性
 * @method setAttribute
 * @param {String/Object} key 要设置的属性名称，或多个要设置的键值对
 * @param {String/undefined} value 要设置的属性值
 * @return {Node} 返回当前集合对象，供链式操作继续调用
 */
/**
 * 获取/设置当前元素集合的属性
 * @method attr
 * @param {String/Object/undefined} key 要获取/设置的属性名称，或多个要设置的键值对
 * @param {String/undefined} value 要设置的属性值
 * @return {Node} 返回当前集合对象，供链式操作继续调用
 */
js.dom.INodeAttribute = js.dom.INodeAttribute || js.dom.NodeInterfaceFactory.create({
	name: 'Attribute',
	base: js.dom.Attribute,
	methods: [
		{method: 'get', single: true},
		'set'
	]
});

js.dom.INodeAttribute.attr = function (key, value) {
	var Type = js.util.Type;
	if (Type.isDefined(value) || Type.isObject(key)) {
		this.setAttribute(key, value);
	} else {
		return this.getAttribute(key);
	}
	return this;
};

js.util.Class.implement(js.dom.Node, js.dom.INodeAttribute);