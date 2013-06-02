/*
 * jslib Javascript Library
 * 
 * create:
 * @2012-03-24 by mytharcher
 * 
 * update:
 */

///import js.client.Browser;
///import js.dom.Event.Compatible;

/**
 * @ignore
 * 为IE添加`input`事件兼容
 */
js.dom.Event.Compatible.input = js.client.Browser.IE < 9 ? {
	type: 'propertychange',
	wrap: function (fn) {
		return function (ev) {
			if (ev.propertyName == 'value') {
				var handler = js.dom.Event.getFixedProcessor(this.id);
				this.detachEvent('onpropertychange', handler);
				var ret = fn.call(this, ev);
				this.attachEvent('onpropertychange', handler);
				return ret;
			}
		};
	}
} : null;
