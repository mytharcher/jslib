/*
 * jslib Javascript Library
 * 
 * create:
 * @2012-03-24 by mytharcher
 * 
 * update:
 */

///import js.dom.Event.cache;

/**
 * @private
 * 获取修复过this指向的处理函数
 */
js.dom.Event.getFixedProcessor = function (id, isElement) {
	var cache = js.dom.Event.cache || (js.dom.Event.cache = {}),
		cached = cache[id];
	return cached || (cache[id] = function(ev){
		return js.dom.Event.process.call(isElement ? document.getElementById(id) : js.dom.Event.targets[id], ev);
	});
};