/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-27 by mytharcher
 * 
 * update:
 * @2011-01-07 by mytharcher
 * 
 */

///import js.dom;

/**
 * @class js.dom.Operation
 * DOM节点操作类
 * @static
 * @singleton
 */
js.dom.Operation = js.dom.Operation || {
	/**
	 * 创建一个元素
	 * @method js.dom.Operation.create
	 * @static
	 * 
	 * @param {String} tag
	 * @param {Object} attributes
	 * 
	 * @return {Element}
	 */
	create: function (tag, attributes) {
		var elem = document.createElement(tag || 'div');
		js.dom.Attribute.set(elem, attributes);
		return elem;
	},
	
	/**
	 * 插入一个节点
	 * @method js.dom.Operation
	 * @static
	 * 
	 * @param {Element/String} element 要插入的元素
	 * @param {Element/String} parentNode 要插入到的父节点
	 * @param {Element/String/Number} position 要插入的相对位置，如传入Number类型，则表示插入的索引位置
	 */
	insert: function (element, parentNode, position) {
		var Type = js.util.Type,
			element = js.dom.Stage.get(element),
			parentNode = js.dom.Stage.get(parentNode),
			position = Type.isElement(position) ?
				position :
				Type.isString(position) ?
					js.dom.Stage.get(position) :
					Type.isNumber(position) ?
						js.dom.Relation.children(parentNode)[position] :
						js.util.Global.noop();
		
		parentNode.insertBefore(element, position);
	},
	
	/**
	 * 在某个元素前插入一个元素
	 * @method js.dom.Operation.before
	 * @static
	 * 
	 * @param {Element/String} element
	 * @param {Element} afterElement
	 */
	before: function (element, afterElement) {
		js.dom.Operation.insert(element, afterElement.parentNode, afterElement);
	},
	
	/**
	 * 在某个元素后插入一个元素
	 * @method js.dom.Operation.after
	 * @static
	 * 
	 * @param {Element/String} element
	 * @param {Element} beforeElement
	 */
	after: function (element, beforeElement) {
		js.dom.Operation.insert(element, beforeElement.parentNode, js.dom.Relation.next(beforeElement));
	},
	
	/**
	 * 在某个元素内最后插入一个元素
	 * @method js.dom.Operation.append
	 * @static
	 * 
	 * @param {Element/String} element
	 * @param {Element/String} beforeElement
	 */
	append: function (element, parentNode) {
		js.dom.Operation.insert(element, parentNode);
	},
	
	/**
	 * 在某个元素内最后插入一个元素
	 * @method js.dom.Operation.append
	 * @static
	 * 
	 * @param {Element/String} element
	 * @param {Element/String} beforeElement
	 */
	remove: function (element) {
		var element = js.dom.Stage.get(element);
		element.parentNode.removeChild(element);
	},
	
	/**
	 * 清空一个元素的内容
	 * @method js.dom.Operation.empty
	 * 
	 * @param {Element/String} element
	 */
	empty: function (element) {
		var elem = js.dom.Stage.get(element);
		elem.innerHTML = '';
	},
	
	/**
	 * 获取/设置元素的html内容
	 * @method js.dom.Operation.html
	 * @static
	 * 
	 * @param {Element/String} element
	 * @param {String} html (optional)
	 * @param {Function} callback (optional)
	 */
	html: function (element, html, callback) {
		var elem = js.dom.Stage.get(element);
		return js.util.Type.isDefined(html) ? ((elem.innerHTML = html) && callback && setTimeout(callback, 0)) : elem.innerHTML;
	},
	
	/**
	 * 获取一个元素的文本内容
	 * @method js.dom.Operation.text
	 * @static
	 * 
	 * @param {Element/String} element
	 * @param {String} text
	 * 
	 * @return {String}
	 */
	text: function (element, text) {
		var Type = js.util.Type;
		var elem = js.dom.Stage.get(element);
		var textProp = Type.isDefined(elem.innerText) ? 'innerText' : 'textContent';
		return Type.isDefined(text) ? (elem[textProp] = text) : elem[textProp];
	}
};

///import js.util.Global.noop;
///import js.util.Type;
///import js.dom.Stage.get;
///import js.dom.Relation;