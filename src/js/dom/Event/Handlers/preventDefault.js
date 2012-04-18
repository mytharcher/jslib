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
 * 阻止默认事件的处理
 * [scope at event]
 */
js.dom.Event.Handlers.preventDefault = function () {
	this.returnValue = false;
};
