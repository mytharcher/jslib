/*
 * jslib Javascript Library
 * 
 * create:
 * @2012-03-25 by mytharcher
 * 
 * update:
 */

///import js.util.Type.~Element;
///import js.util.Global.stamp;
///import js.dom.Stage.get;
///import js.dom.Stage.mark;
///import js.dom.Event.cache;
///import js.dom.Event.regMap;
///import js.dom.Event.targets;
///import js.dom.Event.process;
///import js.dom.Event.Compatible;
///import js.dom.Event.getHandlerIndex;

/**
 * 对一个对象注销事件
 * @static
 * 
 * @param {Element} object DOM对象
 * @param {String} type (optional) 事件名称，如click，mouseover等，即一般写法中去掉“on”的部分，不填则移除对象上所有用Event.add添加的事件
 * @param {Function} fn (optional) 要绑定的函数，不填则移除该对象ev事件的所有注册函数
 */
js.dom.Event.remove = function (object, type, fn) {
	var object = js.dom.Stage.get(object),
		isElement = js.util.Type.isElement(object),
		id,
		regMap = js.dom.Event.regMap,
		cache = js.dom.Event.cache;
	
	if (isElement) {
		id = js.dom.Stage.mark(object);
	} else {
		id = js.util.Global.stamp(object);
	}
	
	var elemEventList = regMap[id];
	if (!elemEventList) {
		return;
	}
	
	if (type) {
		var fixed = js.dom.Event.Compatible[type];
		if (fixed) {
			type = fixed.type;
		}
		
		var elemEventType = elemEventList[type];
		if (elemEventType && elemEventType.length) {
			if (fn) {
				var index = js.dom.Event.getHandlerIndex(fn, elemEventType);
				if (index >= 0) {
					elemEventType.splice(index, 1);
				}
				if (!elemEventType.length) {
					if (object.removeEventListener) {
						object.removeEventListener(type, js.dom.Event.process, false);
					} else {
						object.detachEvent('on' + type, cache[id]);
					}
					delete elemEventList[type];
					if (!Object.keys(elemEventList).length) {
						delete regMap[id];
						delete js.dom.Event.targets[id];
						delete cache[id];
					}
				}
			} else {
				for (var i = elemEventType.length - 1; i >= 0; i--) {
					js.dom.Event.remove(object, type, elemEventType[i].fn);
				}
			}
		}
	} else {
		for (var t in elemEventList) {
			js.dom.Event.remove(object, elemEventList[t]);
		}
	}
};
