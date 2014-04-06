/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-08-10 by mytharcher
 * 
 * update:
 * 
 */

///import js.text.Escaper;

/**
 * @class js.text.Escaper
 */

/**
 * 编码HTML敏感字符
 * @method js.text.Escaper.escapeHTML
 * @static
 * 
 * @param {String} str
 * 
 * @return {String}
 */
js.text.Escaper.escapeHTML = function (str) {
	return str.replace(/([&<>'"])/g, function (matcher, symbol) {
		return '&#' + symbol.charCodeAt(0) + ';';
	});
};
