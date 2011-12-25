if (js.dom.ClassName) {

	module('js.dom.ClassName');
	
	test('js.dom.ClassName.add()', function(){
		js.dom.ClassName.add("test-js-dom-classname-1", "cls");
		equals(js.dom.Stage.get('test-js-dom-classname-1').className, 'cls', 'When js.dom.Class.add() method invoked, the element\'s className attribute should contains the added classname.');
		
		js.dom.ClassName.add('test-js-dom-classname-1', 'cls');
		equals(js.dom.Stage.get('test-js-dom-classname-1').className, 'cls', 'When add a exist class name, it should be still one.');
		
		js.dom.ClassName.add('test-js-dom-classname-1', 'abc cls def');
		equals(js.dom.Stage.get('test-js-dom-classname-1').className, 'cls abc def', 'When add a group of class name, it should be done.');
		
		js.dom.ClassName.add('test-js-dom-classname-1', ['ghi', 'jkl']);
		equals(js.dom.Stage.get('test-js-dom-classname-1').className, 'cls abc def ghi jkl', 'When add a group of class name by an array, it should be done.');
		
		js.dom.ClassName.add('test-js-dom-classname-1', 'abc-def');
		equals(js.dom.Stage.get('test-js-dom-classname-1').className.match(/\babc\-def\b/)[0], 'abc-def', 'When add a class name contains a "-", it should be done.');
	});
	
	test('js.dom.ClassName.remove()', function(){
		js.dom.ClassName.add('test-js-dom-classname-2', 'cls');
		js.dom.ClassName.remove('test-js-dom-classname-2', 'cls');
		equals(js.dom.Stage.get('test-js-dom-classname-2').className, '', 'When js.dom.Class.remove() method invoked, the element\'s className attribute should not contains the removed classname.');
		
		js.dom.ClassName.add('test-js-dom-classname-2', ['abc', 'ghi', 'jkl']);
		js.dom.ClassName.remove('test-js-dom-classname-2', ['ghi', 'jkl']);
		equals(js.dom.Stage.get('test-js-dom-classname-2').className, 'abc', 'When remove a group of classname by passing an array, the remain classname should be right.');
	});
	
	test('js.dom.ClassName.has()', function(){
		ok(js.dom.ClassName.has('test-js-dom-classname-2', 'abc'), 'Use method "has" to judge if a classname on an element, it can return true if the classname exist.');
		ok(!js.dom.ClassName.has('test-js-dom-classname-2', 'def'), 'Use method "has" to judge if a classname on an element, it can return false if the classname is not exist.');
		
		js.dom.ClassName.add('test-js-dom-classname-2', 'def');
		ok(js.dom.ClassName.has('test-js-dom-classname-2', ['abc', 'def']), 'When judge a group of classname, return true if all the classname in the group are on the element.');
		ok(js.dom.ClassName.has('test-js-dom-classname-2', 'abc def'), 'When judge a group of classname, return true if all the classname in the group are on the element.');
		ok(!js.dom.ClassName.has('test-js-dom-classname-2', ['abc def']), '["abc def"] is not means ["abc", "def"], just means a classname "abc def".');
		ok(!js.dom.ClassName.has('test-js-dom-classname-2', ['abc', 'ghi']), 'When judge a group of classname, return false if any one of the classname in the group are not on the element.');
		ok(!js.dom.ClassName.has('test-js-dom-classname-2', 'abc ghi'), 'When judge a group of classname, return false if any one of the classname in the group are not on the element.');
	});
	
	test('js.dom.ClassName.toggle()', function(){
		js.dom.ClassName.toggle('test-js-dom-classname-3', 'abc');
		equals(js.dom.Stage.get('test-js-dom-classname-3').className, 'abc', 'When an element has not a classname, use method "toggle" can add it.');
		
		js.dom.ClassName.toggle('test-js-dom-classname-3', 'abc');
		equals(js.dom.Stage.get('test-js-dom-classname-3').className, '', 'When an element has a classname, use method "toggle" can remove it.');
		
		js.dom.ClassName.toggle('test-js-dom-classname-3', 'abc', false);
		equals(js.dom.Stage.get('test-js-dom-classname-3').className, '', 'When toggle a classname not exist, and specified the switch to false, it should remove the classname and be same.');
		
		js.dom.ClassName.toggle('test-js-dom-classname-3', ['abc', 'def']);
		equals(js.dom.Stage.get('test-js-dom-classname-3').className, 'abc def', 'When toggle a group of classname, it performs the same each one as single.');
		
		js.dom.ClassName.toggle('test-js-dom-classname-3', ['abc'], true);
		equals(js.dom.Stage.get('test-js-dom-classname-3').className, 'abc def', 'When toggle a classname exist, and specified the switch to ture, it should add the classname and be same.');
		
		js.dom.ClassName.toggle('test-js-dom-classname-3', 'abc', false);
		equals(js.dom.Stage.get('test-js-dom-classname-3').className, 'def', 'When toggle a classname exist, and specified the switch to false, it should remove the classname.');
		
		js.dom.ClassName.toggle('test-js-dom-classname-3', ['abc', 'def']);
		equals(js.dom.Stage.get('test-js-dom-classname-3').className, 'abc', 'When toggle a group of classname, the exist ones should be removed, and the non-existed ones should be added.');
		
		js.dom.ClassName.toggle('test-js-dom-classname-3', 'abc def');
		equals(js.dom.Stage.get('test-js-dom-classname-3').className, 'def', 'When toggle a group of classname, the exist ones should be removed, and the non-existed ones should be added.');
	});
	
}