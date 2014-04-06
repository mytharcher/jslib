/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-27 by mytharcher
 * 
 * update:
 * 
 */

///import js.util.Class;
///import js.util.InterfaceFactory;
///import js.dom;
///import js.dom.Relation;

/*
 * @class js.dom.INodeRelation
 * DOM节点关系接口类
 * @interface
 * @singleton
 */
/**
 * @class js.dom.Node
 */

/**
 * 获取元素在父级元素中的索引
 * @method indexOfSiblings
 * @return {Number}
 */
/**
 * 获取当前节点集合的next节点集合
 * @method next
 * @param {String} selector 只获取符合选择器条件的元素，如果下一个不匹配，则继续找
 * @return {Node}
 */
/**
 * 获取当前节点集合的全部后续节点集合
 * @method nextAll
 * @param {String} selector 只获取符合选择器条件的元素
 * @return {Node}
 */
/**
 * 获取当前节点集合的prev节点集合
 * @method prev
 * @param {String} selector 只获取符合选择器条件的元素，如果上一个不匹配，则继续找
 * @return {Node}
 */
/**
 * 获取当前节点集合的全部前置节点集合
 * @method prevAll
 * @param {String} selector 只获取符合选择器条件的元素
 * @return {Node}
 */
/**
 * 获取当前节点集合的父节点
 * @method parent
 * @return {Node}
 */
/**
 * 获取当前节点集合的所有祖先集合
 * @method ancestors
 * @param {String} selector 只获取符合选择器条件的元素
 * @return {Node}
 */
/**
 * 获取当前节点集合的第一个子节点集合
 * @method firstChild
 * @param {String} selector 只获取符合选择器条件的元素，如果第一个不匹配，则继续找
 * @return {Node}
 */
/**
 * 获取当前节点集合的最后一个子节点集合
 * @method lastChild
 * @param {String} selector 只获取符合选择器条件的元素，如果最后一个不匹配，则继续找
 * @return {Node}
 */
/**
 * 获取当前节点集合的第一个元素的所有子节点集合
 * @method children
 * @param {String} selector 只获取符合选择器条件的元素
 * @return {Node}
 */
/**
 * 获取当前节点集合的第一个元素的所有兄弟节点集合
 * @method siblings
 * @param {String} selector 只获取符合选择器条件的元素
 * @return {Node} 返回的元素集合不包含当前节点
 */

/**
 * @ignore
 */
js.dom.INodeRelation = js.dom.INodeRelation || js.util.InterfaceFactory.create({
	template: function (base, method, key) {
		return key.custom || (key.single ? function(){
			return this.length ? 
				base[method].apply(base, [this[0]].concat([].slice.call(arguments, 0)))
				: new this.constructor();
		} : function (selector) {
			var ret = [];
			for (var i = 0; i < this.length; i++) {
				var result = base[method](this[i], selector);
				ret.push.apply(ret, result instanceof Array ? result : [result]);
			}
			var myClass = this.constructor;
			return new myClass(js.util.XArray.distinct(ret));
		});
	},
	
	base: js.dom.Relation,
	
	methods: [
		{method: 'indexOfSiblings', single: true},
		'next',
		'nextAll',
		'prev',
		'prevAll',
		'parent',
		'ancestors',
		'firstChild',
		'lastChild',
		'children',
		'siblings'
	]
});

/**
 * 判断当前节点集合的首个元素是否包含另一个集合的首个元素
 * @method contains
 * @param {Element/Node/String} 要判断的元素/集合/选择器
 * @return {Boolean}
 */
js.dom.INodeRelation.contains = function (element) {
	var node = this.constructor(element);
	return this.length && node.length && js.dom.Relation.contains(this[0], node[0]) || false;
};

js.util.Class.implement(js.dom.Node, js.dom.INodeRelation);

///import js.util.XArray;