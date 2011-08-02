/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-17 By mytharcher
 * 
 * update:
 * 
 */

///import js.util;

/**
 * @class js.util.Global
 * 全局环境管理类
 * @singleton
 */
js.util.Global = js.util.Global || {
	/**
	 * 创建全局唯一id字符串
	 * @method js.util.Global.guid
	 * @static
	 * 
	 * 实现机制是简单的计数器++
	 * 
	 * @param {String} prefix 前缀串
	 * @param {String} suffix 后缀串
	 * 
	 * @return {String}
	 */
	guid: function (prefix, suffix) {
		var guid = this.guid;
		return (prefix || '') + (guid.i ? ++guid.i : (guid.i = 1)) + (suffix || '');
	},
	
	/**
	 * 给一个对象打上唯一标识，如果已经打过标识，则返回这个标识
	 * @method js.util.Global.stamp
	 * @static
	 * 
	 * @param {Object} object 要打标识的对象
	 * 
	 * @return {String}
	 */
	stamp: function (object) {
		var stamp = this.STAMP;
		var id = object[stamp];
		return id ? id : (object[stamp] = this.guid(stamp));
	},
	
	/**
	 * 空操作
	 * @method js.util.Global.noop
	 * @static
	 */
	noop: function () {},
	
	/**
	 * 获取全局对象，web应用中即获取window
	 * @method js.util.Global.getGlobal
	 * @static
	 * 
	 * @return {Object}
	 */
	getGlobal: function () {
		return (function () {return this;})();
	}
};

js.util.Global.STAMP = js.util.Global.guid('_ELF_' + (+new Date) + '_');