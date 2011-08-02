/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-01-13 By mytharcher
 * 
 * update:
 */

///import js.util.Class;
///import js.util.Set;
///import js.text;

/**
 * @class js.text.WordString 单词串类
 * 以某个字符分隔的单词组成的字符串
 * @extends js.util.Set
 */
js.text.WordString = js.text.WordString || js.util.Class.create({
	/**
	 * 构造函数
	 * @override
	 * @param {String} sep
	 */
	constructor: function (sep) {
		this._data = {};
		this.setSeperator(sep);
	},
	
	/**
	 * 设置分隔符
	 * @param {String} sep 新的分隔符
	 * @return {WordString} 返回自身引用以供链式调用
	 */
	setSeperator: function (sep) {
		this.seperator = sep || this.constructor.DEFAULT_SEPERATOR;
		return this;
	},
	
	/**
	 * 添加单词
	 * @override
	 * @param {Array/String} value 如果传入字符串
	 */
	addValue: function (value) {
		var Type = js.util.Type,
			values = Type.isArray(value) ? value : Type.isString(value) ? value.split(this.seperator) : [];
		values.filter(function (v) {
			return v != '';
		}).forEach(js.text.WordString.prototype.superClass.prototype.addValue, this);
	},
	
	/**
	 * 移除单词
	 * @param {Array/String} value 如果传入字符串
	 */
	removeValue: function (value) {
		var values = value instanceof Array ? value : value.split(this.seperator);
		values.forEach(js.text.WordString.prototype.superClass.prototype.removeValue, this);
	},
	
	/**
	 * 判断是否存在指定单词
	 * @override
	 * 
	 * @param {Array/String} value
	 * 
	 * @return {Boolean}
	 */
	contains: function (value) {
		var values = value instanceof Array ? value : value.split(this.seperator);
		return values.every(js.text.WordString.prototype.superClass.prototype.contains, this);
	},
	
	/**
	 * 添加或移除一个或一组单词
	 * 
	 * @param {Array/String} value
	 * @param {Boolean} on
	 * 
	 * @return {js.text.WordString}
	 */
	toggle: function (value, on) {
		var values = value instanceof Array ? value : value.split(this.seperator),
			hasOn = typeof on != 'undefined';
		for (var i = 0, len = values.length; i < len; i++) {
			var val = values[i];
			this[(hasOn ? on : !this.contains(val)) ? 'add' : 'remove'](val);
		}
		return this;
	},
	
	/**
	 * 输出为字符串
	 * @override
	 * @param {Boolean} tail 是否在尾部也输出分隔符。默认：false。
	 * 
	 * @return {String} 返回以分隔符分隔的字符串。
	 */
	toString: function(tail) {
		var sep = this.seperator;
		return Object.keys(this._data).join(sep) + (tail ? sep : '');
	}
}, js.util.Set);

js.util.Class.copy({
	/**
	 * 默认用空格做分隔符
	 * @static
	 * @property js.text.WordString.DEFAULT_SEPERATOR
	 * @type {String}
	 */
	DEFAULT_SEPERATOR: ' ',
	
	/**
	 * 对一个字符串添加单词
	 * @method js.text.WordString.add
	 * @static
	 * 
	 * @param {String} str 要添加到的字符串
	 * @param {String/Array} words 要添加的单词
	 * 
	 * @return {String} 返回添加后的词串
	 */
	add: function (str, words, sep) {
		return (new this(sep)).add(str).add(words).toString();
	},
	
	/**
	 * 对一个字符串移除一个或多个单词
	 * @method js.text.WordString.remove
	 * @static
	 * 
	 * @param {String} str 要添加到的字符串
	 * @param {String/Array} words 要添加的单词
	 * 
	 * @return {String} 返回添加后的词串
	 */
	remove: function (str, words, sep) {
		return (new this(sep)).add(str).remove(words).toString();
	},
	
	/**
	 * 判断一个字符串内是否存在指定的单词
	 * @method js.text.WordString.contains
	 * @static
	 * 
	 * @param {String/Array} str 需要检测的字符串
	 * @param {String/Array} word 要判断的单词，可以是拼接的字符串，也可以是数组
	 * 
	 * @return {Boolean} 存在为true，不存在为false，只要有一个className不存在即为false
	 */
	contains: function (str, word, sep) {
		var wStr = (new this(sep)).add(str);
		return wStr.contains(word);
	},
	
	/**
	 * className开关
	 * @static
	 * 
	 * 如果设置了on参数，则按on添加或删除word，否则如果存在word则删除，反之添加
	 * 
	 * @param {String} str 要进行操作的单词串
	 * @param {String/Array} word 要添加/移除的class，可以是多个className拼接的字符串，也可以是数组
	 * @param {String} sep 分隔符
	 * @param {Boolean} on 开关项，默认不使用，如果设置了，将强制按on设置的添加或删除单词
	 */
	toggle: function (str, word, sep, on) {
		var wStr = (new this(sep)).add(str);
		return wStr.toggle(word, on).toString();
	}
}, js.text.WordString);

///import js.client.Features.~objectKeys;
///import js.client.Features.~arrayEvery;
///import js.client.Features.~arrayForEach;