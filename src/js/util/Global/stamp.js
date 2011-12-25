/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-08-13 By mytharcher
 * 
 * update:
 * @2011-08-29 by mytharcher
 * 		[m] Add a param to specify a different stamp key from default.
 */

///import js.util.Global.guid;
///import js.util.Global._STAMP;

/**
 * @class js.util.Global
 */
/**
 * 给一个对象打上唯一标识，如果已经打过标识，则返回这个标识
 * @method js.util.Global.stamp
 * @static
 * 
 * @param {Object} object 要打标识的对象
 * @param {String} key 预设值的key，防止多次使用时的冲突，例如在XArray去重功能中。
 * 
 * @return {String}
 */
js.util.Global.stamp = function (object, key) {
	var stamp = key || js.util.Global._STAMP;
	var id = object[stamp];
	return id ? id : (object[stamp] = js.util.Global.guid(stamp));
};