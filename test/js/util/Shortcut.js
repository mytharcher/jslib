if (js.util.Shortcut) {

	module('js.util.Shortcut');
	
	test('js.util.Shortcut.attach()', function(){
		function noop(){
		}
		
		function sc(){
			//当使用attach方法时，函数必须已经是用Shortcut分发的了
			//这种情况很少用到，比如elf()顶级函数，其他大多可以通过create实现
			return js.util.Shortcut.dispatch(arguments);
		}
		equals(sc(), noop(), 'When a function is not attached, the shortcut method inside could not work.');
		
		js.util.Shortcut.attach(sc);
		equals(sc(), js.util.Shortcut.get(sc).mirror, 'When attached a function, then it became a shortcut function. When no interceptors inside, the function invoking just return the mirror object.');
	});
	
	test('js.util.Shortcut.create()', function(){
		var sc = js.util.Shortcut.create();
		
		equals(sc(), js.util.Shortcut.get(sc).mirror, 'When create a Shortcut method, it could be invoked, and return the mirror object inside, and use "get" method can get the inside object.');
	});
	
	test('js.util.Shortcut.get()', function(){
		function noop(){
		}
		equals(js.util.Shortcut.get(noop), null, 'When a function is not attached, we can\'t get it\'s shortcut object.');
		
		var sc = js.util.Shortcut.create();
		equals(sc(), js.util.Shortcut.get(sc).mirror, 'When attached a function, then it became a shortcut function. When no interceptors inside, the function invoking just return the mirror object.');
	});
	
	test('js.util.Shortcut.use()', function(){
		function noop(){}
		
		ok(true, 'Most function in Shortcut is provided by js.util.Class.extend function. So can see also in <a href="Class.html">js.util.Class\'s case</a>.')
		
		var t = js.util.Shortcut.create();
		
		js.util.Shortcut.use(t, {
			n: 1
		});
		equals(t().n, 1, 'When use js.util.Shortcut.use(SomeMapObject), all the properties should be bind onto js.util.Shortcut namespace, and when use elf() can directly access the properties for shortcut.');
		
		js.util.Shortcut.use(t, {
			n: 2
		});
		equals(t().n, 1, 'When use js.util.Shortcut.use(SomeMapObject), and the SomeMapObject has some properties already on js.util.Shortcut namespace, it will not overwrite the properties with same name.');
		
		js.util.Shortcut.use(t, {
			m: 0
		});
		js.util.Shortcut.use(t, {
			m: 1
		});
		equals(t().m, 0, 'When duplicated property shortcut, if the old one is a number of "0", also cannot be overwrite.');
		
		js.util.Shortcut.use(t, {
			r: false
		});
		js.util.Shortcut.use(t, {
			r: true
		});
		equals(t().r, false, 'When duplicated property shortcut, if the old one is a boolean of "false", also cannot be overwrite.');
		
		js.util.Shortcut.use(t, {
			s: null
		});
		equals(typeof t().s, 'undefined', 'When shortcut a null value property, the null value cannot be shortcut.');
		
		js.util.Shortcut.use(t, {
			s: noop()
		});
		equals(typeof t().s, 'undefined', 'When shortcut a undefined value property, the undefined value cannot be shortcut.');
	});
	
	test('js.util.Shortcut.intercept()', function(){
		var sc = js.util.Shortcut.create();
		//创建一个字符串类型的拦截器，如果碰到字符串参数，就进行大小写转换处理
		js.util.Shortcut.intercept(sc, js.util.Type.STRING, function(s, alphaCase){
			return s[alphaCase ? 'toUpperCase' : 'toLowerCase']();
		});
		equals(sc('abcDef'), 'abcdef', 'When add an interceptor by a specified type, the interceptor should work.');
		equals(sc(1), js.util.Shortcut.get(sc).mirror, 'When use a unspecified type to the shortcut, it would return the mirror object inside.');
		
		js.util.Shortcut.intercept(sc, {
			'number': function(num){
				return num + 1;
			}
		});
		equals(sc(1), 2, 'When add a group of intereptor by a object map, all the interceptor should work.');
		
		js.util.Shortcut.intercept(sc, js.util.Type.STRING, function(s){
			return s.split('');
		});
		equals(sc('test').join(''), 'test', 'When add an interceptor by a specified type which is already existed, the method should be overrided.');
	});
}