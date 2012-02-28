/*
 * js Javascript Library
 * 
 * create:
 * @2010-4-24 by mytharcher
 * 
 * update:
 * @2010-04-27 by mytharcher
 * @2010-07-22 by mytharcher
 * @2011-01-10 by mytharcher
 */

///import js.util.Class;
///import js.util.Global.noop;
///import js.transition;

/**
 * @class js.transition.Timeline
 * 时间轴类
 */
js.transition.Timeline = js.transition.Timeline || js.util.Class.create({
	/**
	 * 构造函数
	 * @param {Object} option 参数表见Timeline.start
	 */
	constructor: function (options) {
		var Class = js.util.Class;
		
		Class.mix(this, options);
		Class.mix(this, this.constructoConfigig);
		
		//定时执行句柄
		this.interval = null;
		
		//是否在进行变形
		this.running = false;
		
		//已执行的百分比
		this.percent = 0;
		
		//运行的总时间
		this.period = this.loop >= 0 ? this.loop * this.duration : Number.POSITIVE_INFINITY;
		
		var me = this;
		/**
		 * @ignore
		 * @param {Number} percent
		 */
		this._onEnterFrame = function (percent) {
	//		Debug.out(me.object.className + ':' + me.interval + '>' + percent);
			me.percent = percent;
			me.onEnterFrame && me.onEnterFrame(percent);
		};
		
		/**
		 * @ignore
		 */
		this._onComplete = function () {
	//		Debug.out(me.object.className + ':Complete');
			me.percent = 1;
			me.running = false;
			me.onComplete && me.onComplete();
		};
	},
	
	/**
	 * 获取当前播放的百分比
	 * @method getPercent
	 * @return {Number}
	 */
	getPercent: function () {
		return this.percent || 0;
	},
	
	/**
	 * 获取当前的方向值
	 * @method getDirection
	 * @return {Number}
	 */
	getDirection: function () {
		return this.direction;
	},
	
	/**
	 * 获取当前时间轴选项的副本
	 * @private
	 * @param {Object} option
	 * @return {Object}
	 */
	getOptions: function (option) {
		return js.util.Class.mix(option || {}, {
			fps: this.fps,
			duration: this.duration,
			offset: this.offset,
			direction: this.direction,
			loop: this.loop,
			onStart: this.onStart,
			onFirstFrame: this.onFirstFrame,
			onEnterFrame: this._onEnterFrame,
			onComplete: this._onComplete
		});
	},
	
	/**
	 * 启动补间
	 * @method start
	 * 
	 * @param {Object} option 启动的参数
	 * 
	 * @return {Number} 返回定时器的id
	 */
	start: function (option) {
		if (!this.running) {
			this.running = true;
			
			this.interval = this.constructor.start(this.getOptions(option));
		}
		
		return this.interval;
	},
	
	/**
	 * 停止补间
	 * @method stop
	 */
	stop: function () {
		if (this.running) {
			this.constructor.stop(this.interval);
		}
		this.running = false;
	},
	
	/**
	 * 继续已停止补间
	 * @method resume
	 * 
	 * @param {Object} option
	 * 
	 * @return {Number}
	 */
	resume: function (option) {
		return this.start(js.util.Class.mix(option || {}, {
			offset: this.duration * this.percent
		}));
	},
	
	/**
	 * 转向：转到指定方向
	 * @method turn
	 * @param {Number} dir 要转到的方向，1：正向；-1：反向
	 */
	turn: function (dir) {
		var same = this.direction == dir;
		this.direction = dir;
		if (!same && this.running) {
			this.stop();
			this.start({
				offset: this.duration * (1 - this.getPercent())
			});
		}
	},
	
	/**
	 * 反向
	 */
	reverse: function () {
		this.turn(this.direction *= -1);
	}
});

/**
 * @ignore
 * Timeline类静态成员定义
 */
