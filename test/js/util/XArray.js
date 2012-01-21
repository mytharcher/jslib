if (js.util.XArray) {

	module('js.util.XArray');
	
	test('XArray instance as Array', function () {
		var xArr = new js.util.XArray(1, 2, 3);
		ok(xArr instanceof Array, 'The XArray class is inherited from Array, so the instance of XArray should also be instance of Array');
		
		equals(xArr.length, 3, 'When create an XArray instance, the length should be the number of elements inside.');
		
		equals(xArr.push(5), 4, 'When push a new element into the XArray, the new length should return.');
		
		xArr.pop();
		equals(xArr.length, 3, 'When use the Array method, it works.');
		
		xArr.length = 0;
		equals(xArr.length, 0, 'When set an XArray\'s length to 0, the length should be 0.');
		equals(xArr[0], js.util.Global.noop(), 'When set an XArray\'s length to 0, all items should be cleaned.');
		
		xArr.push(1, 3, 4);
		var result = {sum: 0};
		var array = xArr.forEach(function (item) {
			this.sum += item;
		}, result);
		equals(result.sum, 8, 'The native method forEach() can be invoked normally.');
		equals(array, xArr, 'The method forEach() should return the instance of XArray for chaining.');
		
		array = xArr.filter(function (item) {
			return item % 2;
		});
		equals(array.toString(), '1,3', 'The native method filter() can be invoked noramlly.');
		ok(typeof array.distinct == 'function', 'The method filter() should return an instance of XArray for chaining');
		ok(array != xArr, 'The method filter() should not change the origin one and should return a copy.');
		
		array = xArr.map(function (item) {
			return item * 2;
		});
		equals(array.toString(), '2,6,8', 'The native method map() can be invoked noramlly.');
		ok(typeof array.distinct == 'function', 'The method map() should return an instance of XArray for chaining');
		ok(array != xArr, 'The method map() should not change the origin one and should return a copy.');
		
		array = xArr.slice(1);
		equals(array.toString(), '3,4', 'The native method slice() can be invoked noramlly.');
		ok(typeof array.distinct == 'function', 'The method slice() should return an instance of XArray for chaining');
		ok(array != xArr, 'The method slice() should not change the origin one and should return a copy.');
		
		array = xArr.sort(function (a, b) {return b - a;});
		equals(array.toString(), '4,3,1', 'The native method sort() can be invoked noramlly.');
		ok(typeof array.distinct == 'function', 'The method sort() should return an instance of XArray for chaining');
		ok(array == xArr, 'The method sort() would change the origin one but not return a copy.');
		
		array = xArr.reverse();
		equals(array.toString(), '1,3,4', 'The native method reverse() can be invoked noramlly.');
		ok(typeof array.distinct == 'function', 'The method reverse() should return an instance of XArray for chaining');
		ok(array == xArr, 'The method reverse() would change the origin one but not return a copy.');
		
		array = xArr.concat([2, 5]);
		equals(array.toString(), '1,3,4,2,5', 'The native method concat() can be invoked noramlly.');
		ok(typeof array.distinct == 'function', 'The method concat() should return an instance of XArray for chaining');
		ok(array != xArr, 'The method concat() would not change the origin one but return a copy.');
	});
	
	test('xArr.indexOf()', function(){
		//测试空数组的查找索引结果，正确情况应返回-1。
		var emptyXArr = new js.util.XArray();
		equals(emptyXArr.indexOf(123), -1, 'When use .indexOf method on a empty XArray instance, return -1.');
		
		var testXArr = new js.util.XArray(1, 2, 3);
		equals(testXArr.indexOf(1), 0, 'When use .indexOf method on an XArray instance, and there is only one in XArray you want to find, return the just one\'s correct index.');
	});
	
	test('js.util.XArray.distinct()', function(){
		var a = {}, b = {
			a: a
		};
		var c = a, d = b;
		var array = [a, 213, 43, 'fdsa', b, '43', 0, false, true, null, c, d, undefined, '0', 'fasle', 'true', true, 'null', 'undefined'];
		//var array = [//1,2,3,4,5,6,76,8,9,0];
		//var array = ['a','b','c','d','e','f','g','h','i','j'];
		var duplicate = [a, 213, 43, 'fdsa', b, '43', 0, false, true, null, undefined, '0', 'fasle', 'true', 'null', 'undefined'];
		var xArr = js.util.XArray.toXArray(array).distinct();
		
		var allEqual = true, maxLen = Math.max(duplicate.length, xArr.length);
		for (var i = maxLen - 1; i >= 0; i--) {
			if (duplicate[i] !== xArr[i]) {
				allEqual = false;
				break;
			}
		}
		ok(allEqual, 'All the elements in the distinct array should be same both in order and in value as the expected distinct one.');
	});
	
	test('js.util.XArray.toArray()', function(){
		function g(id){
			return document.getElementById(id);
		}
		function arrayEqual(item, i, arr){
			return item === this[i];
		}
		function getArguments(){
			return arguments;
		}
		
		var dts = g('Test_js-dom-Traversal-tree').getElementsByTagName('dt');
		var dtArr = js.util.XArray.toArray(dts);
		var exDts = [g('Test-js_util_XArray_toArray-dt1'), g('Test-js_util_XArray_toArray-dt2'), g('Test-js_util_XArray_toArray-dt3'), g('Test-js_util_XArray_toArray-dt4')];
		equals(exDts.every(arrayEqual, dtArr), true, 'When make an array from elements collection, the result should be same as expected array and in order.');
		
		var notExDts = exDts.slice(1);
		equals(notExDts.every(arrayEqual, dtArr), false, 'When make an array from elements collection, the result should not be same as another one.');
		ok(dtArr instanceof Array, 'The conversed object\'s type should be Array.');
		ok(js.util.Type.isArray(dtArr), 'The conversed object\'s type should be Array.');
		
		var treeNode = g('Test_js-dom-Traversal-tree');
		var exChildren = [];
		for (var i = treeNode.childNodes.length - 1; i >= 0; i--) {
			exChildren.unshift(treeNode.childNodes[i]);
		}
		equals(js.util.XArray.toArray(treeNode.childNodes).every(arrayEqual, exChildren), true, 'When make an array from childNodes collection, the result should be same as expected array and in order.');
		
		equals(js.util.XArray.toArray(document).every(arrayEqual, [document]), true, 'When passed document object to the method, the result should be an array contains only document object.');
		equals(js.util.XArray.toArray(window).every(arrayEqual, [window]), true, 'When passed window object to the method, the result should be an array contains only window object.');
		equals(js.util.XArray.toArray(g).every(arrayEqual, [g]), true, 'When passed a function to the method, the result should be an array contains only the function.');
		equals(js.util.XArray.toArray('abc').every(arrayEqual, ['abc']), true, 'When passed a string to the method, the result should be an array contains only the string.');
		equals(js.util.XArray.toArray('').every(arrayEqual, ['']), true, 'When passed a empty string to the method, the result should be an array contains only the string.');
		
		equals(js.util.XArray.toArray(getArguments(1, 2, 3)).every(arrayEqual, [1, 2, 3]), true, 'When passed a arguments object to the method, the result should be an array contains all the elements in the arguments object.');
		
		equals(js.util.XArray.toArray([1, 2, 3]).every(arrayEqual, [1, 2, 3]), true, 'When passed an array to the method, the result should be a copy of that array.');
	});
}