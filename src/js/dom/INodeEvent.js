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
///import js.dom.Event.add;
///import js.dom.Event.remove;
///import js.dom.Event.once;
///import js.dom.NodeInterfaceFactory;

/*
 * @class js.dom.INodeEvent
 * Node类实现Event的接口类
 * @interface
 * @singleton
 */
/**
 * @class js.dom.Node
 */


/**
 * 对当前集合内的所有元素绑定事件
 * @method addEventListener
 * @alias on
 * @param {String} type 事件类型
 * @param {Function} callback 处理函数
 * @return {Node} 返回当前集合，以供链式调用
 */

/**
 * 对当前集合内的所有元素移除绑定的事件
 * @method removeEventListener
 * @alias un
 * @param {String} type 事件类型
 * @param {Function} callback 处理函数
 * @return {Node} 返回当前集合，以供链式调用
 */
js.dom.INodeEvent = js.dom.INodeEvent || js.dom.NodeInterfaceFactory.create({
	base: {
		addEventListener: js.dom.Event.add,
		removeEventListener: js.dom.Event.remove,
		once: js.dom.Event.once
	},
	methods: [{method: 'addEventListener', alias: 'on'}, {method: 'removeEventListener', alias: 'un'}, 'once']
});

js.util.Class.implement(js.dom.Node, js.dom.INodeEvent);
