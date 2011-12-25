/*
 * Elf Javascript Library
 * 
 * create:
 * @2009-12-25 by mytharcher
 * 
 * update:
 * @2010-04-22 by mytharcher
 * @2010-04-27 by mytharcher
 * @2010-07-10 by mytharcher
 * @2010-11-18 by mytharcher
 * @2011-08-24 by mytharcher
 * 		[a] Add "Event.Type" for change hard code to enum expression.
 */

///import js.dom;
///import js.util.Global.stamp;

/**
 * @class js.dom.Event
 * DOM对象事件注册和删除类封装，基于jQuery的思想，解决了IE里this指针指不到事件元素的问题
 * @singleton
 */
js.dom.Event = js.dom.Event || {
	/**
	 * @private
	 * 注册函数记录表
	 */
	regList: {},
	
	/**
	 * @private
	 */
	cache: {},
	
	/**
	 * @private
	 */
	targets: {},
	
	/**
	 * 转化事件对象，以适应标准事件
	 * @static
	 * 
	 * @param {DOMEvent} ev DOM事件对象
	 * 
	 * @return {Object}
	 */
	parse: function (ev) {
		var evt = ev || window.event;
		var e = {};

		for (var i in evt) {e[i] = evt[i];}
		
		e.target = e.srcElement = e.target || e.srcElement;
		e.keyCode = e.which || e.keyCode;
		e.rightClick = e.which == 3 || e.button == 2;

		//可在处理函数内调用e.preventDefault()来阻止浏览器默认事件
		e.preventDefault = function () {
			if (evt.preventDefault) {
				evt.preventDefault();
			} else {
				evt.returnValue = false;
			}
		};

		//可在处理函数内调用e.stopPropagation()来阻止冒泡事件
		e.stopPropagation = function () {
			if (evt.stopPropagation) {
				evt.stopPropagation();
			} else {
				evt.cancelBubble = true;
			}
		};
		
		e.stopAll = function () {
			this.interrupt = true;
		};
		
		return e;
	},
	
	/**
	 * 对一个对象注册事件
	 * @method js.dom.Event.add
	 * @static
	 * 
	 * @param {Object/String} object 可以被注册原生事件的对象，如传入string则默认为DOM元素的id
	 * @param {String} type 事件名称，如click，mouseover等，即一般写法中去掉“on”的部分
	 * @param {Function} fn 要绑定的函数
	 * @param {Function} (optional) filter 过滤器，由该函数判断是否子节点可以响应事件，隐含参数:node指当前响应事件的元素
	 */
	add: function (object, type, fn, filter) {
		var Event = js.dom.Event,
			object = js.dom.Stage.get(object),
			isElement = js.util.Type.isElement(object),
			id;
		
		if (object) {
			if (isElement) {
				id = js.dom.Stage.mark(object);
			} else {
				id = js.util.Global.stamp(object);
				Event.targets[id] = object;
			}
			
			var elemEventList = Event.regList[id];
			if (!elemEventList) {
				elemEventList = Event.regList[id] = {};
			}
			
			var elemEventType = elemEventList[type];
			if (!elemEventType || !elemEventType.length) {
				elemEventType = elemEventList[type] = [];
				
				var processor = Event.createProcessor(id, isElement);
				
				if (object.addEventListener) {
					object.addEventListener(type, processor, false);
				} else if (object.attachEvent) {
						object.attachEvent('on' + type, processor);
					}
			}
			
			//array find
			var index = js.util.XArray.toXArray(elemEventType).indexOf(fn, 0, Event.exist);
			if (index < 0) {
				elemEventType.push({
					fn: fn,
					filter: filter
				});
			}
		}
	},
	
	/**
	 * 创建一个事件处理器
	 * @method js.dom.Event.createProcessor
	 * @private
	 * 
	 * @param {String} id
	 * @param {Boolean} isElement
	 */
	createProcessor: function (id, isElement) {
		var cache = js.dom.Event.cache, cached = cache[id];
		return cached || (cache[id] = function(ev){
			return js.dom.Event.process.call(isElement ? document.getElementById(id) : js.dom.Event.targets[id], ev);
		});
	},
	
	/**
	 * @private
	 */
	exist: function (object, item) {
		return object == item.fn;
	},
	
	/**
	 * @private
	 * [scope @ object]
	 * @param {Event} ev
	 */
	process: function (ev) {
		var Event = js.dom.Event;
		var e = Event.parse(ev || window.event);
		
		var target = e.target;
		
		var queue = Event.regList[js.util.Type.isElement(this) ? this.id : js.util.Global.stamp(this)][e.type];
		
		outer: for (var i = 0, len = queue.length; i < len; i++) {
			var fn = queue[i].fn, filter = queue[i].filter;
			
			if (filter) {
				for (var node = target; node && node != this; node = node.parentNode) {
					if ((typeof filter == 'function') && filter(node)) {
						if (fn.call(node, e) === false) {
							e.preventDefault();
							break;
						}
						if (e.interrupt) {
							break outer;
						}
					}
				}
			} else {
				fn.call(this, e);
			}
		}
	},
	
	/**
	 * 对一个对象注销事件
	 * @method js.dom.Event.remove
	 * @static
	 * 
	 * @param {Element} o DOM对象
	 * @param {String} type (optional) 事件名称，如click，mouseover等，即一般写法中去掉“on”的部分，不填则移除对象上所有用Event.add添加的事件
	 * @param {Function} fn (optional) 要绑定的函数，不填则移除该对象ev事件的所有注册函数
	 */
	remove: function (object, type, fn) {
		var Event = js.dom.Event,
			object = js.dom.Stage.get(object),
			isElement = js.util.Type.isElement(object),
			id;
		
		if (isElement) {
			id = js.dom.Stage.mark(object);
		} else {
			id = js.util.Global.stamp(object);
		}
		
		var elemEventList = Event.regList[id];
		if (!elemEventList) {
			return;
		}
		
		var processor = Event.cache[id];
		
		if (processor) {
			if (type) {
				var elemEventType = elemEventList[type];
				if (elemEventType && elemEventType.length) {
					if (fn) {
						var index = js.util.XArray.toXArray(elemEventType).indexOf(fn, 0, Event.exist);
						if (index >= 0) {
							elemEventType.splice(index, 1);
						}
						if (!elemEventType.length) {
							if (object.removeEventListener) {
								object.removeEventListener(type, processor, false);
							} else {
								object.detachEvent('on' + type, processor);
							}
							delete elemEventList[type];
							if (!Object.keys(elemEventList).length) {
								delete Event.regList[id];
								delete Event.targets[id];
							}
						}
					} else {
						for (var i = elemEventType.length - 1; i >= 0; i--) {
							Event.remove(object, type, elemEventType[i].fn);
						}
					}
				}
			} else {
				for (var t in elemEventList) {
					Event.remove(object, elemEventList[t]);
				}
			}
		}
	},
	
	Type: {
		CLICK: 'click',
		MOUSE_OVER: 'mouseover',
		MOUSE_OUT: 'mouseout',
		MOUSE_DOWN: 'mousedown',
		MOUSE_UP: 'mouseup',
		MOUSE_WHEEL: 'mousewheel',
		
		KEY_DOWN: 'keydown',
		KEY_PRESS: 'keypress',
		KEY_UP: 'keyup',
		
		LOAD: 'load',
		BEFORE_UNLOAD: 'beforeunload',
		UNLOAD: 'unload',
		
		FOCUS: 'focus',
		BLUR: 'blur'
	}
};

///import js.dom.Stage.get;
///import js.dom.Stage.mark;
///import js.util.XArray;
///import js.util.Type;
///import js.util.Type.~Element;
///import js.client.Features.~objectKeys;