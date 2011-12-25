/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-08-13 by mytharcher
 * 
 * update:
 */

///import js.util.Type;
///import js.dom.Traversal;
///import js.dom.Stage.get;

/**
 * @class js.dom.Traversal
 */
	
/**
 * 从一个节点开始向下广度优先遍历(递归)
 * @method js.dom.Traversal.bfs
 * @static
 * 
 * @param {Array/Element/String} element 开始遍历的元素
 * @param {Function} fn 遍历在每一个节点上要执行的操作，如果该函数的执行结果为false，则会中断所有遍历，返回已遍历的节点数。
 * @param {Object} thisp (optional)执行fn操作的scope对象
 * @param {Boolean} includeText (optional)是否包含文本节点，默认：false。
 * 
 * @return {Number} 返回已遍历的节点数量
 */
js.dom.Traversal.bfs = function (element, fn, thisp, includeText) {
	var 
		node = js.dom.Stage.get(element),
		count = 0,
		layer = js.util.Type.isArray(node) ?
			node :
			fn.call(thisp, node, count++) === false ?
				[] :
				[node.firstChild],
		nextLayer = []
	;
	
	while (layer.length) {
		for (node = layer.shift(); node; node = node.nextSibling) {
			if (includeText || node.nodeType == 1) {
				if (fn.call(thisp, node, count++) !== false) {
					nextLayer.push(node.firstChild);
				} else {
					return count;
				}
			}
		}
	}
	if (nextLayer.length) {
		count += arguments.callee(nextLayer, fn, thisp, includeText);
	}
	
	return count;
};