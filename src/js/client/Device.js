/*
 * jslib JavaScript Library
 * 
 * create:
 * @2010-04-21 By mytharcher
 * 
 * version: 0.5.0
 */

///import js.client;

/*
 * 分析依据
 
Mozilla/5.0 (Linux; Android 4.4.2; sdk Build/KK) AppleWebkit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36

Mozilla/5.0 (iPhone; CPU iPhone OS 6_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B141 (157592032)

 */
js.client.Device = (function (identifier) {
	var matcher = navigator.userAgent.match(new RegExp(identifier));
	return matcher ? matcher[0] : null;
})('Android|iPhone|iPad');
