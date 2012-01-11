if (js.dom.Stage) {

	module('js.dom.Stage');
	
	asyncTest('js.dom.Stage.ready(fn)', function(){
		equals(js.dom.Stage.ready(new Function()), js.dom.Stage.ready, 'Return the js.dom.Stage.ready for chain more.');
		
		// stop();
		var xx = 0;
		js.dom.Stage.ready(function(){
			xx = 100;
		});
		js.dom.Stage.ready(function(){
			start();
			equals(xx, 100, 'When a Function passed in, it will be invoked when document is ready.');
		});
	});
	
	asyncTest('js.dom.Stage.ready(fn1)(fn2)', function(){
		// stop();
		
		js.dom.Stage.ready(function(){
			document.getElementById('container').innerHTML = '<p>test text</p>';
		})(function(){
			start();
			equals(document.getElementById('container').firstChild.innerHTML, 'test text', 'When chaining method invoked, before will be ready when after is about to run.');
		});
	});
	
	test('js.dom.Stage.get()', function(){
		var frag = document.createDocumentFragment();
		frag.appendChild(document.createElement('span'));
		equal(js.dom.Stage.get(frag), frag, 'If pass a DocumentFragment param into get(), it will return the fragment.');
	});
	
	test('js.dom.Stage.getNextHighestDepth()', function(){
		equals(js.dom.Stage.getNextHighestDepth(), 101, 'If this method has not been invoked, get the depth form max of all document elements and plus 1.');
		
		equals(js.dom.Stage.getNextHighestDepth(), 102, 'Else, get the depth form recorded depth and plus 1.');
		
		document.getElementById('depth').style.zIndex = 1000;
		
		equals(js.dom.Stage.getNextHighestDepth(), 103, 'When some element\'s depth has been changed higher, get the depth form recorded depth and plus 1.');
		
		equals(js.dom.Stage.getNextHighestDepth(true), 1001, 'When force update argument passed in, get the depth form max of all document elements and plus 1.');
	});
	js.dom.Drag.attach('Test_js-dom-Tween', {
		restrict: [0, 100, 500, 500]
	});
}