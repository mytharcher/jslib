/*
 * jslib JavaScript Library
 * 
 * create:
 * @2011-09-21 by mytharcher
 * 
 * update:
 */

///import js.client.Features.~arrayForEach;
///import js.client.Features.~arrayIndexOf;
///import js.util;

/**
 * @class js.util.Processor
 * 执行器类
 * @singleton
 */
js.util.Processor = {
	/**
	 * 按队列顺序执行
	 * @method js.util.Processor.queue
	 * @static
	 * 
	 * @param {Function} fn 要调用的函数操作
	 * @param {Object} scope (optional)需要指定的作用域
	 * @param {Any...} argument (optional)调用时需要传入的参数
	 * 
	 * @return {Function} 返回原函数，以供继续调用
	 */
	queue: (function () {
		var queue = [], running = false;
		
		function process () {
			while(queue.length) {
				var cur = queue.shift();
				cur.fn.apply(cur.scope || null, cur.args);
			}
			running = false;
		}
		
		return function (fn, scope) {
			queue.push({
				fn: fn,
				scope: scope,
				args: [].slice.call(arguments, 2)
			});
			
			if (!running) {
				running = true;
				setTimeout(process, 0);
			}
			
			return arguments.callee;
		};
	})(),
	
	/**
	 * 异步串行队列
	 * 
	 * @example <pre><code>
var data = 0;
function fn1(next){
	ajax(options, function () {data += 100; next();});
}
function fn2(next){
	data *= 2;
	setTimeout(next, 2000);
}
function callback(){
	console.log(data); // 200
}
js.util.Processor.asyncQueue(fn1, fn2, callback);

asyncQueue(fn1, fn2, fn3);
</code></pre>
	 */
	asyncQueue: (function () {
		var group = [];

		function run() {
			for (var i = group.length - 1; i >= 0; i--) {
				process(group[i], i, group);
			}
		}

		function process(queue, index, group) {
			if (!queue.running) {
				if (queue.items.length) {
					queue.running = true;

					queue.items.shift().fn();
				} else {
					group.splice(index, 1);

					queue.running = false;
				}
			}
		}

		return function () {
			var fns = [].slice.call(arguments);
			var queue = {
				running: false
			};

			function next () {
				queue.running = false;
				run();
			}

			queue.items = fns.map(function (item, index, array) {
				return {
					fn: item,
					next: next
				};
			});

			group.unshift(queue);

			run();
		};
	})(),
	
	/**
	 * 并行处理组
	 * @method js.util.Processor.parallel
	 * @static
	 * 
	 * @return {Function} 返回原函数，以供继续调用
	 * 
	 * @example <pre><code>
function fn1(done){
	ajax(options, function () {done();});
}
function fn2(done){
	setTimeout(done, 2000);
}
function callback(){
	console.log('All done!');
}
js.util.Processor.parallel(fn1, fn2, callback);
</code></pre>
	 */
	parallel: (function () {
		var queue = [];
		
		function start() {
			queue.forEach(process);
		}
		
		function process (item, index) {
			if (!item.running) {
				item.running = true;
				for (var i = 0, len = item.fn.length; i < len; i++) {
					item.fn[i](function () {
						item.count++;
						callback(item);
					});
				}
			}
		}
		
		function callback (group) {
			if (group.fn.length == group.count) {
				queue.splice(queue.indexOf(group), 1);
				group.callback();
			}
		}
		
		return function () {
			var fns = [].slice.call(arguments, 0);
			var cb = fns.pop();
			queue.push({
				fn: fns,
				callback: cb,
				conut: 0
			});
			
			start();
			
			return arguments.callee;
		}
	})(),
	
	mix: function (map, callback) {
		
	}
};

/*
 * use:
 * 
 * function f1() {
 * 	console.log(1);
 * }
 * function f2() {
 * 	console.log(2);
 * }
 * 
 * js.util.Processor.queue(f1);
 * js.util.Processor.queue(f2);
 * //...time out
 * //1
 * //2
 * 
 * js.util.Processor.parallel(f1, f2, ... fn, callback);
 * 
 */