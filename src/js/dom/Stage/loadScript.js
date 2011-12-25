/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-2-13 by mytharcher
 * 
 * update:
 */

///import js.client.Browser;
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
 * @param {Object} option 其他选项：noCache，是否缓存，默认false；onLoad，加载完成的回调函数；
 */
js.dom.Stage.loadScript = function (url, option) {
	var url = new js.net.URL(url);
	if (option.noCache) {
		url.setParameter(Date.now(), Math.random());
	}
	var script = document.createElement('script');
	script.type = 'text/javascript';
	
	script[js.client.Browser.IE ? 'onreadystatechange' : 'onload'] = function (ev) {
		if (js.client.Browser.IE && this.readyState == 'loaded' || !js.client.Browser.IE) {
			option.onLoad && option.onLoad(this);
			this.onreadystatechange = this.onload = null;
		}
	}
	
	document.body.appendChild(script);
	script.src = url.toString();
	
	script = null;
};

///import js.net.URL;
///import js.client.Features.~dateNow;