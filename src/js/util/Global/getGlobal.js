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
 * 获取全局对象，web应用中即获取window
 * @method js.util.Global.getGlobal
 * @static
 * 
 * @return {Object}
 */
js.util.Global.getGlobal = function () {
	return (new Function('return this;'))();
};