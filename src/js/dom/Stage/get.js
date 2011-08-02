/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-04-12 by mytharcher
 * 
 * update:
 */

///import js.dom.Stage;

/**
 * @class js.dom.Stage
 */

/**
 * 根据id获取元素。
 * @method js.dom.Stage.get
 * @static
 * 
 * @param {String/Element} 要获取的元素的id，如传入的就是元素，则直接返回该元素
 * 
 * @return {Element} 返回对应id的元素
 */
js.dom.Stage.get = function (id) {
	return typeof id == 'string' ? document.getElementById(id) : id;
};