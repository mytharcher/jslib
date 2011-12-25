if (js.dom.Style) {

	module('js.dom.Style');
	
	test('instance', function(){
		var style = new js.dom.Style('background:#fff;');
		ok(style instanceof js.util.Hash, 'The instance of Style should be a Hash instance, too.');
		
		style.set('color', 'red');
		equals(style._data.color, 'red', 'Set a value to a style instance can work.');
		
		style.set({
			color: 'green'
		});
		equals(style._data.color, 'green', 'Set a group of value to a style instance can work.');
		
		equals(style.get('background'), '#fff', 'Use method "get" can get the value specified by the key.');
		
		var style1 = new js.dom.Style(style);
		equals(style1.get('background'), '#fff', 'When create a new Style instance by passing in a exist Style instance, all the values of the existed one should be copied to the new one.');
	});
	
	test('js.dom.Style.set()', function(){
		js.dom.Style.set('Test_js-dom-Style', 'color', 'red');
		equals(js.dom.Stage.get('Test_js-dom-Style').style.color, 'red', 'Use method "set" can set a text color successfully.');
		
		js.dom.Style.set('Test_js-dom-Style', 'color', '#00f');
		equals(js.dom.Style.get('Test_js-dom-Style', 'color'), '#0000ff', 'Use method "set" can set a hex color successfully.');
		
		js.dom.Style.set('Test_js-dom-Style', 'background', 'url(http://www.baidu.com/img/baidu_logo.gif) no-repeat');
		js.dom.Style.set('Test_js-dom-Style', 'background-color', '#000');
		equals(js.dom.Style.get('Test_js-dom-Style', 'background-color'), '#000000', 'Use method "set" can set the key with "-" successfully.');
		
		js.dom.Style.set('Test_js-dom-Style', {
			background: 'none',
			color: '#f00'
		});
		equals(js.dom.Style.get('Test_js-dom-Style', 'background-color'), 'transparent', 'When set "background" style for a element by "none", the "background-color" style should be "transparent".');
		
		js.dom.Style.set('Test_js-dom-Style', 'float', 'left');
		equals(js.dom.Style.get('Test_js-dom-Style', 'float'), 'left', 'When set special style "float", it can be set successfully.');
		
		js.dom.Style.set('Test_js-dom-Style', 'opacity', 0.5);
		if (js.client.Browser.IE) {
			ok(js.dom.Style.get('Test_js-dom-Style')['filter'].indexOf('alpha(opacity=50)') >= 0, 'When set opacity style under IE, it should work.');
		} else {
			equals(js.dom.Style.get('Test_js-dom-Style')['opacity'], '0.5', 'When set opacity style under non-IE browser, it should work, too.');
		}
	});
	
	test('js.dom.Style.get()', function(){
		js.dom.Style.set('Test_js-dom-Style', 'opacity', 0.5);
		equals(js.dom.Style.get('Test_js-dom-Style', 'opacity'), '0.5', 'When get opacity style under any type of browser, it should get a float number between 0 and 1.');
		
		equals(typeof js.dom.Style.get('Test_js-dom-Style'), 'object', 'When get style from a element but not specified a key, it should return all current styles in an object.');
	});
	
	test('js.dom.Style.setCSSText()', function(){
		js.dom.Style.setCSSText('Test_js-dom-Style', {
			width: '300px',
			height: '100px'
		});
		equals(js.dom.Stage.get('Test_js-dom-Style').style.width, '300px', 'Use method "setCSSText" can set a group of values to an element.');
	});
}