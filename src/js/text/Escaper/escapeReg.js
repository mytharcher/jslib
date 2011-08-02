/*
 * jslib JavaScript Library
 * 
 * from baidu Tangram: baidu.string.escapeReg
 * 
 * create:
 * @2010-11-20 by mytharcher
 * 
 * update:
 * 
 */

///import js.text.Escaper;

/**
 * @class js.text.Escaper
 */

/**
 * 转义字符串中的正则相关字符
 * @method escapeReg
 * @static
 * 
 * @param {String} source 要转义的字符串
 * 
 * @return {String} 转义后的字符串
 */
js.text.Escaper.escapeReg = js.text.Escaper.escapeReg || function (source) {
	return String(source)
		.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\\x241');
};