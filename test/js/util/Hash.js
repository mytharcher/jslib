if (js.util.Hash) {

	module('js.util.Hash');
	
	test('js.util.Hash()', function(){
		function noop(){
		}
		
		function getFirst(obj){
			for (var i in obj) {
				return obj[i];
			}
			return null;
		}
		
		var h1 = new js.util.Hash();
		equals(typeof h1, 'object', 'When create a new Hash instance, it should be done, and the instance should be a object.');
		ok(h1 instanceof js.util.Hash, 'When create a new Hash instance, it should be done, and the instance should be an instance of class Hash.');
		ok(!getFirst(h1.get()), 'When use method "get" on an newly created empty instance, it can get nothing.');
		var h2 = new js.util.Hash('a', 1);
		equals(h2.get('a'), 1, 'When create a Hash instance by passing a key/value pair of arguments, the "get" method should return the value specified by the key.');
		
		h2.set('a', 2);
		equals(h2.get('a'), 2, 'When set a value by a specified key, the "get" method should return the value specified by the key.');
		
		h2.set('a', null);
		equals(h2.get('a'), noop(), 'When set a key to null, the "get" method should return an undefined value specified by the key.');
		
		h2.set({
			a: h1,
			b: false
		});
		equals(h2.get('a'), h1, 'When set a group value by a object, the "get" method should return the value in the group by specified key.');
		equals(h2.get('b'), false, 'When set a group value by a object, the "get" method should return the value in the group by specified key.');
		
		h2.remove('b');
		equals(h2.get('b'), noop(), 'When remove a value by a specified key, the "get" method should return return an undefined value specified by the key.');
	});
}