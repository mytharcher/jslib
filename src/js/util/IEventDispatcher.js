/*
 * elf JavaScript Library
 * 
 * create:
 * @2011-11-27 By mytharcher
 * 
 * update:
 */

///import js.util.Class;
///import js.util.EventObject;

/**
 * @interface js.util.IEventDispatcher 事件派发者接口类
 */
js.util.IEventDispatcher = {
	/**
	 * @private
	 */
	_getListeners: function (type) {
		var listeners = this._listeners || (this._listeners = {});
		return type ? listeners[type] : listeners;
	},
	
	/**
	 * 派发事件
	 * @param {String} type
	 * @param {Object} data
	 */
	dispatchEvent: function (type, data) {
		var ev = new js.util.EventObject({
			target: this,
			type: type,
			data: data
		});
		var listenerList = this._getListeners(type);
		if (listenerList) {
			for (var i = 0, len = listenerList.length; i < len; i++) {
				listenerList[i].call(this, ev);
			}
		}
		
		return ev.returnValue;
	},
	
	/**
	 * 添加事件监听器
	 * @param {String} type
	 * @param {Function} listener
	 */
	addEventListener: function (type, listener) {
		var eventList = this._getListeners();
		if (!eventList[type]) {
			eventList[type] = [];
		}
		
		var registeredType = eventList[type];
		if (registeredType.indexOf(listener) < 0) {
			registeredType.push(listener);
		}
	},
	
	/**
	 * 移除事件监听器
	 * @param {String} type
	 * @param {Function} listener
	 */
	removeEventListener: function (type, listener) {
		var registeredType = this._getListeners(type);
		if (registeredType) {
			var index = registeredType.indexOf(listener);
			if (index >= 0) {
				registeredType.splice(index, 1);
			}
		}
	}
};

///import js.client.Features.~arrayIndexOf;