/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-2-13 by mytharcher
 * 
 * update:
 */

///import js.client.Browser;
///import js.client.Features.scriptOnload;
///import js.client.Features.scriptOnerror;
///import js.net.URL;
///import js.dom.Stage;

/**
 * @class js.dom.Stage
 */

/**
 * 加载脚本
 * @method js.dom.Stage.loadScript
 * @static
 * 
 * @param {String} url 脚本的URL地址
 * @param {Object} option 其他选项：noCache，是否缓存，默认false；onload，加载完成的回调函数；
 */
js.dom.Stage.loadScript = function (url, option) {
	var opt = option || {};
	var u = new js.net.URL(url);
	if (opt.noCache) {
		u.setParameter(Date.now(), Math.random());
	}
	var pos = document.getElementsByTagName('script')[0];
	var script = document.createElement('script');
	
	if (js.client.Features.scriptOnload) {
		script.onload = opt.onload;
	} else if (js.client.Browser.IE) {
		script.onreadystatechange = function (ev) {
			if (this.readyState == 'loaded') {
				opt.onload && opt.onload(this);
				this.onreadystatechange = this.onload = this.onerror = null;
			}
		};
	}
	
	if (js.client.Features.scriptOnerror) {
		script.onerror = opt.onerror || null;
	}
	
	script.src = u.toString();
	pos.parentNode.insertBefore(script, pos);
	
	script = pos = null;
};

///import js.net.URL;
///import js.client.Features.~dateNow;