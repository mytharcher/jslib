/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-04-09 by mytharcher
 * 
 * update:
 * @2010-04-27 by mytharcher
 * @2010-11-18 by mytharcher
 */

///import js.util;
///import js.util.Class;

/**
 * @class js.util.Hash 哈希表类
 */
js.util.Hash = js.util.Class.create({
	
	/**
	 * 初始化，会调用set方法完成构造
	 * @param {String/Object} key 初始化传入的键名或键值对集合，如传入的是Object，则忽略value参数。
	 * @param {Any} value 初始化传入的键名或空，如key传入了Object，则此项被忽略。
	 * @return {Hash} 返回创建的Hash实例
	 */
	constructor: function (key, value) {
		this._data = {};
		return this.set.apply(this, arguments);
	},
	
	/**
	 * 获取表中的值
	 * @param {String} key 传入key则根据key获取值，否则获取整个表对象
	 * @return {Any} 返回对应键的值
	 */
	get: function (key) {
		return typeof key != 'undefined' ? this._data[key] : this._data;
	},
	
	/**
	 * 更新操作
	 * @private
	 * 
	 * @param {String} type
	 * @param {String/Object/Hash} key
	 * @param {String/Number/Array} value
	 * 
	 * @return {Hash} 返回当前实例以继续操作
	 */
	_update: function (type, key, value) {
		if (typeof key != 'undefined' && key !== null) {
			var methodMap = this.constructor._updataMethod;
			var map = this._data;
			if (typeof value == 'undefined') {
				if (key.constructor == this.constructor) {
					if (key == this) {
						return this;
					} else {
						return methodMap[type].update.call(this, key.get());
					}
				} else {
					var json = key;
					if (typeof json == 'string') {
						json = this.constructor.parseJSON(json);
					}
					for (var i in json) {
						methodMap[type].updateValue.call(this, i, json[i]);
					}
				}
			} else if (typeof key == 'string' && key) {
				methodMap[type].updateValue.call(this, key, value);
			}
		}
		return this;
	},
	
	/**
	 * 添加键值对(或组)，抽象方法，默认以set方法实现
	 * <p>与set方法不同的是，set会直接覆盖该键上的值，而add可以追加</p>
	 * 
	 * @param {String/Object/Hash} key
	 * @param {String/Number/Array} value
	 * 
	 * @return {Hash}
	 */
	add: function (key, value) {
		return this._update(this.constructor.UPDATE_TYPE_ADD, key, value);
	},
	
	/**
	 * 添加一个键值对，抽象方法，默认以setValue方式实现
	 * @param {String} key
	 * @param {String|Number} value
	 * 
	 * @return {Hash}
	 */
	addValue: function (key, value) {
		return this.setValue(key, value);
	},
	
	/**
	 * 移除键值对
	 * 
	 * @param {String|null} key
	 * 
	 * @return {Hash}
	 */
	remove: function (key) {
		if (key) {
			delete this._data[key];
		} else {
			this._data = {};
		}
		return this;
	},
	
	/**
	 * 设置值的入口方法
	 * 
	 * @param {Object/String} key 对象或键名或json串
	 * @param {String/Array} value (optional)键值
	 * 
	 * @return {Hash}
	 */
	set: function (key, value) {
		return this._update(this.constructor.UPDATE_TYPE_SET, key, value);
	},
	
	/**
	 * 设置某个键的值
	 * @param {String} key 键名
	 * @param {All} value 键值
	 * 
	 * @return {Hash} 返回自身实例，以供链式调用
	 */
	setValue: function (key, value) {
		var map = this._data;
		if (value === null) {
			delete map[key];
		} else {
			map[key] = value;
		}
		return this;
	},
	
	/**
	 * 输出为字符串
	 * 
	 * @return {String}
	 */
	toString: function () {
		return JSON.stringify(this._data);
	}
});

js.util.Class.copy({
	
	UPDATE_TYPE_ADD: 'add',
	UPDATE_TYPE_SET: 'set',
	
	/**
	 * @ignore
	 * 更新方法映射表
	 * 
	 * fuck! 这么长时间我都忘记为啥要写这么复杂的逻辑了。。。
	 */
	_updataMethod: {
		'add': {
			'update': function (key, value) {
				return this.add(key, value);
			},
			'updateValue': function (key, value) {
				return this.addValue(key, value);
			}
		},
		'set': {
			'update': function (key, value) {
				return this.set(key, value);
			},
			'updateValue': function (key, value) {
				return this.setValue(key, value);
			}
		}
	},
	
	/**
	 * 解析为JSON类型，会调用JSON类的分析函数来处理
	 * @method js.util.Hash.parseJSON
	 * @static
	 * 
	 * @param {String} source 需要解析的字符串
	 * @return {Object} 解析的json结果
	 */
	parseJSON: function(source){
		return JSON.parse(source);
	}
}, js.util.Hash);

///import js.client.Features.~json;