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
		
		var ifA = js.dom.Stage.get('path-test-a'), winA = ifA.contentWindow;
		
		js.dom.Cookie.set('d=200', {
			path: location.pathname + ifA.getAttribute('src')
		});
		
		equals(winA.document.cookie.match('(?:;\s*)?(d=200)(?:\s*;)?')[1], 'd=200', 'When set a cookie to a certain path, the value can be read from that path.');
		equals(typeof js.dom.Cookie.get('d'), 'undefined', 'When set a cookie to a certain path, the value cannot be read lower path.');
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