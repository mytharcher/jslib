if (js.util.Global) {

	module('js.util.Global');
	
	test('js.util.Global.guid()', function(){
		equals(typeof js.util.Global.guid(), 'string', 'The guid should be a string.');
		ok(js.util.Global.guid() != js.util.Global.guid(), 'Any two of guid should not be equal.');
		
		var times = 10000, ret = new Array(times);
		for (var i = ret.length - 1; i >= 0; i--) {
			ret[i] = js.util.Global.guid();
		}
		equals(js.util.XArray.distinct(ret).length, times, 'When the method run a lot of times, there should not be any equal two, and the count of the distinct result should be as many as times run.');
		
		var id = js.util.Global.guid('_', '-');
		equals(id.charAt(0), '_', 'The prefix should be the set one.');
		equals(id.charAt(id.length - 1), '-', 'The suffix should be the set one.');
		
		equals(isNaN(parseInt(js.util.Global.guid())), false, 'When prefix and suffix are not defined, the guid should be a integer string.');
	});
	
	test('js.util.Global.stamp()', function(){
		var obj = {};
		ok(!(js.util.Global.STAMP in obj), 'When an object has not been stamped, the stamp key should not in the object.');
		var stamp = js.util.Global.stamp(obj);
		equals(typeof stamp, 'string', 'A auto generated stamp should be a string.');
		ok(js.util.Global.STAMP in obj, 'When an object has been stamped, the stamp key should in the obejct.');
		equals(js.util.Global.stamp(obj), obj[js.util.Global.STAMP], 'When get a stamp from a stamped object, it should be equal to the value appointed by the stamp key.');
	});
	
	test('js.util.Global.noop()', function(){
		equals(typeof js.util.Global.noop(), 'undefined', 'The function "noop" should return an undefined value when it was invoked.');
		equals(Object.keys(new js.util.Global.noop()).length, 0, 'When create a new noop instance, it should not contain any key.');
		ok(js.util.Global.noop.toString().match(/function \(\) \{\s*\}/), 'The stringified function should be the expected string.');
	});
	
	test('js.util.Global._STAMP', function(){
		ok(js.util.Global._STAMP.match(/ELF_[0-9a-z]{13}_1/i), 'The STAMP const should be expected form, and the index should start from 1, as the first guid.');
	});
}