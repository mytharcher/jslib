/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-27 by mytharcher
 * 
 * update:
 * 
 */

///import js.dom;
///import js.util.Shortcut;

/**
 * @class js.dom.Relation
 * DOM节点关系类
 * @static
 * @singleton
 */
js.dom.Relation = js.dom.Relation || {
	/**
	 * 判断元素是否包含另一个元素，即元素是否是另一个元素的祖先
	 * @method js.dom.Relation.contains
	 * @static
	 * 
	 * @param {Element} element 当前元素
	 * @param {Element} contained 要判断是否被包含的元素
	 * 
	 * @return {Boolean}
	 */
	contains: function (element, contained) {
		for (var node = contained; node && node != element; node = node.parentNode) {
			if (node == contained) {
				return true;
			}
		}
		return false;
	},
	
	/**
	 * 获取元素在父级元素中的索引
	 * @method js.dom.Relation.indexOfSiblings
	 * @static
	 * 
	 * @param {Element} element
	 * 
	 * @return {Number}
	 */
	indexOfSiblings: function (element) {
		var parentNode = element.parentNode;
		return parentNode ? js.dom.Relation.children(parentNode).indexOf(element) : 0;
	},
	
	/**
	 * 是否是非空文本节点或匹配选择符的节点
	 * @method js.dom.Relation.test
	 * @private
	 * @static
	 * 
	 * @param {Element} element 要判断的节点
	 * @param {String/Boolean} selector 如传入字符串，则认为是选择符；如传入Boolean，则认为是是否包含非空文本节点的依据；不传入值，则默认包含非空文本节点。
	 * 
	 * @return {Boolean}
	 */
//	test: function (element, selector) {
//		var Type = js.util.Type, ret = false;
//		switch (Type.of(selector)) {
//			case Type.UNDEFINED:
//				selector = true;
//			case Type.BOOLEAN:
//				ret = element.nodeType == 1 || element.nodeType == 3 && selector && element.toString().trim().length > 0;
//				break;
//			case Type.STRING:
//				ret = js.dom.Selector.match(element, selector);
//				break;
//			case Type.FUNCTION:
//				ret = selector(element);
//				break;
//			default:
//				break;
//		}
//		return ret;
//	},
	test: js.util.Shortcut.create({
		'undefined': function (element) {
			return element.nodeType == 1 || element.nodeType == 3 && element.nodeValue.trim().length > 0;
		},
		'boolean': function (element, includeBlank) {
			return element.nodeType == 1 || element.nodeType == 3 && includeBlank && element.toString().trim().length > 0;
		},
		'string': function (element, selector) {
			return js.dom.Selector.match(element, selector);
		},
		'function': function (element, tester) {
			return tester(element);
		}
	}, 1),
	
	/**
	 * 获取元素的下一个符合匹配的兄弟节点，没有则返回null
	 * @method js.dom.Relation.next
	 * @static
	 * 
	 * @param {Element} element 要查找的元素
	 * @param {String/Boolean} (optional)selector @see js.dom.Relation.test
	 * 
	 * @return {Element}
	 */
	next: function (element, selector) {
		var node = element;
		do {
			node = node.nextSibling;
		} while (node && !js.dom.Relation.test(node, selector));
		return node;
	},
	
	/**
	 * 获取元素之后所有匹配的兄弟节点
	 * @method js.dom.Relation.nextAll
	 * @static
	 * 
	 * @param {Element} element
	 * @param {String/Boolean} (optional)selector 
	 * 
	 * @return {Array}
	 */
	nextAll: function (element, selector) {
		var ret = [];
		for (var node = element.nextSibling; node && js.dom.Relation.test(node, selector); node = node.nextSibling) {
			ret.push(node);
		}
		return ret;
	},
	
	/**
	 * 获取元素的上一个兄弟节点，没有则返回null
	 * @method js.dom.Relation.prev
	 * @static
	 * 
	 * @param {Element} element
	 * @param {String} (optional)selector
	 * 
	 * @return {Element}
	 */
	prev: function (element, selector) {
		var node = element;
		do {
			node = node.previousSibling;
		} while (node && !js.dom.Relation.test(node, selector));
		return node;
	},
	
	/**
	 * 获取元素之前的所有兄弟节点
	 * @method js.dom.Relation.prevAll
	 * @static
	 * 
	 * @param {Element} element
	 * @param {String} (optional)selector
	 * 
	 * @return {Array}
	 */
	prevAll: function (element, selector) {
		var ret = [];
		for (var node = element.previousSibling; node && js.dom.Relation.test(node, selector); node = node.previousSibling) {
			ret.push(node);
		}
		return ret;
	},
	
	/**
	 * 获取元素的父节点
	 * @method js.dom.Relation.parent
	 * @static
	 * 
	 * @param {Element} element
	 * 
	 * @return {Element}
	 */
	parent: function (element) {
		return element.parentNode;
	},
	
	/**
	 * 获取selector指定的祖先节点，如未指定，则获取全部祖先节点
	 * @method js.dom.Relation.ancestors
	 * @static
	 * 
	 * @param {Object} element
	 * @param {String} (optional)selector 选择器
	 * 
	 * @return {Array}
	 */
	ancestors: function (element, selector) {
		var Relation = js.dom.Relation;
		var ret = [];
		for (var node = element.parentNode; node; node = node.parentNode) {
			if (selector) {
				if (Relation.test(node, selector)) {
					ret.push(node);
				}
			} else {
				ret.push(node);
			}
		}
		return ret;
	},
	
	/**
	 * 获取元素的第一个非文本子节点
	 * @method js.dom.Relation.firstChild
	 * @static
	 * 
	 * @param {Element} element
	 * @param {String} (optional)selector
	 * 
	 * @return {Element}
	 */
	firstChild: function (element, selector) {
		for (var node = element.firstChild; node && !js.dom.Relation.test(node, selector);node = node.nextSibling);
		return node;
	},
	
	/**
	 * 获取元素的倒数第一个非文本子节点
	 * @method js.dom.Relation.lastChild
	 * @static
	 * 
	 * @param {Element} element
	 * @param {String} (optional)selector
	 * 
	 * @return {Element|null}
	 */
	lastChild: function (element, selector) {
		for (var node = element.lastChild; node && !js.dom.Relation.test(node, selector);node = node.previousSibling);
		return node;
	},
	
	/**
	 * 获取元素的全部非文本子节点
	 * @method js.dom.Relation.children
	 * @static
	 * 
	 * @param {Element} element
	 * @param {String} (optional)selector
	 * 
	 * @return {Array}
	 */
	children: function (element, selector) {
		var ret = [];
		for (var node = element.firstChild; node; node = node.nextSibling) {
			js.dom.Relation.test(node, false) && ret.push(node);
		}
		return ret;
	},
	
	/**
	 * 获取匹配选择器的所有兄弟节点
	 * @method js.dom.Relation.siblings
	 * @static
	 * 
	 * @param {Element} element
	 * @param {String} (optional)selector
	 * 
	 * @return {Array}
	 */
	siblings: function (element, selector) {
		var Relation = js.dom.Relation;
		return Relation.prevAll(element, selector).concat(Relation.nextAll(element, selector));
	}
};

///import js.client.Features.~stringTrim;
///import js.client.Features.~arrayIndexOf;
///import js.dom.Selector;
///import js.util.Type;