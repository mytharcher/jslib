if (js.net.URLParameter) {

	module('js.net.URLParameter');
	
	test('js.net.URLParameter.parseJSON()', function(){
		var UP = js.net.URLParameter;
		
		var p1 = UP.parseJSON('');
		equals(Object.keys(p1).length, 0, 'When parse an empty string, the object returned should contain nothing.');
		
		var p2 = UP.parseJSON('abc');
		equals(Object.keys(p2).length, 0, 'When parse an illegal parameter string, the object returned should contain nothing.');
		
		var p3 = UP.parseJSON('=abc');
		equals(Object.keys(p3).length, 0, 'When parse an illegal parameter string, the object returned should contain nothing.');
		
//		var p4 = UP.parseJSON('^$#@=abc');
//		equals(Object.keys(p4).length, 0, 'When parse an illegal parameter string, the object returned should contain nothing.');
		
		var p5a = UP.parseJSON('abc=');
		equals(p5a.abc[0], '', 'When parse a parameter without value, the value should be empty.');
		
		var p5b = UP.parseJSON('abc[]=def');
		equals(p5b['abc[]'][0], 'def', 'When a parameter\'s name contains "[]"(for php array use), it can be parsed successfully.');
		
//		var p5c = UP.parseJSON('.a=dd');
//		equals(Object.keys(p5c).length, 0, 'When a parameter\'s name starts with a ".", it cannot be parsed.');
		
//		var p5d = UP.parseJSON('a.a=dd');
//		equals(p5d['a.a'][0], 'dd', 'When a parameter\'s name is neither starts with nor end with a ".", it can be parsed successfully.');
		
//		var p5e = UP.parseJSON('a.=dd');
//		equals(Object.keys(p5e).length, 0, 'When a parameter\'s name is end with a ".", it cannot be parsed.');
		
		var p6 = UP.parseJSON('?abc=1');
		equals(p6.abc[0], '1', 'When parse a string start with a "?", it can be parsed successfully.');
		
		var p7 = UP.parseJSON('&abc=1');
		equals(p7.abc[0], '1', 'When parse a string start with a "&", it can be parsed successfully.');
		
		var p8 = UP.parseJSON('abc=1&abc=2');
		equals(p8.abc.length, 2, 'When parse a string contains same key, the value would be as many as the key occurs.');
		
		var p9 = UP.parseJSON('abc=1&def=2');
		equals(p9.def[0], '2', 'When parse a string, each value should be parsed.');
	});
	
	test('js.net.URLParameter()', function(){
		var UP = js.net.URLParameter;
		
		var p1 = new UP('&&&def=def&&');
		equals(p1.get('def'), 'def');
		
		var p2 = new UP({a:1, b:[2, 3]});
		equals(p2.get('a'), '1');
		equals(p2.get('b').join(), '2,3');
		
		var p3 = new UP({});
		equals(Object.keys(p3.get()).length, 0);
		
		p3.set({a: 1});
		equals(p3.get('a'), 1);
		
		p3.set('b', 2);
		equals(p3.get('b'), 2);
		
		p3.set('c=3');
		equals(p3.get('c'), 3);
		
		p3.set('c=4');
		equals(p3.get('c'), 4);
		
		p3.set('c', null);
		equals(p3.get('c'), null);
		
		p3.set('c=null');
		equals(p3.get('c'), 'null');
		
		p3.set('b=5&b=6');
		equals(p3.get('b').join(), '5,6');
		
		p3.set({b: [7, 8]});
		equals(p3.get('b').join(), '7,8');
		
		p3.setValue('b', 1);
		equals(p3.get('b'), 1);
		
		p3.setValue('b', [2, 3]);
		equals(p3.get('b'), '2,3');
		
		p3.setValue('b', 1);
		equals(p3.get('b'), 1);
		
		p3.addValue('b', 4);
		equals(p3.get('b').length, 2);
		equals(p3.get('b').join(), '1,4');
		
		p3.addValue('b', [5, 6]);
		equals(p3.get('b').join(), '1,4,5,6');
		
		p3.addValue('b', 5);
		equals(p3.get('b').join(), '1,4,5,6');
		
		p3.addValue('b', null);
		equals(p3.get('b').join(), '1,4,5,6', 'Null value cannot be added.');
		
		p3.remove('b', '5');
		equals(p3.get('b').join(), '1,4,6', 'Remove a value from a key, others should remain.');
		
		p3.remove('b', [1, 6]);
		equals(p3.get('b'), 4, 'Remove a group of values can success.');
		
		p3.remove('b');
		equals(p3.get('b'), null, 'When a key was totally removed, it cannot be get again.');
		
		var p4 = new UP('可以=中文');
		equals(p4.get('可以'), '中文');
	});
}