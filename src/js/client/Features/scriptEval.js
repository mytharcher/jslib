/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-12-27 by mytharcher
 * 
 * update:
 */

///import js.util.Global.guid;
///import js.client.Features;

/**
 * 是否可以使用全局执行脚本
 * @property js.client.Features.scriptEval
 * @type {Boolean}
 */
js.client.Features.scriptEval = (function () {
	var script = document.createElement('script'),
		scriptEval = false,
		id = js.util.Global.guid('_');
	script.type = "text/javascript";
	try {
		script.appendChild(document.createTextNode("window." + id + "=1;"));
	} catch(e) {}
	document.body.appendChild(script);
	if (window[id]) {
		scriptEval = true;
		delete window[id];
	}
	document.body.removeChild(script);
	script = null;
	return scriptEval;
})();