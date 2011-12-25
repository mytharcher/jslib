/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-04-12 by mytharcher
 * 
 * update:
 * @2011-09-22 by mytharcher
 * 		[m] Change API, and will not support absolute order queue any more.
 */

///import js.util.Processor;
///import js.client.Browser;
///import js.dom.Stage;

/**
 * @class js.dom.Stage
 */

/**
 * DOM加载完毕后的执行队列
 * @method js.dom.Stage.ready
 * @static
 * 
 * for use: <pre><code>js.dom.Stage.ready(f1)(f2, scope)(f3, scope, args)</code></pre> ...
 * 
 * @param {Function...} callback 可传入多个要执行的操作函数
 * 
 * @return {Function} js.dom.Stage.ready 返回供链式调用的当前函数
 */
js.dom.Stage.ready = (function(){
	var isReady = false, queue = [], running = false;
	
	function ready(){
		isReady = true;
		start();
	}
	
	function start () {
		while (queue.length) {
			js.util.Processor.queue.apply(null, queue.shift());
		}
	}
	
	function bindReady(){
		var doc = document, w = window, opera = js.client.Browser.Opera;
		
		// Mozilla, Opera (see further below for it) and webkit nightlies currently support this event
		if (doc.addEventListener && !opera) {
			// Use the handy event callback
			doc.addEventListener("DOMContentLoaded", opera ? function(){
				if (isReady) {
					return;
				}
				for (var i = 0; i < doc.styleSheets.length; i++) {
					if (doc.styleSheets[i].disabled) {
						setTimeout(arguments.callee, 0);
						return;
					}
				}
				// and execute any waiting functions
				ready();
			} : ready, false);
		} else if (js.client.Browser.IE && w == top) {
			// If IE is used and is not in a frame
			// Continually check to see if the doc is ready
			(function(){
				if (isReady) {
					return;
				}
				
				try {
					// If IE is used, use the trick by Diego Perini
					// http://javascript.nwbox.com/IEContentLoaded/
					doc.documentElement.doScroll("left");
				} catch (error) {
					setTimeout(arguments.callee, 10);
					return;
				}
				// and execute any waiting functions
				ready();
			})();
		} else if (js.client.Browser.Safari) {
			var numStyles;
			(function(){
				if (isReady) {
					return;
				}
				if (doc.readyState != "loaded" && doc.readyState != "complete") {
					setTimeout(arguments.callee, 0);
					return;
				}
				if (typeof numStyles == 'undefined') {
					numStyles = 0;
					var s1 = doc.getElementsByTagName('style');
					var s2 = doc.getElementsByTagName('link');
					if (s1) {
						numStyles += s1.length;
					}
					if (s2) {
						for (var i = 0, j = s2.length; i < j; i++) {
							if (s2[i].getAttribute("rel") == "stylesheet") {
								numStyles++;
							}
						}
					}
				}
				// numStyles = jQuery("style, link[rel=stylesheet]").length;
				if (doc.styleSheets.length != numStyles) {
					setTimeout(arguments.callee, 0);
					return;
				}
				// and execute any waiting functions
				ready();
			})();
		}
		
		// A fallback to window.onload, that will always work
		w.attachEvent ? w.attachEvent("onload", ready) : w.addEventListener("load", ready, false);
	}
	
	bindReady();
	
	return function(){
		var args = [].slice.call(arguments);
		queue.push(args);
		isReady && start();
		return arguments.callee;
	};
})();