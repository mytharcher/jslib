if (js.util.Namespace) {

	module('js.util.Namespace');
	
	test('js.util.Namespace.get()', function(){
		equals(js.util.Namespace.get('js.util.Namespace'), js.util.Namespace, 'To get an exist namespace by specifying a namespace string, return the specified object.');
		
		equals(js.util.Namespace.get('Namespace', js.util), js.util.Namespace, 'To get an exist namespace by specifying the namespace string on a namespace base object, return the specified object.');
		
		equals(js.util.Namespace.get('Namespace', 'js.util'), js.util.Namespace, 'To get an exist namespace by specifying the namespace string on a namespace base string, return the specified object.');
		
		equals(js.util.Namespace.get('Namespace', 'js.notExist'), js.util.Global.noop(), 'To get a namespace by specifying the namespace string on a not exist namespace base string, return undefined.');
		
		equals(js.util.Namespace.get('ABCD'), js.util.Global.noop(), 'To get a namespace not exist by specifying a namespace string, it will return undefined.');
		
		equals(js.util.Namespace.get('zero', {zero: 0}), 0, 'Number value "0" Could be get.');
		equals(js.util.Namespace.get('False', {False: false}), false, 'Boolean value "false" Could be get.');
		
		var myNamespaceObj = {
			n: 1
		};
		
		equals(js.util.Namespace.get('ABCD', window, myNamespaceObj), myNamespaceObj, 'To create a namespace not exist by specifying a namespace string, and pass the object wanted to create on that namespace, will create the specified namespace and return it.');
		
		equals(js.util.Namespace.get('ABCD'), window.ABCD, 'To get the created namespace by specifying a namespace string, will return the just created one.');
		
		var anotherNamespaceObj = {
			n: 2
		};
		
		equals(js.util.Namespace.get('ABCD', window, anotherNamespaceObj), window.ABCD, 'To overwrite the created namespace by passing a namespace object, will not overwrite created namespace, and return the old created one.');
	});
	
	test('js.util.Namespace.use()', function(){
		window.TestNamespace = {
			MyLayer: {}
		};
		var myLayer = window.TestNamespace.MyLayer;
		js.util.Namespace.use('TestNamespace.MyLayer');
		equals(MyLayer, myLayer, 'When use js.util.Namespace("Some.Space"), the "Space" object should be bind to window, and can be access by use Space');
		
		js.util.Namespace.use('TestNamespace.MyLayer', window, 'AnotherLayer');
		equals(TestNamespace.MyLayer, window.AnotherLayer, 'When an alias passed in, use the alias name instead the namespace on the target base.');
	});
}