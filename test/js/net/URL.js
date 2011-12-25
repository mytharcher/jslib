if (js.net.URL) {

	module('js.net.URL');
	
	test('js.net.URL.parseJSON()', function(){
		var localhostDir = js.net.URL.parseJSON('localhost');
		equals(localhostDir.hostname, '');
		equals(localhostDir.path, 'localhost');
		
		var localhostDomain = js.net.URL.parseJSON('http://localhost');
		equals(localhostDomain.hostname, 'localhost');
		equals(localhostDomain.path, '');
		
		var testDir = js.net.URL.parseJSON('test');
		equals(testDir.hostname, '');
		equals(testDir.path, 'test');
		
		var currentLocation = js.net.URL.parseJSON(location);
		equals(currentLocation.hostname, location.hostname);
	});
	
	test('js.net.URL()', function(){
		var localhost = new js.net.URL('localhost');
		equals(localhost.hostname, '');
		equals(localhost.getHost(), '');
	});
}