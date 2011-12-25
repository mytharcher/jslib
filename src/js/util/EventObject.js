/*
 * jslib JavaScript Library
 * 
 * create: 
 * @2011-08-25 by mytharcher
 * 
 * update:
 */

///import js.util.Class;

/**
 * @class js.util.EventObject
 * 自定义事件
 */
js.util.EventObject = js.util.Class.create({
	/**
	 * 构造函数
	 * @param {Object} args
	 */
	constructor: function (args) {
		this.returnValue = true;
		
		js.util.Class.copy(args, this);
	},
	
	/**
	 * 阻止默认事件
	 * @method preventDefault
	 */
	preventDefault: function () {
		this.returnValue = false;
	}
});
