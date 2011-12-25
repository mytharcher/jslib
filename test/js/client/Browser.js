if (js.client.Browser) {

	module('js.client.Browser');
	
	test('Type', function(){
		if (js.client.Browser.IE) {
			ok(js.util.Type.isNumber(js.client.Browser.IE), 'If using IE, js.client.Browser.IE should be a version number.');
			ok(js.util.Type.isUndefined(js.client.Browser.Firefox), 'If using IE, js.client.Browser.Firefox should be undefined.');
			ok(js.util.Type.isUndefined(js.client.Browser.Chrome), 'If using IE, js.client.Browser.Chrome should be undefined.');
			ok(js.util.Type.isUndefined(js.client.Browser.Safari), 'If using IE, js.client.Browser.Safari should be undefined.');
			ok(js.util.Type.isUndefined(js.client.Browser.Opera), 'If using IE, js.client.Browser.Opera should be undefined.');
		} else  if (js.client.Browser.Firefox) {
			ok(js.util.Type.isUndefined(js.client.Browser.IE), 'If using Firefox, js.client.Browser.IE should be undefined.');
			ok(js.util.Type.isNumber(js.client.Browser.Firefox), 'If using Firefox, js.client.Browser.Firefox should be a version number.');
			ok(js.util.Type.isUndefined(js.client.Browser.Chrome), 'If using Firefox, js.client.Browser.Chrome should be undefined.');
			ok(js.util.Type.isUndefined(js.client.Browser.Safari), 'If using Firefox, js.client.Browser.Safari should be undefined.');
			ok(js.util.Type.isUndefined(js.client.Browser.Opera), 'If using Firefox, js.client.Browser.Opera should be undefined.');
		} else  if (js.client.Browser.Chrome) {
			ok(js.util.Type.isUndefined(js.client.Browser.IE), 'If using Chrome, js.client.Browser.IE should be undefined.');
			ok(js.util.Type.isUndefined(js.client.Browser.Firefox), 'If using Chrome, js.client.Browser.Firefox should be undefined.');
			ok(js.util.Type.isNumber(js.client.Browser.Chrome), 'If using Chrome, js.client.Browser.Chrome should be a version number.');
			ok(js.util.Type.isUndefined(js.client.Browser.Safari), 'If using Chrome, js.client.Browser.Safari should be undefined.');
			ok(js.util.Type.isUndefined(js.client.Browser.Opera), 'If using Chrome, js.client.Browser.Opera should be undefined.');
		} else  if (js.client.Browser.Safari) {
			ok(js.util.Type.isUndefined(js.client.Browser.IE), 'If using Safari, js.client.Browser.IE should be undefined.');
			ok(js.util.Type.isUndefined(js.client.Browser.Firefox), 'If using Safari, js.client.Browser.Firefox should be undefined.');
			ok(js.util.Type.isUndefined(js.client.Browser.Chrome), 'If using Safari, js.client.Browser.Chrome should be undefined.');
			ok(js.util.Type.isNumber(js.client.Browser.Safari), 'If using Safari, js.client.Browser.Safari should be a version number.');
			ok(js.util.Type.isUndefined(js.client.Browser.Opera), 'If using Safari, js.client.Browser.Opera should be undefined.');
		} else if (js.client.Browser.Opera) {
			ok(js.util.Type.isUndefined(js.client.Browser.IE), 'If using Opera, js.client.Browser.IE should be undefined.');
			ok(js.util.Type.isUndefined(js.client.Browser.Firefox), 'If using Opera, js.client.Browser.Firefox should be undefined.');
			ok(js.util.Type.isUndefined(js.client.Browser.Chrome), 'If using Opera, js.client.Browser.Chrome should be undefined.');
			ok(js.util.Type.isUndefined(js.client.Browser.Safari), 'If using Opera, js.client.Browser.Safari should be undefined.');
			ok(js.util.Type.isNumber(js.client.Browser.Opera), 'If using Opera, js.client.Browser.Opera should be a version number.');
		}
	});
	
}