/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-08-10 by mytharcher
 * 
 * update:
 * 
 */

///import js.text.Encoder;

/**
 * @class js.text.Encoder
 */

/**
 * 编码HTML敏感字符
 * @method js.text.Encoder.encodeHTML
 * @static
 * 
 * @param {String} str
 * 
 * @return {String}
 */
js.text.Encoder.encodeHTML = function (str) {
	return str.replace(/([&<>'"])/g, function (matcher, symbol) {
		return '&#' + symbol.charCodeAt(0) + ';';
	});
};
