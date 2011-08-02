/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-02-27 by mytharcher
 * 
 * update:
 * @2010-12-27 by mytharcher
 * 		[m] Simplify the code.
 */

///import js.util.JSON;

/**
 * @ignore
 * 修复IE没有JSON处理类
 */

/**
 * @class JSON
 * JSON处理类
 */

/**
 * @method parse
 * @see js.util.JSON.parse
 */
/**
 * @method stringify
 * @see js.util.JSON.stringify
 */
window.JSON = window.JSON || js.util.JSON;