/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-02-21 by mytharcher
 * 
 * update:
 * 
 */

///import js.dom;

/**
 * @class js.dom.Traversal
 * DOM节点遍历类
 * @static
 * @singleton
 */
js.dom.Traversal = {
	/**
	 * 从一个节点开始向上遍历
	 * @method js.dom.Traversal.up
	 * @static
	 * 
	 * @param {Element} element 开始遍历的元素
	 * @param {Function} fn 遍历在每一个节点上要执行的操作，如果该函数的执行结果为false，则会中断所有遍历，返回已遍历的节点数。
	 * @param {Object} thisp (optional)执行fn操作的scope对象
	 * 
	 * @return {Number} 返回已遍历的节点数量
	 */
	up: function (element, fn, thisp) {
		var node = js.dom.Stage.get(element),
			topNode = document.documentElement,
			count = 0;
		while (node && node != topNode && fn.call(thisp, node, element) !== false) {
			node = node.parentNode;
			count++;
		}
		return count;
	},
	
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
	bfs: function (element, fn, thisp, includeText) {
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
	},
	
	/**
	 * 从一个节点开始向下深度优先遍历(非递归算法，低效)
	 * @method js.dom.Traversal.dfs
	 * @static
	 * 
	 * @param {Element/String} element 开始遍历的元素
	 * @param {Function} fn 遍历在每一个节点上要执行的操作，如果该函数的执行结果为false，则会中断所有遍历，返回已遍历的节点数。
	 * @param {Object} thisp (optional)执行fn操作的scope对象
	 * @param {Boolean} includeText (optional)是否包含文本节点，默认：false。
	 * 
	 * @return {Number} 返回已遍历的节点数量
	 */
	dfs: function (element, fn, thisp, includeText) {
		var element = js.dom.Stage.get(element),
			node = element,
			n,
			count = 0;
		while (1) {
			if (node) {
				if (includeText || node.nodeType == 1) {
					if (fn.call(thisp, node, count++) === false) {
						break;
					} else {
						n = node;
						node = node.firstChild;
					}
				} else {
					node = node.nextSibling;
				}
			} else {
				if (n == element) {
					break;
				} else {
					node = n.nextSibling;
					n = n.parentNode;
				}
			}
		}
		return count;
	}
};

///import js.util.Type;
///import js.dom.Stage.get;