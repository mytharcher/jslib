/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-02-05 by mytharcher
 * 
 * update:
 * @2011-02-08 by mytharcher
 * 
 */

///import js.dom;

/**
 * @class js.dom.Drag
 * 拖动元素的实现
 * @singleton
 */
js.dom.Drag = {
	/**
	 * @ignore
	 */
	dragging: {},
	
	/**
	 * 使一个元素可以被拖动
	 * @method js.dom.Drag.attach
	 * @static
	 * 
	 * @param {Element} element 要拖动的元素
	 * @param {Object} option 拖动选项
	 */
	attach: function (element, option) {
		var elem = js.dom.Stage.get(element),
			id = js.dom.Stage.mark(elem);
		js.dom.Event.add(option.handlerId || elem, 'mousedown', function (ev) {
			js.dom.Drag.start(id, option);
			js.dom.Event.add(document, 'mouseup', function (ev) {
				js.dom.Drag.stop(id);
				js.dom.Event.remove(document, 'mouseup', arguments.callee);
			});
			ev.preventDefault();
		});
		elem = null;
	},
	
	/**
	 * @private
	 * @param {Object} option
	 */
	mover: function (option) {
		return function (ev) {
			var elem = js.dom.Stage.get(option.id),
				x = ev.clientX,
				y = ev.clientY,
				Drag = js.dom.Drag;
			
			if (typeof option.originalPosition == 'undefined') {
				option.originalPosition = elem.style.position || '';
				elem.style.position = 'absolute';
				
				var pos = js.dom.BoxModel.getPosition(elem);
				
				
				option.offsetX = (option.startX = this.startX) - pos.x;
				option.offsetY = (option.startY = this.startY) - pos.y;
			}
			
			var cur = option.restrict ? Drag.restrict(x - option.offsetX, y - option.offsetY, option.restrict)
				: {x: x - option.offsetX, y: y - option.offsetY};
			elem.style.left = cur.x + 'px';
			elem.style.top = cur.y + 'px';
			
			option.ondrag && option.ondrag(x, y);
			
			ev.preventDefault();
		};
	},
	
	/**
	 * @private
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Array/Function} region
	 */
	restrict: function (x, y, region) {
		var Type = js.util.Type,
			type = Type.of(region),
			ret = {x: x, y: y};
		switch (Type.of(region)) {
			case Type.ARRAY:
				ret.x = Math.min(Math.max(x, region[0]), region[2]);
				ret.y = Math.min(Math.max(y, region[1]), region[3]);
				break;
			case Type.FUNCTION:
				ret = region(x, y);
				break;
			default:
				break;
		}
		return ret;
	},
	
	/**
	 * 开始拖动元素
	 * @method js.dom.Drag.start
	 * 
	 * @param {Element} element
	 * @param {Object} option
	 */
	start: function (element, option) {
		
		var option = option || {},
			elem = js.dom.Stage.get(element);
		
		this.stop(elem);
		
		option.id = js.dom.Stage.mark(elem);
		option.trackerId = js.dom.MouseTracker.start(this.mover(option));
		this.dragging[option.id] = option;
	},
	
	/**
	 * 停止拖动元素
	 * @method js.dom.Drag.stop
	 * 
	 * @param {Element} element
	 */
	stop: function (element) {
		var elem = js.dom.Stage.get(element),
			id = js.dom.Stage.mark(elem),
			option = this.dragging[id];
		if (option) {
			js.dom.MouseTracker.stop(option.trackerId);
			if (option.resetPosition) {
				element.style.position = option.originalPosition;
			}
			delete option.originalPosition;
			delete this.dragging[id];
		}
	}
};

///import js.util.Type;
///import js.dom.Stage.get;
///import js.dom.Stage.mark;
///import js.dom.BoxModel;
///import js.dom.MouseTracker;