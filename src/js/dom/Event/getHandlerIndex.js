/*
 * jslib Javascript Library
 * 
 * create:
 * @2012-03-25 by mytharcher
 * 
 * update:
 */

///import js.dom.Event;

/**
 * @ignroe
 * 获取事件函数在处理队列中的索引
 */
js.dom.Event.getHandlerIndex = function (fn, list) {
	var index = -1;
	for (var i = list.length - 1; i >= 0; i--) {
		if (fn === list[i].fn) {
			index = i;
			break;
		}
	}
	return index;
};
