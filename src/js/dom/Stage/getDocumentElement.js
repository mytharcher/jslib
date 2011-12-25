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
 * 获取文档根节点元素
 * @method js.dom.Stage.getDocumentElement
 * @static
 * 
 * @param {Window} win (optional)对应窗口，可以用于指定获取特定窗口的文档
 * 
 * @return {HTMLDocumentElement}
 */
js.dom.Stage.getDocumentElement = function (win) {
	var doc =js.dom.Stage.getDocument(win);
	return doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;
};