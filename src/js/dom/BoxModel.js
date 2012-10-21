/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-08-13 by mytharcher
 * 
 * update:
 */

///import js.dom.Stage.get;
///import js.dom.Style;
///import js.dom.Traversal.up;

/**
 * @class js.dom.BoxModel
 * DOM元素盒子模型类
 * @singleton
 */
js.dom.BoxModel = {
	/**
	 * 获取元素的位置
	 * @method js.dom.BoxModel.getPosition
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
				pos.x = el.offsetLeft - (parseInt(cStyle.marginLeft, 10) || 0);
				pos.y = el.offsetTop - (parseInt(cStyle.marginTop, 10) || 0);
			} else if (cStyle.position == 'relative') {
				pos.x = (parseInt(cStyle.left, 10) || 0);
				pos.y = (parseInt(cStyle.top, 10) || 0);
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
				pos.x += (parseInt(document.body.currentStyle.marginLeft, 10) || 0) * 2;
				pos.y += (parseInt(document.body.currentStyle.marginTop, 10) || 0) * 2;
			}
		}
		pos.left = pos.x;
		pos.top = pos.y;
		
		return pos;
	},
	
	/**
	 * 向上遍历获取一个元素的绝对可见状态
	 * @method js.dom.BoxModel.isDisplaying
	 * @static
	 * 
	 * @param {Element} element 要获取的元素
	 * 
	 * @return {Boolean}
	 */
	isDisplaying: function (element) {
		var Style = js.dom.Style;
		return !!js.dom.Traversal.up(js.dom.Stage.get(element), function (node) {
			if (node.nodeType == 'input' && node.type == 'hidden' || Style.get(node, 'display') == 'none') {
				return false;
			}
		});
	}
};