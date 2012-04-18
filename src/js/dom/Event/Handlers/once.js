/*
 * jslib Javascript Library
 * 
 * create:
 * @2012-03-24 by mytharcher
 * 
 * update:
 */

///import js.dom.Event.Handlers;
///import js.dom.Event.remove;

/**
 * @ignore
 * 只执行一次挂载的函数
 * [scope at event]
 */
js.dom.Event.Handlers.once = function (fn, type) {
	return function (ev) {
		fn.call(this, ev);
		js.dom.Event.remove(this, type, arguments.callee);
	};
};
