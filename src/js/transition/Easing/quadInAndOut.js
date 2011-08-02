/*
 * js Javascript Library
 * 
 * create:
 * @2010-07-22 by mytharcher
 * 
 * update:
 */

///import js.transition.Easing;

/**
 * @class js.transition.Easing
 */
/**
 * 二次渐强-渐弱变化
 * @method js.transition.Easing.quadInAndOut
 * @static
 * 
 * @param {Number} t 0~1之间的数，代表当前进行到的时间总量的百分比
 * 
 * @return {Number}
 */

js.transition.Easing.quadInAndOut = function (t) {
	var Easing = js.transition.Easing;
	return t < 0.5 ? Easing.quadIn(t) : Easing.quadOut(t);
};