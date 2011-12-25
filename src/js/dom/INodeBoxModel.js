/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-17 by mytharcher
 * 
 * update:
 * @2010-11-30 by mytharcher
 * @2011-12-24 by mytharcher
 */

///import js.util.Class;
///import js.dom;
///import js.dom.Node;
///import js.dom.BoxModel;
///import js.dom.NodeInterfaceFactory;

/*
 * @class js.dom.INodeBoxModel
 * Node类实现ClassName的接口类
 * @interface
 * @singleton
 */
/**
 * @class js.dom.Node
 */


/**
 * 获取集合首个元素的相对位置
 * @method getPosition
 * @param {Element} refer 相对的元素，如不传入则只计算相对父级节点的位置
 * @return {Object} 返回包含位置坐标x, y属性的对象
 */

/**
 * 判断集合首个元素是否可见
 * @method isDisplaying
 * @return {Boolean}
 */
js.dom.INodeBoxModel = js.dom.INodeBoxModel || js.dom.NodeInterfaceFactory.create({
	base: {
		getPosition: js.dom.BoxModel.getPosition,
		isDisplaying: js.dom.BoxModel.isDisplaying
	},
	methods: [{method: 'getPosition', single: true}, {method: 'isDisplaying', single: true}]
});

js.util.Class.implement(js.dom.Node, js.dom.INodeBoxModel);