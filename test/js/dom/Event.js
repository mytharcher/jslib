if (js.dom.Event) {

	function randomHex(){
		return Math.ceil(Math.random() * 256);
	}
	
	function randomHexValue(n){
		var n = n || 1, ret = [];
		for (var i = 0; i < n; i++) {
			var hex = randomHex().toString(16);
			ret.push(hex.length == 1 ? '0' + hex : hex);
		}
		return ret.join('');
	}
	
	function randomColor(){
		return '#' + randomHexValue(3);
	}
	
	module('js.dom.Event');
	
	asyncTest('js.dom.Event.add()', function(){
		var div = document.getElementById('test');
		
		stop();
		
		var lastColor = randomColor();
		
		function onOverChangeBgColor(ev){
			start();
			
			js.dom.Event.remove(this, 'mouseover', arguments.callee);
			
			var rColor = (lastColor = randomColor());
			js.dom.Style.set(this, 'backgroundColor', rColor);
			equals(js.dom.Style.get('backgroundColor'), rColor, 'When added a mouseover event, it can be invoked when mouseover.');
		}
		
		function onOverNoop(ev){
			start();
			equals(js.dom.Style.get('backgroundColor'), lastColor, 'When remove a old mouseover event, it can be not invoked when mouseover.');
		}
		
		js.dom.Event.add(div, 'mouseover', onOverChangeBgColor);
		js.dom.Event.add(div, 'mouseover', onOverChangeBgColor);
		js.dom.Event.add(div, 'mouseover', onOverNoop);
		js.dom.Event.add(div, 'mouseover', onOverNoop);
		
		div = null;
	});
	
}