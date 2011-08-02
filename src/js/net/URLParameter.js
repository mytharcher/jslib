/*
 * Javascript Common Library: js
 * author: mytharcher
 * update: 2010-4-9
 */

///import js.util.Class;
///import js.util.Hash;
///import js.net;

/**
 * @class js.net.URLParameter URL参数串处理类
 * @extends js.util.Hash
 */
js.net.URLParameter = js.util.Class.create({
	
	/**
	 * @private
	 */
	//map: {},
	
	/**
	 * 对一个参数名加一个值
	 * 
	 * @param {String} key
	 * @param {String/Array} value
	 * 
	 * @return {URLParameter} 返回自身对象，以供链式调用
	 */
	addValue: function (key, value) {
		var map = this._data;
		if (!map[key]) {
			map[key] = {};
		}
		
		var keyObj = map[key];
		var valueObj = {};
		if (value instanceof Array) {
			for (var i = 0, l = value.length; i < 0; i++) {
				this.add(key, value[i]);
			}
		} else {
			if (value !== null) {
				keyObj[value] = 1;
			}
		}
		
		return this;
	},
	
	/**
	 * 移除一个参数
	 * 
	 * @param {String} key 要移除的参数名
	 * @param {String} value 要移除的参数值
	 * 
	 * @return {URLParameter} 返回自身实例，以供链式调用
	 */
	remove: function (key, value) {
		if (key) {
			delete (typeof value != 'undefined' ? this._data[key][value] : this._data[key]);
		} else {
			this._data = {};
		}
		return this;
	},
	
	/**
	 * 获取参数
	 * 
	 * @param {String} (optional)key 要获取的参数名，如不传入此参数，则返回全部参数对象
	 * 
	 * @return {Array/String/Object}
	 */
	get: function (key) {
		var ret = [];
		var param = this._data;
		if (key) {
			var value = param[key];
			if (value) {
				for (var i in value) {
					ret.push(i);
				}
			}
			ret = ret.length ? ret.length == 1 ? ret[0] : ret : null;
		} else {
			ret = {};
			for (var i in param) {
				var item = this.get(i);
				if (item !== null) {
					ret[i] = item;
				}
			}
		}
		return ret;
	},
	
	/**
	 * 设置单个参数
	 * 
	 * @param {String} key 需要设置的参数名
	 * @param {String} value 需要设置的参数值，如果为null，则remove掉这个参数
	 * 
	 * @return URLParameter
	 */
	setValue: function (key, value) {
		if (value === null) {
			this.remove(key);
		} else {
			var valueObj = {};
			if (value instanceof Array) {
				for (var i = 0, l = value.length; i < l; i++) {
					valueObj[value[i]] = 1;
				}
			} else {
				valueObj[value] = 1;
			}
			
			this._data[key] = valueObj;
		}
		return this;
	},
	
	/**
	 * 设置参数
	 * 
	 * @param {String/Object} key 需要设置的参数名，或新的url参数串，当参数是object时，以key-value形式遍历设置
	 * @param {String/Array} value 如果值不是一个数组，将被转化成一个数组。如果不传入value，那么就按照url参数格式解析并对param扩展，如果为null，则remove掉这个参数
	 * 
	 * @return {URLParameter} 返回自身实例，以供链式调用
	 */
	
	/**
	 * 输出为字符串
	 * 
	 * @param {Function} encoder 传入对所有参数值进行编码的函数，默认不编码
	 * 
	 * @return {String}
	 */
	toString: function (encoder) {
		var param = this._data;
		var ret = [];
		var useEncoder = typeof encoder == 'function';
		for(var i in param){
			if(i.toString().length && typeof(param[i]) != 'undefined' && param[i] != null){
				var p = param[i];
				
				for (var j in p) {
					if (p[j]) {
						ret.push('&', i, '=', useEncoder ? encoder(j) : j);
					}
				}
			}
		}
		ret.shift();
		return ret.join('');
	}
}, js.util.Hash);


/**
 * 将一个参数串转化成JSON类型
 * @method parseJSON
 * @static
 * 
 * @param {String} p 要解析的字符串
 * @param {Function} decoder (optional)解码器函数，非必选
 * 
 * @return {Object} 返回一个key-value参数对象集合
 */
js.net.URLParameter.parseJSON = function(p, decoder){
	var param = {};
	
	if (p.indexOf('?') == 0) {
		p = p.substr(1);
	}
	p = p.replace(/^[\?&]*|&*$/, '').split('&');
	
	var paramFlag = {};
	
	for (var i = 0, l = p.length; i < l; i++) {
		if (p[i]) {
			var pair = p[i].split('=');
			var key = pair[0], value = pair[1];
			value = typeof decoder == 'function' ? decoder(value) : value;
			if (!paramFlag[key]) {
				param[key] = [value];
				paramFlag[key] = 1;
			}
			else {
				param[key].push(value);
			}
		}
	}
	
	return param;
};