/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-02-15 by mytharcher
 * 
 * update:
 */

///import js.text.JSONParserFactory;
///import js.dom;
///import js.client.Features.~objectKeys;

/**
 * @class js.dom.Cookie
 * Cookie类对象，管理Cookie的常用方法
 * @singleton
 */
js.dom.Cookie = {
	/**
	 * 获取当前文档的cookie
	 * @method js.dom.Cookie.get
	 * @static
	 * 
	 * @param {String} key
	 * 
	 * @return {String/Object}
	 */
	get: function (key) {
		var cookie = js.dom.Cookie.parseJSON(document.cookie);
		return key ? cookie[key] : cookie;
	},
	
	/**
	 * 对当前文档设置cookie值
	 * @method js.dom.Cookie.set
	 * @static
	 * 
	 * @param {String/Object} key
	 * @param {String/Object} value
	 * @param {Object} option
	 */
	set: function (key, value, option) {
		var Cookie = js.dom.Cookie,
			Type = js.util.Type,
			option = option || {},
			value = Type.isDefined(value) ? value : option;
		if (arguments.length <= 2 && Type.isObject(value)) {
			if (Type.isObject(key)) {
				for (var i in key) {
					Cookie.set(i, key[i], value);
				}
			} else if (Type.isString(key)) {
				Cookie.set(Cookie.parseJSON(key), value);
			}
		} else {
			var exDate;
			if (Type.isDefined(option.until) || Type.isDefined(option.last)) {
				exDate = new Date(option.until || Date.now());
				exDate.setTime(exDate.getTime() + (option.last || 0));
			}
			document.cookie = [
				key,
				'=',
				encodeURIComponent(value),
				exDate ? ';expires=' + exDate.toGMTString() : '',
				option.path ? ';path=' + option.path : '',
				option.domain ? ';domain=' + option.domain : '',
				option.secure ? ';secure' : ''
			].join('');
		}
	},
	
	/**
	 * 移除当前文档cookie中的键
	 * @method js.dom.Cookie.remove
	 * @static
	 * 
	 * @param {String...} key
	 */
	remove: function (key) {
		var keys = [].slice.call(arguments, 0),
			option = {until: 0};
//		document.cookie = keys.join('=1;') + '=1;expires=' + (new Date(0)).toGMTString();
		for (var i = keys.length - 1; i >= 0; i--) {
			js.dom.Cookie.set(keys[i], 1, option);
		}
	},
	
	/**
	 * 清空当前文档所有cookie
	 * @method js.dom.Cookie.clear
	 * @static
	 */
	clear: function () {
		var Cookie = js.dom.Cookie;
		Cookie.remove.apply(Cookie, Object.keys(Cookie.get()));
	},
	
	/**
	 * @method js.dom.Cookie.parseJSON
	 * @private
	 * @static
	 */
	parseJSON: js.text.JSONParserFactory.createParser(';', '=', decodeURIComponent, true)
};

///import js.client.Features.~dateNow;