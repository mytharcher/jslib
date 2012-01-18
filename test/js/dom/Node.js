if (js.dom.Node) {

	module('js.dom.Node');
	
	test('js.dom.Node()', function(){
		var doc = js.dom.Node(document);
		equals(doc[0], document, 'Use js.dom.Node(document), it will create a node instance containing only document object.');
		
		var win = js.dom.Node(window);
		equals(win[0], window, 'Use js.dom.Node(window), it will create a node instance containing only window object.');
		
		var test = js.dom.Node('#Test');
		equals(test[0], document.getElementById('Test'), 'Use #id to create a node instance should contain the only element by id.');
	});
	
	if (js.dom.INodeAttribute) {
		test('node.setAttribute()', function () {
			
		});
		
		test('node.getAttribute()', function () {
			
		});
		
		test('node.attr()', function () {
			
		});
	}
	
	if (js.dom.INodeBoxModel) {
		test('node.getPosition()', function () {
			
		});
		
		test('node.isDisplaying()', function () {
			
		});
	}
	
	if (js.dom.INodeClassName) {
		test('node.addClass()', function () {
			
		});
		
		test('node.removeClass()', function () {
			
		});
		
		test('node.toggleClass()', function () {
			
		});
		
		test('node.hasClass()', function () {
			
		});
	}
	
	if (js.dom.INodeEvent) {
		test('node.addEventListener()', function () {
			
		});
		
		test('node.removeEventListener()', function () {
			
		});
		
		test('node.on()', function () {
			
		});
		
		test('node.un()', function () {
			
		});
	}
	
	if (js.dom.INodeOperation) {
		test('node.after()', function () {
			
		});
		
		test('node.append()', function () {
			
		});
		
		test('node.appendTo()', function () {
			
		});
		
		test('node.insert()', function () {
			
		});
		
		test('node.insertTo()', function () {
			
		});
		
		test('node.remove()', function () {
			
		});
		
		test('node.empty()', function () {
			
		});
		
		test('node.html()', function () {
			
		});
		
		test('node.text()', function () {
			
		});
	}
	
	if (js.dom.INodeRalation) {
		test('node.indexOfSiblings()', function () {
			
		});
		
		test('node.next()', function () {
			
		});
		
		test('node.nextAll()', function () {
			
		});
		
		test('node.prev()', function () {
			
		});
		
		test('node.prevAll()', function () {
			
		});
		
		test('node.parent()', function () {
			
		});
		
		test('node.ancestors()', function () {
			
		});
		
		test('node.firstChild()', function () {
			
		});
		
		test('node.lastChild()', function () {
			
		});
		
		test('node.children()', function () {
			
		});
		
		test('node.siblings()', function () {
			
		});
		
		test('node.contains()', function () {
			
		});
	}
	
	if (js.dom.INodeStyle) {
		test('node.getStyle()', function () {
			
		});
		
		test('node.setStyle()', function () {
			
		});
		
		test('node.css()', function () {
			var absPosNode = js.dom.Node('#Test_js-dom-Tween');
			equals(absPosNode.css('position'), 'absolute', 'When use css(key) can get current style value by the specified key.');
		});
	}
}