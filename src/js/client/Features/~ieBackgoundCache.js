/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-02-27 by mytharcher
 * 
 * update:
 * @2010-12-27 by mytharcher
 * 		[m] Simplify the code.
 */

///import js.client.Browser;

/**
 * @ignore
 * 解决IE背景图片缓存问题，a:hover的background多次加载
 */
if (js.client.Browser.IE && js.client.Browser.IE <= 6) {
	try {
		document.execCommand("BackgroundImageCache", false, true);
	} catch (ex) {}
}