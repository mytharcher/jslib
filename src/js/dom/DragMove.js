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
 * @class js.dom.DragMove
 * 拖动元素的实现
 * @singleton
 */
js.dom.DragMove = {
	/**
	 * @ignore
	 */
	dragging: {},
	
	/**
	 * @private
	 * @param {Object} option
	 */
	mover: function (option) {
		return function (ev) {
			var elem = js.dom.Stage.get(option.id),
				x = ev.clientX,
				y = ev.clientY,
				DragMove = js.dom.DragMove;
			
			if (typeof option.originalPosition == 'undefined') {
				option.originalPosition = elem.style.position || '';
				elem.style.position = 'absolute';
				
				var pos = js.dom.BoxModel.getPosition(elem);
				
				
				option.offsetX = (option.startX = this.startX) - pos.x;
				option.offsetY = (option.startY = this.startY) - pos.y;
			}
			
			var cur = option.restrict ? DragMove.restrict(x - option.offsetX, y - option.offsetY, option.restrict)
				: {x: x - option.offsetX, y: y - option.offsetY};
			elem.style.left = cur.x + 'px';
			elem.style.top = cur.y + 'px';
			
			option.onDrag && option.onDrag(x, y);
			
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
	 * @method js.dom.DragMove.start
	 * 
	 * @param {Element} element
	 * @param {Object} option
	 */
	start: function (element, option) {
		var option = option || {};
		
		option.id = js.dom.Stage.mark(element);
		option.trackerId = js.dom.MouseTracker.start(this.mover(option));
		this.dragging[option.id] = option;
	},
	
	/**
	 * 停止拖动元素
	 * @method js.dom.DragMove.stop
	 * 
	 * @param {Element} element
	 */
	stop: function (element) {
		var id = js.dom.Stage.mark(element),
			option = this.dragging[id];
		if (option) {
			js.dom.MouseTracker.stop(option.trackerId);
//			element.style.position = option.originalPosition;
			delete this.dragging[id];
		}
	}
};

///import js.util.Type;
///import js.dom.Stage.get;
///import js.dom.Stage.mark;
///import js.dom.BoxModel;
///import js.dom.MouseTracker;