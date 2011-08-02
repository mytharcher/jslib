/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-11-15 by mytharcher
 * 
 * update:
 * @2010-12-27 by mytharcher
 */

/**
 * @ignore
 * 修复IE没有Date.now函数
 */
if (!Date.now) {
	/**
	 * @class Date
	 */
	
	/**
	 * 返回当前时间的毫秒数
	 * @static
	 * 
	 * @return {Number};
	 */
	Date.now = function(){
		return + new Date;
	};
}