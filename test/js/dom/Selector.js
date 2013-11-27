if (js.dom.Selector) {

	module('js.dom.Selector');
	
	test('js.dom.Selector.queryAll()', function(){
		var unexistId = js.dom.Selector.queryAll('#GRAEGREERQ');
		equal(unexistId.toString(), '', 'If query a selector which the cannot find, the result should be empty array.');
		
		var underEmptyScope = js.dom.Selector.queryAll('div#Test_js-dom', []);
		equal(underEmptyScope[0], document.getElementById('Test_js-dom'), 'When empty scope array passed in, it should be as document.');
	});

	test('js.dom.Selector.match()', function () {
		
	});
}