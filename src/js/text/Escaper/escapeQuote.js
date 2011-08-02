/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-01-18 by mytharcher
 * 
 * update:
 * 
 */

///import js.text.Escaper;

/**
 * @class js.text.Escaper
 */

/**
 * 转义字符串中的引号
 * @method js.text.Escaper.escapeQuote
 * @static
 * 
 * @param {String} source 要转义的字符串
 * 
 * @return {String} 转义后的字符串
 */
js.text.Escaper.escapeQuote = js.text.Escaper.escapeQuote || function (source) {
	return String(source)
		.replace(/(["'])/g, '\\\x241');
};