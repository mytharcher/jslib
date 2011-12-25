/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-08-13 by mytharcher
 * 
 * update:
 */

///import js.dom.Stage.get;
///import js.dom.Traversal;

/**
 * @class js.dom.Traversal
 */

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
js.dom.Traversal.up = function (element, fn, thisp) {
	var node = js.dom.Stage.get(element),
		topNode = document.documentElement,
		count = 0;
	while (node && node != topNode && fn.call(thisp, node, element) !== false) {
		node = node.parentNode;
		count++;
	}
	return count;
};