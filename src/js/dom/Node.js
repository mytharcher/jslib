/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-15 by mytharcher
 * 
 * update:
 * @2010-11-17 by mytharcher
 * @2011-09-12 by mytharcher
 * 		[a] Add method "get" for getting new Node object form set with specified index.
 */

///import js.util.Class;
///import js.dom;

/**
 * @class js.dom.Node DOM节点类，类似于jQuery的核心类
 */
js.dom.Node = js.dom.Node || js.util.Class.create({
	/**
	 * 构造函数
	 * @param {String/Array/Element} selector
	 * @param {Element} context
	 * @return {Node}
	 */
	constructor: function (selector, context) {
		var Type = js.util.Type;
		var MyClass = js.dom.Node;
		if (this.constructor !== MyClass) {
			return new MyClass(selector, context);
		}
		
		if (Object(selector) instanceof MyClass) {
			return selector;
		}
		
		var queryResult = [];
		
		switch (Type.of(selector)) {
			case Type.STRING:
				queryResult = js.dom.Selector.queryAll(selector, context && (new MyClass(context)).toArray());
				break;
			
			// case Type.HTMLCOLLECTION:
			// case Type.NODELIST:
				// queryResult = js.util.XArray.toArray(selector);
				// break;
				
			case Type.ARRAY:
			// case Type.XARRAY:
				queryResult = selector.slice();
				break;
			
			case Type.NULL:
			case Type.UNDEFINED:
				break;
			
			case Type.ELEMENT:
			case Type.DOCUMENT:
			case Type.WINDOW:
			default:
				queryResult = js.util.XArray.toArray(selector);
				break;
		}
		
		this.length = 0;
		
		return this.merge(queryResult);
	},
	
	/**
	 * 返回集合中索引为index的新对象
	 * 
	 * @param {Number} index 要获取的索引
	 * 
	 * @return {js.dom.Node} 返回包装后的新对象
	 */
	get: function (index) {
		return new this.constructor(this[index]);
	},
	
	/**
	 * 遍历当前Node对象，顺序遍历每个item执行fn
	 * 
	 * @param {Function} fn
	 * @param {Object} scope
	 */
	forEach: function (fn, scope) {
		this.toArray().forEach(fn, scope || this);
		return this;
	},
	
	/**
	 * 返回选择器过滤后的元素集合
	 * 
	 * @param {String/Function} selector
	 * 
	 * @return {Node}
	 */
	filter: function (selector) {
		var ret = [];
		var isFunc = typeof selector == 'function';
		for (var i = 0, len = this.length; i < len; i++) {
			var item = this[i];
			if (isFunc ?
				selector(item) :
				js.dom.Selector.match(item, selector)) {
				ret.push(item);
			}
		}
		return new this.constructor(ret);
	},
	
	/**
	 * 判断集合中的元素是否包含匹配选择符的对象
	 * 
	 * @param {String} selector
	 * 
	 * @return {Boolean}
	 */
	has: function (selector) {
		for (var i = this.length - 1; i >= 0; i--) {
			if (js.dom.Selector.match(this[i], selector)) {
				return true;
			}
		}
		return false;
	},
	
	/**
	 * 判断集合中的首个元素是否匹配选择符
	 * 
	 * @param {String} selector
	 * 
	 * @return {Boolean}
	 */
	is: function (selector) {
		return js.dom.Selector.match(this[0]);
	},
	
	/**
	 * 把一个数组或者Node对象合并到当前对象
	 * @param {Array|Node} arrayLike
	 */
	merge: function (arrayLike) {
		var arr = js.util.XArray.toArray(arrayLike);
		[].push.apply(this, arr);
		return this;
	},
	
	/**
	 * 查找当前对象集合中匹配selector规则的元素，并返回新的Node对象
	 * 
	 * @param {String} selector
	 * 
	 * @return {Node}
	 */
	query: function (selector) {
		return new this.constructor(js.dom.Selector.queryAll(selector, this.toArray()));
	},
	
	/**
	 * 返回包含对象集合的普通数组
	 * 
	 * @return {Array}
	 */
	toArray: function () {
		var ret = [];
		for (var i = this.length - 1; i >= 0; i--) {
			ret.unshift(this[i]);
		}
		return ret;
	}
});

///import js.util.Type;
///import js.util.Type.~Element;
///import js.util.Type.~Document;
///import js.util.Type.~Window;
///import js.util.Type.~XArray;
///import js.util.XArray;
///import js.dom.Selector;
///import js.client.Features.~arrayForEach;