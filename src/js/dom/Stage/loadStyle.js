/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-2-13 by mytharcher
 * 
 * update:
 */

///import js.dom.Stage;

/**
 * @class js.dom.Stage
 */

/**
 * 加载样式表
 * @method js.dom.Stage.loadStyle
 * @static
 * 
 * @param {String} url 样式表的URL地址
 * @param {Boolean} noCache 是否清除缓存
 */
js.dom.Stage.loadStyle = function (url, noCache) {
	var url = new js.net.URL(url);
	if (noCache) {
		url.setParameter(Date.now(), Math.random());
	}
	
	var css = document.createElement('link');
	css.setAttribute('type', 'text/css');
	css.setAttribute('rel', 'stylesheet');
	css.setAttribute('href', url.toString());
	document.getElementsByTagName('head')[0].appendChild(css);
	css = null;
};

///import js.net.URL;
///import js.client.Features.~dateNow;