/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-11-30 by mytharcher
 * 
 * update:
 */

///import js.util.Class;
///import js.net;

/**
 * @class js.net.URLParameter URL参数串处理类
 * @extends js.util.Hash
 */
js.net.Path = js.util.Class.create({
	constructor: function (path) {
		this._path = path;
	},
	
	forward: function (path) {
		var matcher;
		while(matcher = path.match(/^\.\.\//)) {
			
		}
	}
});