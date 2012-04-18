/*
 * jslib Javascript Library
 * 
 * create:
 * @2012-03-24 by mytharcher
 * 
 * update:
 */

///import js.dom.Event.Handlers;

/**
 * @ignore
 * 阻止事件冒泡的处理
 * [scope at event]
 */
js.dom.Event.Handlers.stopPropagation = function () {
	this.cancelBubble = true;
};
