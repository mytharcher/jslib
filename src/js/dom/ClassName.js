/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-2-27 By mytharcher
 * 
 * update:
 * @2010-04-12 By mytharcher
 * @2010-04-20 By mytharcher
 * @2010-04-27 By mytharcher
 * @2010-11-17 By mytharcher
 * @2011-01-15 By mytharcher
 * 		[m] Change directly implement to use js.text.WordString for support string process.
 */

///import js.dom;



/**
 * @class js.dom.ClassName
 * DOM元素的class属性管理类
 * @singleton
 */
js.dom.ClassName = js.dom.ClassName || {
	/**
	 * 获取一个DOM元素的class
	 * @method js.dom.ClassName.get
	 * @static
	 * 
	 * @param {String/Element} element DOM元素的引用或id
	 * 
	 * @return {Array} 返回className数组
	 */
	get: function (element) {
		var elem = js.dom.Stage.get(element);
		return (elem.className || '').split(' ');
	},
	
	/**
	 * 对一个DOM元素添加class
	 * @method js.dom.ClassName.add
	 * @static
	 * 
	 * @param {String/Element} element DOM元素的引用或id
	 * @param {String/Array} cls 要添加的class
	 * 
	 * @return {String} 返回添加后的className
	 */
	add: function (element, cls) {
		var elem = js.dom.Stage.get(element),
			curName = elem.className;
		return (elem.className = (new js.text.WordString()).add(curName).add(cls).toString());
	},
	
	/**
	 * 对一个DOM元素移除class
	 * @method js.dom.ClassName.remove
	 * @static
	 * 
	 * @param {String/Element} element DOM元素的引用或id
	 * @param {String/Array} cls 要移除的class，可以是多个className拼接的字符串，也可以是数组
	 * 
	 * @return {String} 返回移除后的className
	 */
	remove: function (element, cls) {
		var elem = js.dom.Stage.get(element),
			curName = elem.className;
		return (elem.className = (new js.text.WordString()).add(curName).remove(cls).toString());
	},
	
	/**
	 * 判断一个DOM元素或一个字符串内是否存在指定的className
	 * @method js.dom.ClassName.has
	 * @static
	 * 
	 * @param {String/Element} element DOM元素的引用或id
	 * @param {String/Array} cls 要判断的class，可以是多个className拼接的字符串，也可以是数组
	 * 
	 * @return {Boolean} 存在为true，不存在为false，只要有一个className不存在即为false
	 */
	has: function (element, cls) {
		var elem = js.dom.Stage.get(element);
		return (new js.text.WordString()).add(elem.className).contains(cls);
	},
	
	/**
	 * className开关
	 * @method js.dom.ClassName.toggle
	 * @static
	 * 
	 * 如果设置了on参数，则按on添加或删除className，否则如果存在className则删除，反之添加
	 * 
	 * @param {String/Element} element DOM元素或者需要添加/删除的字符串
	 * @param {String/Array} cls 要添加/移除的class，可以是多个className拼接的字符串，也可以是数组
	 * @param {Boolean} on 开关项，默认不使用，如果设置了，将强制按on设置的添加或删除className
	 */
	toggle: function (element, cls, on) {
		var elem = js.dom.Stage.get(element);
		elem.className = js.text.WordString.toggle(elem.className, cls, ' ', on);
	},
	
	/**
	 * 替换className
	 * @method js.dom.ClassName.replace
	 * @static
	 * 
	 * 移除oldCls，添加newCls，以达到oldCls变成newCls的效果
	 * 
	 * @param {String/Element} element DOM元素或者需要添加/删除的字符串
	 * @param {String/Array} oldCls 要移除的class，可以是多个className拼接的字符串，也可以是数组
	 * @param {String/Array} newCls 要添加的class，可以是多个className拼接的字符串，也可以是数组
	 * 
	 * @return {String}
	 */
	replace: function (element, oldCls, newCls) {
		var ClassName = js.dom.ClassName;
		ClassName.remove(element, oldCls);
		return ClassName.add(element, newCls);
	}
};

///import js.util.Type;
///import js.dom.Stage.get;
///import js.text.WordString;