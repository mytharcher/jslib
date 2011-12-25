/*
 * js Javascript Library
 * 
 * create:
 * @2010-11-18 by mytharcher
 * 
 * update:
 * @2010-12-27 by mytharcher:
 * 		[m] Reversed the meaning of trim parameter.
 * @2011-09-27 by mytharcher:
 * 		[m] Fix bug in method "createParser" for opposite order of parsing string.
 * 
 */

///import js.text;

/**
 * @class js.text.JSONParserFactory
 * 类JSON串分析器工厂类
 * @static
 * @singleton
 */
js.text.JSONParserFactory = js.text.JSONParserFactory || {
	/**
	 * 生成分析器
	 * @method js.text.JSONParserFactory.createParser
	 * @static
	 * 
	 * @param {String} sepChar 键值对分隔符
	 * @param {String} letChar 键值分隔符
	 * @param {Function} valueFilter 值过滤器，可选，默认：null
	 * @param {Boolean} trim 应用trim，可选，默认：false
	 * 
	 * @return {Function}
	 */
	createParser: function (sepChar, letChar, valueFilter, trim) {
		return function (source) {
			var ret = {};
			var sArr = source.split(sepChar);
			for (var i = 0, len = sArr.length; i < len; i++) {
				var pairStr = sArr[i];
				if (trim ? pairStr.trim() : pairStr) {
					var pair = pairStr.split(letChar);
					if (pair.length == 2) {
						var key = pair[0], value = pair[1];
						key = trim ? key.trim() : key;
						value = trim ? value.trim() : value;
						if (key) {
							ret[key] = typeof valueFilter == 'function' ? valueFilter(value) : value;
						}
					}
				}
			}
			return ret;
		}
	},
	
	/**
	 * 创建字符串生成器
	 * @static
	 * 
	 * @param {String} sepChar 键值对分隔符
	 * @param {String} letChar 键值分隔符
	 * @param {Function} valueFilter 值过滤器，可选，默认：null
	 * @param {Boolean} tailSep 是否需要尾分隔符，可选，默认：false
	 * 
	 * @return {Function}
	 */
	createStringifier: function (sepChar, letChar, valueFilter, tailSep) {
		return function (json) {
			var ret = [];
			for (var key in json) {
				ret.push(key, letChar, typeof valueFilter == 'function' ? valueFilter(json[key]) : json[key], sepChar);
			}
			!tailSep && ret.pop();
			return ret.join('');
		}
	}
};

///import js.client.Features.~stringTrim;