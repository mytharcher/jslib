/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-12-13 by mytharcher
 * 
 * update:
 * @2011-08-13 by mytharcher
 * 		[m] add more escaped attributes' name
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
		var element = js.dom.Stage.get(element);
	    if ('style' == key){
	        return element.style.cssText;
	    }
		return element.getAttribute(js.dom.Attribute.keyEscape[key] || key);
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
				js.dom.Attribute.set(element, i, key[i]);
			}
		} else {
			element.setAttribute(js.dom.Attribute.keyEscape[key] || key, value);
		}
	},
	
	/**
	 * @ignore
	 * @private
	 * 
	 * from https://github.com/BaiduFE/Tangram-base/blob/master/src/baidu/dom/_NAME_ATTRS.js
	 */
	keyEscape: (function () {
	    var result = {
	        'cellpadding': 'cellPadding',
	        'cellspacing': 'cellSpacing',
	        'colspan': 'colSpan',
	        'rowspan': 'rowSpan',
	        'valign': 'vAlign',
	        'usemap': 'useMap',
	        'frameborder': 'frameBorder'
	    };
	    
	    if (js.client.Browser.IE < 8) {
	        result['for'] = 'htmlFor';
	        result['class'] = 'className';
	    } else {
	        result['htmlFor'] = 'for';
	        result['className'] = 'class';
	    }
	    
	    return result;
	})()
};