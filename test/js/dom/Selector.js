if (js.dom.Selector) {

	module('js.dom.Selector');
	
	test('js.dom.Selector.queryAll()', function(){
		var unexistId = js.dom.Selector.queryAll('#GRAEGREERQ');
		equal(unexistId.toString(), '', 'If query a selector which the cannot find, the result should be empty array.');
	});
}