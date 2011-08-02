/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-04-12 by mytharcher
 * 
 * update:
 */


/**
 * @class js.dom.Stage
 */

/**
 * 向上遍历获取一个元素的绝对可见状态
 * @method js.dom.Stage.isVisible
 * @static
 * 
 * @param {Element} el 要获取的元素
 * @param {Element} context 查找的上下文，默认为documentElement
 * 
 * @return {Boolean}
 */
js.dom.Stage.isVisible = function(element, context){
	var visible = true,
		el = js.dom.Stage.get(element),
		con = js.dom.Stage.get(context);
	var documentElement = con || document.documentElement;
	for (var node = el; node && node != documentElement; node = node.parentNode) {
		if (js.dom.Style.get(node, 'display') == 'none') {
			visible = false;
			break;
		}
	}
	
	return visible;
};

///import js.dom.Stage.get;
///import js.dom.Style;