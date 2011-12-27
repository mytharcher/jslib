/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-01-14 by mytharcher
 * 
 * update:
 */

///import js.util;
///import js.util.Class;
///import js.util.Global.stamp;

/**
 * @class js.util.Set
 * 集合类
 */
js.util.Set = js.util.Set || js.util.Class.create({
	/**
	 * 构造函数
	 * @param {Any} args... (optional)需要建立集合的元素，将会被添加到集合内
	 */
	constructor: function () {
		this._data = {};
		this.add.apply(this, arguments);
		
		var data = {};
	},
	
	/**
	 * 判断集合是否为空
	 * 
	 * @return {Boolean} 为空返回true，不为空返回false
	 */
	isEmpty: function () {
		var flag = true, data = this._data;
		for (var i in data) {
			if (data.hasOwnProperty(i)) {
				flag = false;
				break;
			}
		}
		return flag;
	},
	
	/**
	 * 判断集合是否包含指定元素
	 * @param {Any} value 要判断的元素
	 * @return {Boolean}
	 */
	contains: function (value) {
		return typeof this._data[this.constructor._key(value)] != 'undefined';
	},
	
	/**
	 * 获取当前集合的长度
	 * @method getLength
	 * 
	 * @return {Number}
	 */
	getLength: function () {
		return Object.keys(this._data).length;
	},
	
	/**
	 * 对集合添加元素
	 * @param {Any} args... (optional)需要添加的元素
	 * @return {Set} 返回自身引用以供链式调用
	 */
	add: function () {
		return this._processArguments(arguments, this.addValue);
	},
	
	/**
	 * 添加一个元素
	 * @ignore
	 * @protected
	 * @param {Object} value 要添加的元素，undefined类型的值不会被添加。
	 */
	addValue: function (value) {
		if (typeof value != 'undefined') {
			this._data[this.constructor._key(value)] = value;
		}
	},
	
	/**
	 * 对集合移除已有的元素
	 * @param {Any} args... (optional)需要移除的元素
	 * @return {Set} 返回自身引用以供链式调用
	 */
	remove: function () {
		return this._processArguments(arguments, this.removeValue);
	},
	
	/**
	 * 移除一个元素
	 * @ignore
	 * @protected
	 * @param {Object} value
	 */
	removeValue: function (value) {
		delete this._data[this.constructor._key(value)];
	},
	
	/**
	 * 清空集合
	 * @method clear
	 */
	clear: function () {
		var data = this._data;
		for (var i in data) {
			if (data.hasOwnProperty(i)) {
				delete data[i];
			}
		}
	},
	
	/**
	 * 处理参数
	 * @private
	 * 
	 * @param {Arguments} args 要处理的参数对象
	 * @param {Function} processor 处理函数
	 * 
	 * @return {js.util.Set} 返回自身以供链式调用
	 */
	_processArguments: function (args, processor) {
		[].slice.call(args, 0).forEach(processor, this);
		return this;
	},
	
	/**
	 * 将集合转化为数组返回
	 * 
	 * @return {Array}
	 */
	toArray: function (sort) {
		var ret = [];
		for (var key in this._data) {
			ret.push(this._data[key]);
		}
		return ret;
	}
});

/**
 * 计算一个值的键
 * @method js.util.Set.key
 * @private
 * 
 * 如果值为普通类型，则直接使用value.toString()，否则会给对象类型的值添加一个stamp属性，并自动生成唯一键名。
 * 
 * @param {Any} value
 * 
 * @return {String}
 */
js.util.Class.copy({
	/**
	 * 从一个数组生成集合对象
	 * @method js.util.Set.fromArray
	 * @static
	 * 
	 * @param {Array} array
	 * 
	 * @return {js.util.Set}
	 */
	fromArray: function (array) {
		var set = new this();
		return set.add.apply(set, array);
	},
	
	_key: function(value){
		var type = typeof value;
		return (type == 'object' || type == 'function' ? js.util.Global.stamp(value) : value) + '';
	}
}, js.util.Set);

///import js.client.Features.~objectKeys;
///import js.client.Features.~arrayForEach;