js.util.Class.copy({
	/**
	 * @static
	 * @property js.transition.Timeline.DIRECTION_FORWARD 正向(enum)
	 * @type {Number}
	 */
	DIRECTION_FORWARD: 1,
	/**
	 * @static
	 * @property js.transition.Timeline.DIRECTION_BACKWARD 反向(enum)
	 * @type {Number}
	 */
	DIRECTION_BACKWARD: -1,
	
	/**
	 * @ignore
	 * @property js.transition.Timeline.Config 默认配置参数
	 * @type {Object}
	 */
	Config: {
		/**
		 * @cfg {Number} fps 每秒运行的帧数，默认：50。
		 */
		fps: 50,
		/**
		 * @cfg {Number} speed 倍速，倍率。用于调节时间快慢的系数，一般不设置。默认：1。
		 */
		speed: 1,
		/**
		 * @cfg {Number} duration 持续时间的毫秒数，默认：Infinity。
		 */
		duration: Infinity,
		/**
		 * @cfg {Number} offset 起始时间偏移量的毫秒数，默认：0。
		 */
		offset: 0,
		/**
		 * @cfg {Number} direction 方向，1：正向；-1：反向；默认：1。
		 */
		direction: 1,
		/**
		 * @cfg {Number} loop 循环次数，&gt; 0：循环loop次；0：停止；&lt; 0：无限循环；可以使小数。默认：1。
		 */
		loop: 1
		
		/**
		 * @cfg {Function} onStart 形变启动时调用的外部接口。默认：undefined。
		 */
		/**
		 * @cfg {Function} onFirstFrame 进入第一帧调用的外部接口，与onStart不同的是会经过第一次时间间隔时才调用。默认：undefined。
		 */
		/**
		 * @cfg {Function} onEnterFrame 每帧调用的外部接口。默认：undefined。
		 */
		/**
		 * @cfg {Function} onComplete 变化完成时调用的外部接口。默认：undefined。
		 */
	},
	
	/**
	 * @private
	 * @property js.transition.Timeline.running
	 * @type {Object}
	 * 所有开始过的定时器的运行状态，定时器的id作为索引标识
	 */
	running: {},
	
	/**
	 * 获取下一次定时器的数字索引标识
	 * @method js.transition.Timeline.getNextTimer
	 * @static
	 * 
	 * @return {Number}
	 */
	getNextTimer: function () {
		return setTimeout(js.util.Global.noop, 0) + 1;
	},
	
	/**
	 * 开始前的预处理
	 * @method js.transition.Timeline.prepare
	 * @protected
	 * @static
	 * 
	 * @param {Object} option
	 * 
	 * @return {Object}
	 */
	prepare: function (option) {
		var Class = js.util.Class;
		Class.mix(option, this.Config);
		Class.mix(option, {
			//记录即将开始的定时器的id
			id: this.getNextTimer(),
			
			//开始时间，取实际时间来计算，用于修正IE下时间不同步，另外允许从用户设置的offset偏移量开始计算
			startTime: Date.now(),
			
			//帧数记录
			frame: 0,
			
			//运行的总时间
			period: option.loop >= 0 ? option.loop * option.duration : Infinity
		});
		
		return option;
	},
	
	/**
	 * 启动一条匿名的时间轴
	 * @method js.transition.Timeline.start
	 * @static
	 * 
	 * @param {Object} option 形变的参数集
	 * 
	 * @return {Number} interval，返回定时执行的句柄，可供停止渐变调用
	 */
	start: function (option) {
		var option = this.prepare(option),
			run = window.setInterval(this.run.bind(this), 1 / option.fps * 1000, option);
		
		this.running[run] = true;
		
		if (typeof option.onStart == 'function') {
			option.onStart();
		}
		
		return run;
	},
	
	/**
	 * 定时器每次执行的内容
	 * @method js.transition.Timeline.run
	 * @private
	 * 
	 * @param {Object} option @see js.transition.Timeline.Config
	 * 
	 * @return {Number}
	 */
	run: function (option) {
		option.spend = (Date.now() - option.startTime + option.offset) * option.speed;
		
		if (!option.frame++ && typeof option.onFirstFrame == 'function') {
			option.onFirstFrame();
		}
		
		if (option.spend < option.period) {
			if (typeof option.onEnterFrame == 'function') {
				option.onEnterFrame(option.spend);
			}
		} else {
			this.stop(option.id);
			
			if (typeof option.onEnterFrame == 'function') {
				option.onEnterFrame(option.period);
			}
			
			if (typeof option.onComplete == 'function') {
				option.onComplete();
			}
		}
	},
	
	/**
	 * 补间序列
	 * @method js.transition.Timeline.order
	 * @static
	 * 
	 * @param {Array} queue 由补间参数option组成的数组
	 * @param {Function} onComplete 所有动画结束时的回调函数
	 */
	order: function (queue, onComplete) {
		var i = queue.length - 1, me = this;
		queue[i].onComplete = onComplete;
		for (i--; i >= 0; i--) {
			queue[i].next = queue[i + 1];
			queue[i].onComplete = function(){
				me.start(this.next);
			};
		}
		this.start(queue[0]);
	},
	
	/**
	 * 停止某个定时器
	 * @method js.transition.Timeline.stop
	 * @static
	 * 
	 * @param {Number} id
	 */
	stop: function (id) {
		var running = this.running;
		if (running[id]) {
			clearInterval(id);
			delete running[id];
		}
	},
	
	/**
	 * 停止所有由Timeline启动的定时器
	 * @method js.transition.Timeline.stopAll
	 * @static
	 */
	stopAll: function () {
		for (var i in this.running) {
			this.stop(i);
		}
	}
}, js.transition.Timeline);

///import js.client.Features.~dateNow;
///import js.client.Features.~setInterval;
///import js.client.Features.~setTimeout;
///import js.client.Features.~functionBind;