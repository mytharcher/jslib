/*
 * jslib Javascript Library
 * 
 * create:
 * @2012-03-25 by mytharcher
 * 
 * update:
 */

///import js.dom.Event.add;
///import js.dom.Event.Handlers.once;

/**
 * 绑定只执行一次的事件，参数同add方法
 * @see {js.dom.Event.add}
 */
js.dom.Event.once = function (object, type, fn, filter) {
	js.dom.Event.add(object, type, js.dom.Event.Handlers.once(fn, type), filter);
};
