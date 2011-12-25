if (js.dom.Cookie) {

	module('js.dom.Cookie');
	
	test('js.dom.Cookie.set()', function(){
		js.dom.Cookie.set('a', 1);
		ok(document.cookie.indexOf('a=1') >= 0, 'When set a value in a key to the cookie, it can be read from document.cookie.');
		
		js.dom.Cookie.set('a', 2);
		ok(document.cookie.indexOf('a=1') == -1 && document.cookie.indexOf('a=2') >= 0, 'When set a value in a exist key to the cookie, the value should be the new one.');
		
		js.dom.Cookie.set('a=3; b=1');
		ok(document.cookie.indexOf('a=3') >= 0 && document.cookie.indexOf('b=1') >= 0, 'Use a key-value string can set cookie successfully.');
		
		js.dom.Cookie.set({
			a: 4,
			b: 2
		});
		ok(document.cookie.indexOf('a=4') >= 0 && document.cookie.indexOf('b=2') >= 0, 'Use a object can set cookie successfully.');
		
		js.dom.Cookie.set('a', 0);
		ok(document.cookie.indexOf('a=0') >= 0, 'Set a key to a number value, the number should be converse to a string.');
		
		js.dom.Cookie.set('b', false);
		ok(document.cookie.indexOf('b=false') >= 0, 'Set a key to a boolean value, the bool should be converse to a string.');
		
		var specialChars = ',.?:"\'~!@#$%^&*()-_+{}[]|\\;=';
		js.dom.Cookie.set('c', 'abc' + specialChars + 'def');
		ok(document.cookie.indexOf('c=' + encodeURIComponent('abc' + specialChars + 'def')) >= 0, 'When set some specail char "' + specialChars + '", they should be encoded and stored.');
		
		var winA = js.dom.Stage.get('path-test-a').contentWindow, winB = js.dom.Stage.get('path-test-b').contentWindow;
		winA.js.dom.Cookie.set('d=100');
		equals(winA.js.dom.Cookie.get('d'), '100', 'When set a value to the cookie in a page in different path, it can be set successfully.');
		equals(js.dom.Cookie.get('c'), 'abc' + specialChars + 'def', 'When set a cookie in a deeper path, the value in lower path should be the orignal one.');
		
		js.dom.Cookie.set('c=200', {
			path: '/elfjs/jslib/test/js/cookie-test/'
		});
		// console.log(winA.document.cookie);
		// equals(winA.js.dom.Cookie.get('c'), '200', 'When set a cookie to a certain path, the value can be read from that path.');
		// equals(winB.js.dom.Cookie.get('c'), '200', 'From deeper path can read cookie from lower path.');
	});
	
	test('js.dom.Cookie.get()', function(){
		equals(js.dom.Cookie.get('a'), '0', 'Use method "get" can get the value set from cookie with the specified key.');
		equals(js.dom.Cookie.get('d'), js.util.Global.noop(), 'When get a non-exist key from cookie, it will return undefined.');
		equals(js.util.Type.of(js.dom.Cookie.get()), js.util.Type.OBJECT, 'When use method "get" and do not specify a key name, it will return all keys in a object.');
	});
	
	test('js.dom.Cookie.remove()', function(){
		js.dom.Cookie.remove('a');
		equals(js.dom.Cookie.get('a'), js.util.Global.noop(), 'When use method "remove" deleted a key from cookie, it can not be get any more.');
	});
}