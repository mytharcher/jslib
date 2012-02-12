/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-17 by mytharcher
 * 
 * update:
 * @2010-11-30 by mytharcher
 * 
 */

///import js.util.Class;
///import js.dom;
///import js.dom.Node;
///import js.dom.ClassName;
///import js.dom.NodeInterfaceFactory;

/*
 * @class js.dom.INodeClassName
 * Node类实现ClassName的接口类
 * @interface
 * @singleton
 */
/**
 * @class js.dom.Node
 */


/**
 * 对当前集合中每个元素都添加一个class
 * @method addClass
 * @param {String/Array} className
 * @return {Node} 返回当前对象，以供链式调用
 */

/**
 * 对当前集合中每个元素都移除一个class
 * @method removeClass
 * @param {String/Array} className
 * @return {Node} 返回当前对象，以供链式调用
 */

/**
 * 对当前集合中每个元素都添加或移除一个class
 * @method toggleClass
 * @param {String/Array} className
 * @param {Boolean/undefined} 强制指定添加或删除
 * @return {Node} 返回当前对象，以供链式调用
 */

/**
 * 对当前集合中每个元素都替换一个class
 * @method replaceClass
 * @param {String/Array} className 要被替换的class
 * @param {String/Array} replaceClassName 新的class
 * @return {Node} 返回当前对象，以供链式调用
 */

/**
 * 判断结合中的首个元素是否含有指定的class
 * @method hasClass
 * @param {String/Array} className 要判断的class
 * @return {Boolean}
 */
js.dom.INodeClassName = js.dom.INodeClassName || js.dom.NodeInterfaceFactory.create({
	name: 'Class',
	base: js.dom.ClassName,
	methods: ['add', 'remove', 'toggle', 'replace', {method: 'has', single: true}, {method: 'get', single: true}]
});

js.util.Class.implement(js.dom.Node, js.dom.INodeClassName);