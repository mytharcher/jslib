/*
 * jslib Javascript Library
 * 
 * create:
 * @2012-03-25 by mytharcher
 * 
 * update:
 */

///import js.util.Type.~Element;
///import js.util.Global.stamp;
///import js.dom.Selector;
///import js.dom.Event.fix;
///import js.dom.Event.regMap;

/**
 * @private
 * 事件具体处理内核
 * [scope @ object]
 * @param {Event} ev
 */
js.dom.Event.process = function (ev) {
	var e = js.dom.Event.fix(ev);
	
	var target = e.target;
	
	var queue = js.dom.Event.regMap[js.util.Type.isElement(this) ? this.id : js.util.Global.stamp(this)][e.type];
	
	outer: for (var i = 0; i < queue.length; i++) {// 队列可能被执行函数改变，所以每次取length比较
		var turn = queue[i];
		var fn = turn.wrap || turn.fn, filter = turn.filter;
		
		if (filter) {
			for (var node = target; node && node != this; node = node.parentNode) {
				var filterType = typeof filter;
				if (filterType == 'string' && js.dom.Selector.match(node, filter, this)
					|| (filterType == 'function') && filter(node)) {
					if (fn.call(node, e) === false) {
						e.preventDefault();
						break;
					}
					if (e.interrupt) {
						break outer;
					}
				}
			}
		} else {
			fn.call(this, e);
		}
		// 如果执行函数中remove了队列中已执行过的函数（包括当前的），
		// 则计数器-1并继续执行之后的，以免发生索引越界或跳过队列。
		if (queue.indexOf(turn) < i) {
			i--;
		}
	}
};
