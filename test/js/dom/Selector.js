if (js.dom.Selector) {

	module('js.dom.Selector');
	
	test('js.dom.Selector.queryAll()', function(){
		var unexistId = js.dom.Selector.queryAll('#GRAEGREERQ');
		equal(unexistId.toString(), '', 'If query a selector which the cannot find, the result should be empty array.');
		
		var underEmptyScope = js.dom.Selector.queryAll('div#Test_js-dom', []);
		equal(underEmptyScope[0], document.getElementById('Test_js-dom'), 'When empty scope array passed in, it should be as document.');

		var classInMultiClass = js.dom.Selector.queryAll('.url');
		equal(classInMultiClass[0], document.getElementById('Test-js_dom_Selector-multi-class'), 'When select a multi class node by single class, it can be get.');
	});

	test('js.dom.Selector.match()', function () {
		
	});
}