if (js.text.WordString) {

	module('js.text.WordString');
	
	test('js.text.WordString()', function(){
		var wStr = new js.text.WordString();
		equals(wStr.constructor, js.text.WordString, 'The constructor and the class function should be same.');
		
		equals(wStr.toString(), '', 'A just created instance should contain no words, and when toString() method invoked, it returns "".');
	});
	
	test('js.text.WordString.prototype.add()', function(){
		var wStr = new js.text.WordString();
		wStr.add('test');
		equals(wStr.toString(), 'test', 'When use add() method to add a word, it will contain the newly added word. And when toString() method invoked, it returns the new word.');
		
		wStr.add('word1 word2');
		equals(wStr.toString(), 'test word1 word2', 'When use add() method to add a string of words, it will contain the newly added word, and in the adding order.');
		
		wStr.add(true);
		equals(wStr.toString(), 'test word1 word2', 'When add a boolean value, it will not in the collection.');
		
		wStr.add('the word before "w"');
		equals(wStr.toString(), 'test word1 word2 the word before "w"', 'When add some words, the collection will be in adding order but not alpha order.');
	});
	
	test('js.text.WordString.prototype.remove()', function(){
		var wStr = new js.text.WordString();
		wStr.add('test word');
		wStr.remove('test');
		equals(wStr.toString(), 'word', 'When use remove() method to remove a word, the string will not contain the removed word.');
	});
	
	test('js.text.WordString.toggle()', function(){
		var wStr = 'test word';
		wStr = js.text.WordString.toggle(wStr, 'test', ' ', false);
		equals(wStr, 'word', 'When use toggle() method to toggle a word, if pass the false to the second argument, the string will not contain the toggled word.');
	});
}