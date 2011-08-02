/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-15 by mytharcher
 * 
 * update:
 * @2010-11-17 by mytharcher
 */

///import js.util.Class;
///import js.dom;

/**
 * @class js.dom.BoxModel
 * 盒子模型类
 * @static
 * @singleton
 */
js.dom.BoxModel = js.dom.BoxModel || {
	
	
	/**
	 * 获取元素的位置
	 * @static
	 * 
	 * @param {Element} el
	 * @param {Element} refer 相对的元素，如不传入则只计算相对父级节点的位置
	 * 
	 * @return {Object} 返回包含位置坐标x, y属性的对象
	 */
	getPosition: function (el, refer) {
		var pos = {x: 0, y: 0};
		
		var cStyle = el.currentStyle || document.defaultView.getComputedStyle(el, null);
		
		//	var layoutBWX = layoutBWY = 0;
		
		if (!refer) {
			if (cStyle.position == 'absolute') {
				pos.x = el.offsetLeft - (parseInt(cStyle.marginLeft) || 0);
				pos.y = el.offsetTop - (parseInt(cStyle.marginTop) || 0);
			} else if (cStyle.position == 'relative') {
				pos.x = (parseInt(cStyle.left) || 0);
				pos.y = (parseInt(cStyle.top) || 0);
			}
		} else {
			for (var node = el; node.offsetParent && node != refer; node = node.offsetParent) {
				pos.x += node.offsetLeft;
				pos.y += node.offsetTop;
	//			if (e.currentStyle && e.currentStyle.hasLayout) {
	//				layoutBWX += (parseInt(e.currentStyle.borderLeftWidth) || 0);
	//				layoutBWY += (parseInt(e.currentStyle.borderTopWidth) || 0);
	//			}
			}
			//避免ie和ff计算body的offsetLeft不一致
	//		pos.x = el.offsetLeft - node.offsetLeft;//-(parseInt(cStyle.marginLeft)||0);
	//		pos.y = el.offsetTop - node.offsetTop;//-(parseInt(cStyle.marginTop)||0);
			if (cStyle.position == 'static' && el.currentStyle) {
				pos.x += (parseInt(document.body.currentStyle.marginLeft) || 0) * 2;
				pos.y += (parseInt(document.body.currentStyle.marginTop) || 0) * 2;
			}
		}
		return pos;
	},
	
	/**
	 * 判断元素是否可见
	 * @public
	 * 
	 * @param {Element} context 查找的上下文，默认为documentElement
	 * 
	 * @return {Boolean}
	 */
	isVisible: function (element, context) {
		var visible = true,
			documentElement = context || document.documentElement,
			Style = js.dom.Style;
		for (var node = element; node && node != documentElement; node = node.parentNode) {
			if (Style.get(node, 'display') == 'none') {
				visible = false;
				break;
			}
		}
		
		return visible;
	},
	
	isDisplaying: function (element) {
		var displaying = true;
		js.dom.Traversal.up(element, function () {
			return (displaying = js.dom.Style.get(this, 'display') == 'none');
		});
	}
};