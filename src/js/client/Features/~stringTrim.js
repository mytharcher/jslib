/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-02-27 by mytharcher
 * 
 * update:
 * @2010-12-27 by mytharcher
 */

/**
 * @ignore
 * 修复IE没有字符串trim函数
 */
if (!String.prototype.trim) {
	/**
	 * @class String
	 */
	
	/**
	 * 删除字符串两端的空白字符
	 * 
	 * @return {String} 返回删除空白后新的字符串
	 */
	String.prototype.trim = function(){
		return this.replace(/^\s+|\s+$/g, '');
	};
}