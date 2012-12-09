if (js.dom.Relation) {

	module('js.dom.Relation');
	
	test('js.dom.Relation.firstChild()', function(){
		var root = document.getElementById('Test_js-dom-Relation');
		
		equals(js.dom.Relation.firstChild(root), root.getElementsByTagName('p')[0], 'Use firstChild method could get first non-text element in children.');
	});	
}