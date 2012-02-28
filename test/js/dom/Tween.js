if (js.dom.Tween) {

	module('Static methods of js.dom.Tween');
	
	asyncTest('js.dom.Tween.start()', function(){
	
		// stop();
		
		var div = document.getElementById('Test_js-dom-Tween');
		
		js.dom.Tween.start({
			object: div,
			duration: 500,
			property: {
				left: {
					to: 100,
					unit: 'px'
				},
				top: {
					from: 0,
					to: 200,
					unit: 'px',
					ease: js.transition.Easing.quadIn
				}
			},
			onfirstframe: function(){
				//console && console.log('first');
				equals(js.dom.Style.get('Test_js-dom-Tween', 'top'), '0px', 'When a Tween start, the property will be set to the value of "from" if it has "from".');
			},
			onenterframe: function(percent){
				//console && console.log(percent);
				var divY = js.dom.Style.get('Test_js-dom-Tween', 'top');
				//ok(0 < percent && percent < 1 && '0px' < divY && divY < '200px' || 1, '当一个单调递增形变补间在运动时，属性值会被设置在开始值与结束值之间。');
			},
			oncomplete: function(){
				//console && console.log('complete.');
				start();
				equals(js.dom.Style.get('Test_js-dom-Tween', 'top'), '200px', 'When a Tween completed, the property will be set to the value of "to".');
			}
		});
	});
}