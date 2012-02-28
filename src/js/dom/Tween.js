/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-01-11 by mytharcher
 * 
 * update:
 * @2011-10-31 by mytharcher
 * 		[a] Add own constructor.
 */

///import js.util.Class;
///import js.transition.Timeline;
///import js.transition.Easing.linear;
///import js.dom;

/**
 * @class js.dom.Tween
 * 元素运动补间类
 * @extends js.transition.Timeline
 */
js.dom.Tween = js.util.Class.create({
	consturctor: function () {
		js.transition.Timeline.apply(this, arguments);
	},
	getOptions: function (option) {
		var opt = js.transition.Timeline.prototype.getOptions(option);
		
		return js.util.Class.mix(opt, {
			
		});
	}
}, js.transition.Timeline);

js.util.Class.copy({
	/**
	 * 字符串转为数字的方法
	 * @method js.dom.Tween.parseFloat
	 * @private
	 * @static
	 * 
	 * 将第一次匹配到的数字部分转化为小数
	 * 
	 * @param {String} str
	 * 
	 * @return {Number}
	 */
	parseFloat: function (str) {
		var m = str.match(/-?\d+(\.\d+)?/);
		return parseFloat(m && m[0] || 0);
	},
	
	/**
	 * 计算一个属性当前步骤的目标值
	 * @method js.dom.Tween.step
	 * @private
	 * @static
	 * 
	 * @param {Object} prop 属性参数
	 * @param {Number} percent 运动的时间百分比
	 * @param {Number} direction 方向
	 * 
	 * @return {String} 带单位返回的style值
	 */
	step: function (prop, percent, direction) {
		return ((direction > 0 ? prop.from : prop.to) + prop.distance * prop.ease(percent) * direction) + prop.unit;
	},
	
	/**
	 * @private
	 * @method js.dom.Tween.prepare
	 * @param {Object} option
	 * @return {Object}
	 */
	prepare: function (option) {
		var Tween = js.dom.Tween,
			Style = js.dom.Style,
			option = js.transition.Timeline.prepare.call(Tween, option);
		
		//预处理属性列表
		for (var prop in option.property) {
			var p = option.property[prop];
			
			//默认无缓动，即线性运动
			if (typeof p.ease != 'function') {
				p.ease = Tween.Config.ease;
			}
			
			//默认没有单位
			if (typeof p.unit == 'undefined') {
				p.unit = '';
			}
			
			var hasFrom = typeof p.from != 'undefined';
			
			//如果没有from属性,则认为当前样式的值是from
			if (!hasFrom) {
				p.from = Tween.parseFloat(Style.get(option.object, prop));
			}
			
			//设置目标距离属性为
			p.distance = p.to - p.from;
			
			if (hasFrom) {
				Style.set(option.object, prop, Tween.step(p, option.offset / option.duration, option.direction));
			}
		}
		
		option.onenterframe = Tween.createOnEnterFrameProcessor(option);
		
		return option;
	},
	
	/**
	 * @private
	 * @param {Object} option
	 */
	createOnEnterFrameProcessor: function (option) {
		var temp = option.onenterframe;
		return function (spendTime) {
			var Style = js.dom.Style,
				Tween = js.dom.Tween,
				percent = spendTime < this.period ? (spendTime % this.duration) / this.duration : 1;
			
			if (this.direction < 0) {
				percent = 1 - percent;
			}
			
			for (var prop in this.property) {
				Style.set(this.object, prop, Tween.step(this.property[prop], percent, this.direction));
			}
			temp && temp.call(this, percent);
		};
	}
}, js.dom.Tween);

js.dom.Tween.Config = js.util.Class.mix({
	duration: 500,
	ease: js.transition.Easing.linear
}, js.transition.Timeline.Config);