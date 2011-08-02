/*
 * jslib JavaScript Library
 * 
 * create: 
 * @2010-11-26 by mytharcher
 * 
 * update:
 * @2010-12-10 by mytharcher
 * @2010-12-19 by mytharcher:
 * 		[m] Change all mechanism of Shortcut.
 * @2010-12-21 by mytharcher:
 * 		[m] Change dispatch method constructor into static for interface.
 * @2011-02-17 by mytharcher:
 * 		[m] Change method "create" name to "attach".
 * 		[d] Remove constructor.
 * 		[a] Add method "create" for creating new shortcut method.
 * 		[m] Change the implement of method "attach" to store dispatchers in Shortcut sjs, not in the specified shortcut method.
 * @2011-03-18 by mytharcher:
 * 		[m] Change method "dispatch", add a parameter "index" for user to specify which index in arguments should be dispatched according to;
 * 			Add a limit that only empty arguments(with zero length) would be dispatched to the mirror, so that the undefined value could be according to;
 */

///import js.client.Features.~dateNow;
///import js.util;

/**
 * @class js.util.Shortcut
 * 快捷方式类
 * @singleton
 */
js.util.Shortcut = {
	/**
	 * @private
	 * @property STAMP 唯一标识键
	 * @type {String}
	 */
	STAMP: 'ELF_SHORTCUT_' + Date.now(),
	
	/**
	 * @private
	 */
	dispatcher: [],
	
	/**
	 * 对一个函数attach快捷方式的处理
	 * @method js.util.Shortcut.attach
	 * @static
	 * 
	 * @param {Object} object
	 */
	attach: function (object, interceptors) {
		!object[this.STAMP] && (this.dispatcher[object[this.STAMP] = this.dispatcher.length] = {mirror: {}, interceptor: {}});
		interceptors && this.intercept(object, interceptors);
		return object;
	},
	
	/**
	 * 创建一个快捷方式函数
	 * @method js.util.Shortcut.create
	 * @static
	 * 
	 * @param {Object} interceptors
	 * @param {Number} index
	 */
	create: function (interceptors, index) {
		return this.attach(function () {
			return js.util.Shortcut.dispatch(arguments, index);
		}, interceptors);
	},
	
	/**
	 * 获取对象上的快捷方式实例
	 * @method js.util.Shortcut.get
	 * @private
	 * 
	 * @param {Object} object
	 * 
	 * @return {js.util.Shortcut}
	 */
	get: function (object) {
		var index = object[this.STAMP];
		return typeof index != 'undefined' ? this.dispatcher[index] : null;
	},
	
	/**
	 * 分发快捷处理
	 * @method js.util.Shortcut.dispatch
	 * @static
	 * 
	 * @param {Arguments} args
	 * @param {Number} index
	 * 
	 * @return {Any}
	 */
	dispatch: function (args, index) {
		var dispatcher = this.get(args.callee);
//		return dispatcher && dispatcher.dispatch.apply(dispatcher, [].slice.call(args));
		
		if (dispatcher) {
			if (args.length) {
				var Type = js.util.Type, processor = dispatcher.interceptor[Type.of(args[index || 0])];
				if (Type.isFunction(processor)) {
					return processor.apply(null, args);
				}
			}
			//没有任何参数的话返回快捷方式
			return dispatcher.mirror;
		}
	},
	
	/**
	 * 申明快捷方式，将会被作为快捷方式对象的快捷属性
	 * <p>将需要声明快捷方式的方法以一个name-value对象传入，则会把该成员以这个名字挂载到指定对象的快捷空间下。</p>
	 * @method js.util.Shortcut.use
	 * @static
	 * 
	 * @param {Object} object 挂载了快捷方式的对象
	 * @param {Object} args 传入name-method对，如：
	 * <pre><code>{test: someFunction}</code></pre>
	 * @param {Function} filter 过滤函数，遍历args，返回false的时候不会被申明为快捷方式。
	 */
	use: function (object, args, filter) {
		js.util.Class.extend(this.get(object).mirror, args, filter);
	},
	
	/**
	 * 对创建了快捷方式的实例申明类型拦截器，将会影响分发器的分发
	 * @method js.util.Shortcut.intercept
	 * @static
	 * 
	 * @param {Object} object 要注入拦截器的已创建快捷方式的实例
	 * @param {String/Object} type 单个拦截器的类型标识或一组拦截器
	 * @param {Function} processor (optional) 拦截器方法或undefined
	 */
	intercept: function (object, type, processor) {
		var Type = js.util.Type,
			dispatcher = this.get(object);
		if (Type.isObject(type) && Type.isUndefined(processor)) {
			for (var i in type) {
				this.intercept(object, i, type[i]);
			}
		} else {
			dispatcher.interceptor[type] = processor;
		}
	}
};

///import js.util.Class;
///import js.util.Type;