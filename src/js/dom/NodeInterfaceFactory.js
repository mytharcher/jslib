/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-17 by mytharcher
 * 
 * update:
 * @2010-11-19 by mytharcher
 * 
 */

///import js.util.Class;
///import js.util.InterfaceFactory;
///import js.dom;

/**
 * @class js.dom.NodeInterfaceFactory
 * Node类接口工厂，用于创建给Node类实现的接口，继承自js.util.InterfaceFactory
 * @extends js.util.InterfaceFactory
 * @singleton
 */
js.dom.NodeInterfaceFactory = js.dom.NodeInterfaceFactory || js.util.Class.extend({
	/**
	 * 创建接口类
	 * @method js.dom.NodeInterfaceFactory.create
	 * @static
	 * 
	 * @param {Object} options 参数集
	 * @return {Object}
	 */
	
	/**
	 * 模板方法
	 * @private
	 * 
	 * @param {Object} base
	 * @param {String} method
	 * 
	 * @return {Function} 
	 */
	template: function(base, method, key){
		//判断是否是get类只针对一个元素操作的方法
		return key.custom || (key.single ? function(){
			return base[method].apply(base, [this[0]].concat([].slice.call(arguments)));
		} : function(){
			var args = [].slice.call(arguments);
			this.forEach(function(element){
				return base[method].apply(base, [element].concat(args));
			}, this);
			return this;
		});
	}
}, js.util.InterfaceFactory);