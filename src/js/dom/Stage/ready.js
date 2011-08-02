/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-04-12 by mytharcher
 * 
 * update:
 */

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
 * @description 顺带实现了同步执行的函数队列
 * 
 * for use: <pre><code>js.dom.Stage.ready(fn1, fn2)(fn3, fn4)(fn5, fn6)</code></pre> ...
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
		if (!running) {
			if (queue.length) {
				running = true;
				setTimeout(run, 0);
			}
		}
	}
	
	function run () {
		var fn = queue.shift();
		while (fn.length) {
			fn.shift()();
		}
		running = false;
		start();
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