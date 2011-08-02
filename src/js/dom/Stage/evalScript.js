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
 * 在全局作用域执行js代码
 * @method js.util.Global.evalScript
 * @static
 * 
 * from jQuery-1.4.4 globalEval
 * 
 * @param {String} data
 */
js.dom.Stage.evalScript = function( data ) {
	if ( data && /\S/.test(data) ) {
		// Inspired by code by Andrea Giammarchi
		// http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
		var head = document.getElementsByTagName("head")[0] || document.documentElement,
			script = document.createElement("script");

		script.type = "text/javascript";
		
		if ( js.client.Features.scriptEval ) {
			script.appendChild( document.createTextNode( data ) );
		} else {
			script.text = data;
		}

		// Use insertBefore instead of appendChild to circumvent an IE6 bug.
		// This arises when a base node is used (#2709).
		head.insertBefore( script, head.firstChild );
		head.removeChild( script );
		script = null;
		head = null;
	}
};

///import js.client.Features.scriptEval;