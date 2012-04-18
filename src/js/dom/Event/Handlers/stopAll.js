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
 * 停止所有后续队列中的事件
 */
js.dom.Event.Handlers.stopAll = function () {
	this.interrupt = true;
};
