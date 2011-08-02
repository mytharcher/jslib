/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-12-13 by mytharcher
 * 
 * update:
 */

///import js.dom;

/**
 * @class js.dom.Attribute
 * DOM元素属性操作类
 * @static
 * @singleton
 */
js.dom.Attribute = js.dom.Attribute || {
	/**
	 * 获取元素的指定属性
	 * @method js.dom.Attribute.get
	 * @static
	 * 
	 * @param {Element} elememt
	 * @param {String} key 要获取的属性
	 * 
	 * @return {String} 返回属性值
	 */
	get: function (element, key) {
		return element.getAttribute(this.keyEscape[key] || key);
	},
	
	/**
	 * 设置元素的属性值
	 * @method js.dom.Attribute.set
	 * @static
	 * 
	 * @param {Element/String} element 要设置属性的元素
	 * @param {String/Object} key
	 * @param {String} value
	 */
	set: function (element, key, value) {
		var element = js.dom.Stage.get(element);
		if (typeof key == 'object' && typeof value == 'undefined') {
			for (var i in key) {
				this.set(element, i, key[i]);
			}
		} else {
			element.setAttribute(element, this.keyEscape[key] || key, value);
		}
	},
	
	/**
	 * @ignore
	 * @private
	 */
	keyEscape: {
		'class': 'className'
	}
};