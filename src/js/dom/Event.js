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
///import js.dom.Selector;

/**
 * @class js.dom.Event
 * DOM对象事件注册和删除类封装，基于jQuery的思想，解决了IE里this指针指不到事件元素的问题
 * @singleton
 */
js.dom.Event = js.dom.Event || {
	/**
	 * @private
	 * 兼容事件集合
	 */
	Compatible: {},
	
	/**
	 * @private
	 */
	Fixer: {},
	
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
		e.preventDefault = evt.preventDefault || js.dom.Event._handlerPreventDefault.bind(evt);

		//可在处理函数内调用e.stopPropagation()来阻止冒泡事件
		e.stopPropagation = evt.stopPropagation || js.dom.Event._handlerStopPropagation.bind(evt);
		
		e.stopAll = js.dom.Event._handlerStopAll;
		
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
	 * @param {Function} (optional) filter 过滤器，由该函数判断是否子节点可以响应事件，隐含参数:node指当前事件冒泡到的元素
	 */
	add: function (object, type, fn, filter) {
		var Event = js.dom.Event,
			Compatible = js.dom.Event.Compatible,
			object = js.dom.Stage.get(object),
			
			// 用于区分元素和document/window的挂载方式
			isElement = js.util.Type.isElement(object),
			id,
			targets = Event.targets || (Event.targets = {}),
			fixed,
			wrap,
			regMap = Event.regMap || (Event.regMap = {});
		
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
					object.addEventListener(type, Event.process, false);
				} else if (object.attachEvent) {
					object.attachEvent('on' + type, Event.createProcessor(id, isElement));
				}
			}
			
			//array find
			var index = js.util.XArray.toXArray(elemEventType).indexOf(fn, 0, Event.exist);
			if (index < 0) {
				elemEventType.push({
					fn: fn,
					wrap: wrap,
					filter: filter
				});
			}
		}
	},
	
	/**
	 * 创建一个事件处理器
	 * @private
	 * 
	 * @param {String} id
	 * @param {Boolean} isElement
	 */
	createProcessor: function (id, isElement) {
		var cache = js.dom.Event.cache || (js.dom.Event.cache = {}),
			cached = cache[id];
		return cached || (cache[id] = function(ev){
			return js.dom.Event.process.call(isElement ? document.getElementById(id) : js.dom.Event.targets[id], ev);
		});
	},
	
	/**
	 * @ignroe
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
		var e = Event.parse(ev);
		
		var target = e.target;
		
		var queue = Event.regMap[js.util.Type.isElement(this) ? this.id : js.util.Global.stamp(this)][e.type];
		
		outer: for (var i = 0; i < queue.length; i++) {// 队列可能被执行函数改变，所以每次取length比较
			var turn = queue[i];
			var fn = turn.wrap || turn.fn, filter = turn.filter;
			
			if (filter) {
				for (var node = target; node && node != this; node = node.parentNode) {
					var filterType = typeof filter;
					if (filterType == 'string' && js.dom.Selector.match(node, filter, this)
						|| (filterType == 'function') && filter(node)) {
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
			// 如果执行函数中remove了队列中已执行过的函数（包括当前的），
			// 则计数器-1并继续执行之后的，以免发生索引越界或跳过队列。
			if (queue.indexOf(turn) < i) {
				i--;
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
			id,
			regMap = Event.regMap || (Event.regMap = {}),
			cache = Event.cache || (Event.cache = {});
		
		if (isElement) {
			id = js.dom.Stage.mark(object);
		} else {
			id = js.util.Global.stamp(object);
		}
		
		var elemEventList = regMap[id];
		if (!elemEventList) {
			return;
		}
		
		var processor = cache[id];
		
		if (processor) {
			if (type) {
				var fixed = js.dom.Event.Compatible[type];
				if (fixed) {
					type = fixed.type;
				}
				
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
								delete regMap[id];
								delete Event.targets[id];
								delete Event.cache[id];
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
	
	/**
	 * 绑定只执行一次的事件，参数同add方法
	 * @see {js.dom.Event.add}
	 */
	once: function (object, type, fn, filter) {
		var Event = js.dom.Event;
		Event.add(object, type, Event._handlerOnce(fn, type), filter);
	},
	
	/**
	 * @private
	 * 停止所有后续队列中的事件
	 */
	_handlerStopAll: function () {
		this.interrupt = true;
	},
	
	/**
	 * @private
	 * 阻止默认事件的处理
	 * [scope at event]
	 */
	_handlerPreventDefault: function () {
		if (this.preventDefault) {
			this.preventDefault();
		} else {
			this.returnValue = false;
		}
	},
	
	/**
	 * @private
	 * 阻止事件冒泡的处理
	 * [scope at event]
	 */
	_handlerStopPropagation: function () {
		if (evt.stopPropagation) {
			evt.stopPropagation();
		} else {
			evt.cancelBubble = true;
		}
	},
	
	/**
	 * @private
	 */
	_handlerOnce: function (fn, type) {
		return function (ev) {
			fn.call(this, ev);
			js.dom.Event.remove(this, type, arguments.callee);
		};
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
///import js.client.Features.~functionBind;
///import js.client.Features.~arrayIndexOf;