/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-21 by mytharcher
 * 
 * update:
 * 
 */

///import js.util;

/**
 * @class js.util.InterfaceFactory
 * 类接口工厂
 * @singleton
 */
js.util.InterfaceFactory = js.util.InterfaceFactory || {
	/**
	 * 创建接口
	 * @method js.util.InterfaceFactory.create
	 * @static
	 * 
	 * @param {String} option.name 多是Pascal命名的方法，如：ClassName则传入name: "Class"，加上key得到的方法名即：addClass
	 * @param {Object} option.base 使用哪个对象上的静态方法创建，如：base: js.dom.ClassName
	 * @param {Array} option.methods 需要创建接口的方法名列表，如：methods: ['add', 'remove']，这些方法名直接对应原有对象的方法名，并与name参数拼装后形成接口的方法名。
	 * @param {Array} option.alias 新接口名称的别名，如有则在接口上增加该别名的对应的方法，别名数组需要与方法名列表一一对应。
	 * 
	 * @return {Object}
	 */
	create: function (option) {
		var keys = option.methods,
			name = option.name || '',
			proto = {},
			template = option.template || this.template;
		for (var i = keys.length - 1; i >= 0; i--) {
			var key = keys[i];
			var method = key.method || key;
			var methodName = method + name;
			//这里执行函数闭包会返回key对应的实际接口方法
			proto[methodName] = template(option.base, method, key);
			
			var alias = key.alias;
			if (alias) {
				proto[alias] = proto[methodName];
			}
		}
		
		return proto;
	},
	
	/**
	 * 模板方法
	 * @static
	 * 
	 * @param {Object} base 实现基础类
	 * @param {String} method 方法名标识
	 * @return {Function} 返回包装过的对应method接口标识的方法
	 */
	template: function (base, method) {
		return function () {
			return base[method].apply(base, [this].concat([].slice.call(arguments)));
		};
	}
};