/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-27 by mytharcher
 * 
 * update:
 * @2011-01-09 by mytharcher
 * 
 */

///import js.util.Class;
///import js.dom;
///import js.dom.NodeInterfaceFactory;
///import js.dom.Operation;

/*
 * @class js.dom.INodeOperation
 * DOM节点操作接口类
 * @interface
 * @singleton
 */
/**
 * @class js.dom.Node
 */
js.dom.INodeOperation = js.dom.INodeOperation || js.util.Class.mix({
	/**
	 * 插入一个节点
	 * @param {Element/String/Array/Node} node 要插入的元素或集合
	 * @param {Element/Number/String/Array/Node} position (optional)要插入的相对位置，如传入Number类型，则表示插入的索引位置
	 * @return {Node} 返回自身以供链式调用
	 */
	insert: function(node, position){
		var Type = js.util.Type;
		var nodes = new this.constructor(node);
		var pos;
		switch (Type.of(position)) {
			case Type.ELEMENT:
			case Type.UNDEFINED:
				pos = position;
				break;
			case Type.NUMBER:
				pos = js.dom.Relation.children(this[0])[position];
				break;
			case Type.STRING:
			case Type.OBJECT:
			case Type.ARRAY:
				pos = (new this.constructor(position))[0];
				break;
			default:
				break;
		}
		var frag = document.createDocumentFragment();
		for (var i = 0, len = nodes.length; i < len; i++) {
			frag.appendChild(nodes[i]);
		}
		this[0].insertBefore(frag, pos);
		
		return this;
	},
	
	/**
	 * 在某个元素后插入一个元素
	 * @param {Element/String/Array/Node} node 要插入的元素或集合
	 * @param {Element/Number/String/Array/Node} position (optional)要插入的相对位置，如传入Number类型，则表示插入的索引位置
	 * @return {Node} 返回自身以供链式调用
	 */
	after: function (node, position) {
		return this.insert(node, js.util.Type.isNumber(position) ? position + 1 : (new this.constructor(position))[0]);
	},
	
	/**
	 * 在某个元素内最后插入一个元素
	 * @param {Element/String/Array/Node} node 要插入的元素或集合
	 * @return {Node} 返回自身以供链式调用
	 */
	append: function (node) {
		return this.insert(node);
	},
	
	/**
	 * 将当前集合插入到一个元素中
	 * @param {Element/String/Array/Node} node 要插入的元素或集合
	 */
	appendTo: function (node) {
		return (new this.constructor(node)).insert(this);
	},
	
	/**
	 * 将当前集合插入到一个元素中，可以指定插入的位置
	 * @param {Object} node
	 * @param {Element/Number/String/Array/Node} position (optional)要插入的相对位置，如传入Number类型，则表示插入的索引位置
	 */
	insertTo: function (node, position) {
		return (new this.constructor(node)).insert(this, position);
	},
	
//	remove: function () {
//		return this.forEach(js.dom.Operation.remove);
//	},
//	
//	empty: function () {
//		return this.forEach(js.dom.Operation.empty);
//	},
//	
	html: function (html, callback) {
		var ret = js.dom.Operation.html(this[0], html, callback);
		return js.util.Type.isDefined(html) ? this : ret;
	},
	
	text: function (text) {
		var ret = js.dom.Operation.text(this[0], text);
		return js.util.Type.isDefined(text) ? this : ret;
	}
}, js.dom.NodeInterfaceFactory.create({
	base: js.dom.Operation,
	methods: ['remove', 'empty']
}));

js.util.Class.implement(js.dom.Node, js.dom.INodeOperation);

/**
 * 创建一个Node节点
 * @method js.dom.Node.create
 * @static
 * 
 * @param {String} tag
 * @param {Object} attrs
 * 
 * @return {js.dom.Node}
 */
js.dom.Node.create = function (tag, attrs) {
	return new this(js.dom.Operation.create(tag, attrs));
};

///import js.util.Type;
///import js.util.Type.~Element;
///import js.dom.Relation;