/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-04-21 By mytharcher
 * 
 * update:
 * @2010-04-27 By mytharcher
 * @2010-11-20 By mytharcher
 */

///import js.client;

/**
 * @class js.client.Browser
 * <h2>浏览器类型及版本信息对象</h2>
 * 
 * <p>存放浏览器类型及版本的信息，通过属性取得一个浏览器版本号的小数，保留一位“.”后的子版本号。</p>
 * <p>如IE5.5的话Browser.IE则取得5.5，FF2的话取Browser.Firefox为2。</p>
 * <p>如果为undefinded则不是该类型浏览器。</p>
 * 
 * <b>分析依据：</b>
 * <dl>
 * <dt>Chrome 3.0:</dt>
 * <dd>Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/532.0 (KHTML, like Gecko) Chrome/3.0.195.27 Safari/532.0</dd>
 * 
 * <dt>Firefox 3.5:</dt>
 * <dd>Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.1.3) Gecko/20090824 Firefox/3.5.3</dd>
 * 
 * <dt>IE 6:</dt>
 * <dd>Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)</dd>
 * 
 * <dt>Safari 3.0:</dt>
 * <dd>Mozilla/5.0 (Windows; U; Windows NT 5.1; zh) AppleWebKit/522.15.5 (KHTML, like Gecko) Version/3.0.3 Safari/522.15.5</dd>
 * 
 * <dt>Opera 9.2:</dt>
 * <dd>Opera/9.2·2 (Windows NT 5.1; U; en)</dd>
 * </dl>
 * 
 * @static
 * @singleton
 */



/**
 * 如果是IE浏览器，IE的版本号，否则为undefined
 * @type {Number}
 * @property IE
 */

/**
 * 如果是Firefox浏览器，Firefox的版本号，否则为undefined
 * @type {Number}
 * @property Firefox
 */

/**
 * 如果是Chrome浏览器，Chrome的版本号，否则为undefined
 * @type {Number}
 * @property Chrome
 */

/**
 * 如果是Safari浏览器，Safari的版本号，否则为undefined
 * @type {Number}
 * @property Safari
 */

/**
 * 如果是Opera浏览器，Opera的版本号，否则为undefined
 * @type {Number}
 * @property Opera
 */
js.client.Browser = js.client.Browser || (function (identifier) {
	var type = identifier.split('|');
	var browser = {};
//	for (var i = type.length - 1; i >= 0; i--) {
//		browser[type[i]] = 0;
//	}
	var version = navigator.userAgent.match(new RegExp('(' + identifier + ')[ \\/](\\d+(\\.\\d+)?)'));
	if (version && version.length) {
		browser[version[1]] = parseFloat(version[2]);
	}
	//适应Safari
	if (version[1] == type[3]) {
		browser[version[1]] = parseFloat(navigator.userAgent.match(/Version\/(\d+(\.\d+)?)/)[1]);
	}
	return browser;
})('IE|Firefox|Chrome|Safari|Opera');