if (js.dom.Traversal) {

	function setKey(key){
		return function(node, index){
			if (node.nodeType == 1) {
				var value = parseInt(node.getAttribute(key)) || 0;
				node.setAttribute(key, value + 1);
			}
		};
	}
	
	function removeKey(key){
		return function(node, index){
			if (node.nodeType == 1) {
				node.removeAttribute(key);
			}
		}
	}
	
	module('js.dom.Traversal');
	
	test('js.dom.Traversal.up()', function(){
		var Stage = js.dom.Stage,
			key = js.util.Global.guid('traversal-up'),
			count = js.dom.Traversal.up('Test_js-dom-Traversal-up', setKey(key)),
			node = Stage.get('Test_js-dom-Traversal-up'),
			topNode = document.documentElement;
		for (var i = 0; node && node != topNode; node = node.parentNode) {
			i++;
			equals(node.getAttribute(key), '1', 'Every node on the traversal road should be visited once and only once. current: ' + Stage.mark(node));
		}
		
		equals(count, i, 'The number of visited nodes should be same.');
		
		count = js.dom.Traversal.up('Test_js-dom-Traversal-up', removeKey(key));
		for (i = 0, node = Stage.get('Test_js-dom-Traversal-up'); node && node != topNode; node = node.parentNode) {
			i++;
		}
		equals(count, i, 'When the top node is not specified, the number of visited node should be same, too.');
	});
	
	test('js.dom.Traversal.bfs()', function(){
		var Stage = js.dom.Stage,
			key = js.util.Global.guid('traversal-bfs'),
			count = js.dom.Traversal.bfs('Test_js-dom-Traversal-tree', setKey(key)),
			nodeSet = Stage.get('Test_js-dom-Traversal-tree').getElementsByTagName('*');
		
		for (var i = 0, len = nodeSet.length; i < len; i++) {
			var node = nodeSet[i];
			equals(node.getAttribute(key), '1', 'Every node on the traversal road should be visited once and only once. current: ' + Stage.mark(node));
		}
		
		equals(count, nodeSet.length + 1, 'The number of visited nodes should be the number of the element node the tree has, including the top node.');
		
		js.dom.Traversal.bfs('Test_js-dom-Traversal-tree', removeKey(key));
	});
	
	test('js.dom.Traversal.dfs()', function(){
		var Stage = js.dom.Stage,
		key = js.util.Global.guid('traversal-dfs'),
		count = js.dom.Traversal.dfs('Test_js-dom-Traversal-tree', setKey(key)),
		nodeSet = Stage.get('Test_js-dom-Traversal-tree').getElementsByTagName('*');
		
		for (var i = nodeSet.length - 1; i >= 0; i--) {
			var node = nodeSet[i];
			equals(node.getAttribute(key), '1', 'Every node on the traversal road should be visited once and only once. current: ' + Stage.mark(node));
		}
		
		equals(count, nodeSet.length + 1, 'The number of visited nodes should be the number of the element node the tree has, including the top node.');
		
	});
	
	//性能测试
	test('Search arithmetic performance', function(){
		var timer,
		times = 100,
		key = js.util.Global.guid('traversal-dfs'),
		fn = setKey(key),
		nodeSet = js.dom.Stage.get('Test_js-dom-Traversal-tree').getElementsByTagName('*');
		
		//广度优先遍历（递归）
		timer = new Date();
		for (var i = times; i > 0; i--) {
			js.dom.Traversal.bfs('Test_js-dom-Traversal-tree', fn);
		}
		var bfsTime = new Date() - timer;
		
		//深度优先遍历（原生获取顺序循环）
		timer = new Date();
		for (var i = times; i > 0; i--) {
			js.dom.Traversal.dfs('Test_js-dom-Traversal-tree', fn);
		}
		var dfsTime = new Date() - timer;
		
		/*
		 //深度优先遍历（非递归）
		 timer = new Date();
		 for (var i = times; i > 0; i--) {
		 js.dom.Traversal.dfsAll('Test_js-dom-Traversal-tree', fn);
		 }
		 var dfsAllTime = new Date() - timer;
		 */
		//原生获取顺序遍历
		timer = new Date();
		for (var j = times; j > 0; j--) {
			var node = js.dom.Stage.get('Test_js-dom-Traversal-tree'), children, count = 0, thisp;
			if (fn.call(thisp, node, count++) !== false) {
				children = node.getElementsByTagName('*');
				for (var i = 0, len = children.length; i < len; i++) {
					if (fn.call(thisp, node, count++) === false) {
						break;
					}
				}
			}
		}
		var cTime = new Date() - timer;
		
		ok(1, ['bfsTime:' + bfsTime, 'dfsTime:' + dfsTime/*, dfsAllTime*/, 'cTime:' + cTime]);
	});
	
}