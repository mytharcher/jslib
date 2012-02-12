/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-08-13 By mytharcher
 * 
 * update:
 */

///import js.util.Global;

/**
 * @class js.util.Global
 */
/**
 * 创建全局唯一id字符串
 * @method js.util.Global.guid
 * @static
 * 
 * 实现机制是简单的计数器++
 * 
 * @param {String} prefix 前缀串
 * @param {String} suffix 后缀串
 * 
 * @return {String}
 */
js.util.Global.guid = function (prefix, suffix) {
	var guid = js.util.Global.guid;
	return (typeof prefix != 'undefined' ? prefix : '') + (guid.i ? ++guid.i : (guid.i = 1)) + (typeof suffix != 'undefined' ? suffix : '');
};