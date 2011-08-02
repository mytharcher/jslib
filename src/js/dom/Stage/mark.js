/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-04-12 by mytharcher
 * 
 * update:
 */

///import js.util.Global;
///import js.dom.Stage;

/**
 * @class js.dom.Stage
 */

/**
 * 获取元素的id，如果元素不存在id，那么就生成一个唯一id
 * @method js.dom.Stage.mark
 * @static
 * 
 * @param {Element} element 要获取id的元素
 * 
 * @return {String} 返回该元素的id
 */
js.dom.Stage.mark = function (element) {
	return element.id || (element.id = js.util.Global.guid('ELF_DOM_ID_'));
};