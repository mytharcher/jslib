/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-12-27 by mytharcher
 * 
 * update:
 */

/**
 * @class Function
 */

/**
 * 返回一个作用域被修改为参数指向对象的当前函数
 * @method bind
 * 
 * @param {Object} obj
 * 
 * @return {Function}
 */
if (!Function.prototype.bind) {
	Function.prototype.bind = function(obj) {
		var slice = [].slice,
			args = slice.call(arguments, 1), 
			sjs = this, 
			nop = new Function(), 
			bound = function () {
				return sjs.apply( this instanceof nop ? this : ( obj || {} ), 
					args.concat( slice.call(arguments) ) );	
			};
	
		nop.prototype = sjs.prototype;
	
		bound.prototype = new nop();
		
		return bound;
	};
}


//if (!Function.prototype.bind) {
//	Function.prototype.bind = function(obj){
//		var me = this,
//			slice = [].slice,
//			args = slice.call(arguments, 1);
//		return function () {
//			return me.apply(obj, args.concat(slice.call(arguments)));
//		}
//	}
//}