/*
 * js Javascript Library
 * 
 * create:
 * @2010-11-16 by mytharcher
 * 
 * update:
 * @2010-04-27 by mytharcher
 * @2010-04-12 by mytharcher
 * @2011-04-13 by mytharcher
 * 		[m] Change the implement of method "parse" from using "eval" to "new Function".
 */

///import js.util;

/**
 * @class js.util.JSON
 * from tangram baidu.json
 * JSON处理类
 * @singleton
 */
js.util.JSON = js.util.JSON || {
	
	
	/**
	 * 解析json格式的字符串
	 * @static
	 * 
	 * @param {String} str 要解析的字符串
	 * 
	 * @return {Object}
	 */
	parse: function(str){
		return (new Function('return (' + str + ')'))();
	},
	
	/**
	 * 将json对象序列化为字符串
	 * @static
	 * 
	 * @param {Object} 要序列化的JSON对象
	 * 
	 * @return {String}
	 */
	stringify: (function(){
		/**
		 * 字符串处理时需要转义的字符表
		 * @private
		 */
		var escapeMap = {
			"\b": '\\b',
			"\t": '\\t',
			"\n": '\\n',
			"\f": '\\f',
			"\r": '\\r',
			'"': '\\"',
			"\\": '\\\\'
		};
		
		/**
		 * 字符串序列化
		 * @private
		 */
		function encodeString(source){
			if (/["\\\x00-\x1f]/.test(source)) {
				source = source.replace(/["\\\x00-\x1f]/g, function(match){
					var c = escapeMap[match];
					if (c) {
						return c;
					}
					c = match.charCodeAt();
					return "\\u00" +
					Math.floor(c / 16).toString(16) +
					(c % 16).toString(16);
				});
			}
			return '"' + source + '"';
		}
		
		/**
		 * 数组序列化
		 * @private
		 */
		function encodeArray(source){
			var result = ["["], l = source.length, preComma, i, item;
			
			for (i = 0; i < l; i++) {
				item = source[i];
				
				switch (typeof item) {
					case "undefined":
					case "function":
					case "unknown":
						break;
					default:
						if (preComma) {
							result.push(',');
						}
						result.push(JSON.stringify(item));
						preComma = 1;
				}
			}
			result.push("]");
			return result.join("");
		}
		
		/**
		 * 处理日期序列化时的补零
		 * @private
		 */
		function pad(source){
			return source < 10 ? '0' + source : source;
		}
		
		/**
		 * 日期序列化
		 * @private
		 */
		function encodeDate(source){
			return '"' + source.getFullYear() + "-" +
			pad(source.getMonth() + 1) +
			"-" +
			pad(source.getDate()) +
			"T" +
			pad(source.getHours()) +
			":" +
			pad(source.getMinutes()) +
			":" +
			pad(source.getSeconds()) +
			'"';
		}
		
		return function(value){
			switch (typeof value) {
				case 'undefined':
					return 'undefined';
					
				case 'number':
					return isFinite(value) ? String(value) : "null";
					
				case 'string':
					return encodeString(value);
					
				case 'boolean':
					return String(value);
					
				default:
					if (value === null) {
						return 'null';
					} else 
						if (value instanceof Array) {
							return encodeArray(value);
						} else 
							if (value instanceof Date) {
								return encodeDate(value);
							} else {
								var result = ['{'], encode = JSON.stringify, preComma, item;
								
								for (var key in value) {
									if (value.hasOwnProperty(key)) {
										item = value[key];
										switch (typeof item) {
											case 'undefined':
											case 'unknown':
											case 'function':
												break;
											default:
												if (preComma) {
													result.push(',');
												}
												preComma = 1;
												result.push(encode(key) + ':' + encode(item));
										}
									}
								}
								result.push('}');
								return result.join('');
							}
			}
		};
	})()
};