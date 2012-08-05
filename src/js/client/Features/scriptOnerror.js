/*
 * jslib JavaScript Library
 * 
 * create:
 * @2012-08-04 by mytharcher
 * 
 * update:
 */

///import js.client.Features;

/**
 * script标签是否支持onload回调
 * @property js.client.Features.scriptOnerror
 * @type {Boolean}
 */
js.client.Features.scriptOnerror = (function () {
	var script = document.createElement('script');
	return 'onerror' in script;
})();