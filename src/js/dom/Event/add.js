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
///import js.dom.Event.regMap;
///import js.dom.Event.targets;
///import js.dom.Event.process;
///import js.dom.Event.Compatible;
///import js.dom.Event.getFixedProcessor;
///import js.dom.Event.getHandlerIndex;

/**
 * 对一个对象注册事件
 * @static
 * 
 * @param {Object/String} object 可以被注册原生事件的对象，如传入string则默认为DOM元素的id
 * @param {String} type 事件名称，如click，mouseover等，即一般写法中去掉“on”的部分
 * @param {Function} fn 要绑定的函数
 * @param {Function} (optional) filter 过滤器，由该函数判断是否子节点可以响应事件，隐含参数:node指当前事件冒泡到的元素
 */
js.dom.Event.add = function (object, type, fn, filter) {
	var Compatible = js.dom.Event.Compatible,
		object = js.dom.Stage.get(object),
		
		// 用于区分元素和document/window的挂载方式
		isElement = js.util.Type.isElement(object),
		id,
		targets = js.dom.Event.targets,
		fixed,
		wrap,
		regMap = js.dom.Event.regMap;
	
	if (object) {
		if (isElement) {
			id = js.dom.Stage.mark(object);
		} else {
			id = js.util.Global.stamp(object);
			targets[id] = object;
		}
		
		var elemEventList = regMap[id];
		if (!elemEventList) {
			elemEventList = regMap[id] = {};
		}
		
		// 如果发现该事件类型需要兼容修复，
		// 则使用兼容后的外包处理及类型。
		if (fixed = Compatible[type]) {
			wrap = fixed.wrap(fn);
			type = fixed.type;
		}
		
		var elemEventType = elemEventList[type];
		if (!elemEventType || !elemEventType.length) {
			elemEventType = elemEventList[type] = [];
			
			if (object.addEventListener) {
				object.addEventListener(type, js.dom.Event.process, false);
			} else if (object.attachEvent) {
				object.attachEvent('on' + type, js.dom.Event.getFixedProcessor(id, isElement));
			}
		}
		
		//array find
		var index = js.dom.Event.getHandlerIndex(fn, elemEventType);
		if (index < 0) {
			elemEventType.push({
				fn: fn,
				wrap: wrap,
				filter: filter
			});
		}
	}
};