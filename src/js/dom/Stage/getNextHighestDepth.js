/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-02-13 by mytharcher
 * 
 * update:
 */

///import js.dom.Stage;

/**
 * @class js.dom.Stage
 */
	
/**
 * 获取页面中下一个更高的z-index数值
 * @method js.dom.Stage.getNextHighestDepth
 * @static
 * 
 * @param {Boolean} force 强制重新计算，默认：false
 * 
 * @return {Number}
 */
js.dom.Stage.getNextHighestDepth = function (force) {
	var depth = arguments.callee.depth;
	if (!depth || force) {
		var highest = 1;
		var allNodes = document.getElementsByTagName('*');
		for (var i = allNodes.length - 1; i >= 0; i--) {
			var node = allNodes[i];
			var zIndex = (node.currentStyle ? node.currentStyle : document.defaultView.getComputedStyle(node, null)).zIndex;
			if (parseInt(zIndex)) {
				if (zIndex > highest) {
					highest = zIndex;
				}
			}
		}
		arguments.callee.depth = highest;
	}
	return ++arguments.callee.depth;
};