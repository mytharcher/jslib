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
 */
js.dom.Event.Handlers.withRelated = function (fn) {
	return function (ev) {
		for (var wrap = ev.relatedTarget; wrap && wrap != this; wrap = wrap.parentNode);
		if (wrap != this) {
			return fn.call(this, ev);
		}
	};
};
