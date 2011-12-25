if (js.text.Template) {

	module('js.text.Template');
	
	test('js.text.Template.compile()', function(){
		var Template = js.text.Template, tpl = 'start #{a} end', compiledTpl = Template.compile(tpl), compiledResult = js.text.Template.format(compiledTpl, {
			a: '"replaced in center"'
		});
		equals(typeof compiledTpl, 'function', 'When compile a template string within a new line character, it could be compiled to a function.');
		equals(compiledResult, 'start "replaced in center" end', 'When use a compiled template function to format, it should get the expected result.');
	});
	
	test('js.text.Template.cache()', function(){
		var Template = js.text.Template, tpl = 'start #{a} end', cachedTpl = Template.cache(tpl);
		equals(cachedTpl, Template.compiled[tpl], 'When cache a string template, it should be compiled to a function and save in Template.compiled object with the key by the tpl.');
	});
	
	test('js.text.Template.format()', function(){
		var numTpl = '#{0},#{1}', alphaTpl = '#{a}{abc}#{b}';
		equals(js.text.Template.format(numTpl, 'abc'), 'abc,', 'When format method\'s arguments use array form, and there has a hole with no value passed in, the hole should be format to nothing as "".');
		equals(js.text.Template.format(numTpl, 'abc', null), 'abc,', 'When format use a null value, the key should be format to nothing as "".');
		equals(js.text.Template.format(numTpl, 'abc', undefined), 'abc,', 'When format use a undefined value, the key should be format to nothing as "".');
		
		equals(js.text.Template.format(numTpl, {
			'0': 'abc',
			'1': 'def'
		}), 'abc,def', 'Use object arguments can successfully format a template string.');
		equals(js.text.Template.format(alphaTpl, {
			a: '1',
			b: 2
		}), '1{abc}2', 'Use object arguments can successfully format a template string.');
		
		equals(js.text.Template.format(numTpl, [1, 2]), '1,2', 'Use array arguments should be same as object arguments, every part specified by the data key.');
	});
}