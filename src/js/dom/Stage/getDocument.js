/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-11-23 by mytharcher
 * 
 * update:
 */

///import js.dom.Stage;

/**
 * 获取文档元素
 * @method js.dom.Stage.getDocument
 * @static
 * 
 * @param {Window} win (optional)对应窗口，可以用于指定获取特定窗口的文档
 * 
 * @return {HTMLDocument}
 */
js.dom.Stage.getDocument = function (win) {
	return (win || window).document;
};