if (js.util.Class) {

	module('js.util.Class');
	
	test('js.util.Class.clone()', function(){
		var a = {
			n: 1,
			b: {
				c: 2
			}
		};
		var b = js.util.Class.clone(a);
		equals(a.n, b.n, 'When clone an object, all the plain properties should be copied to the target object.');
		
		equals(a.b.c, a.b.c, 'When clone an object, all the deep properties\' value should be copied to the target object.');
		
		a.n = 2;
		equals(b.n, 1, 'When clone an object, and change the source object\'s property value, the target object\'s same value should not be changed.');
		
		ok(a.b != b.b, 'When clone an object, the object property in target object is not equal to the source one.');
		
		a.c = a.b;
		var c = js.util.Class.clone(a);
		c.b.c = 3;
		ok(c.b.c != c.c.c, 'When refer property cloned, the property in different name should be different ones.');
		
		//	give up the recursion refer.
		//	a.b.c = a.b;
		//	var d = js.util.Class.clone(a);//died here...
		
		a.toString = function(){
			return JSON.stringify(this);
		};
		var e = js.util.Class.clone(a);
		equals(e.toString.toString(), a.toString.toString(), 'When clone a function property, just copy it. And if the function name is "toString", also can be copied.');
		
		var f = function(){
		};
		var g = js.util.Class.clone(f);
		equals(g, f, 'When the source object is just a function, copy to the new one as a refer. It\'s the only one has special treat.');
		
		var h = 1;
		var i = js.util.Class.clone(h);
		h = 2;
		equals(i, 1, 'When clone a number, just evaluate the new one by the source\'s value.');
		
		h = 'abc';
		i = js.util.Class.clone(h);
		h = 'def';
		equals(i, 'abc', 'When clone a string, just evaluate the new one by the source\'s value.');
		
		h = false;
		i = js.util.Class.clone(h);
		h = true;
		equals(i, false, 'When clone a boolean, just evaluate the new one by the source\'s value.');
		
		h = null;
		i = js.util.Class.clone(h);
		h = 123;
		equals(i, null, 'When clone a null value, just evaluate the new one by the source\'s value.');
		
		h = f();
		i = js.util.Class.clone(h);
		h = 123;
		equals(i, f(), 'When clone a undefined value, just evaluate the new one by the source\'s value.');
		
		var j = [1, 2, 3, 'abc', null, false];
		var k = js.util.Class.clone(j);
		equals(k.toString(), j.toString(), 'When clone an array, create a new array and clone all the items from the source.');
		
		j.push(a);
		var l = js.util.Class.clone(j);
		a.n = 3;
		equals(l[6].n, 2, 'When clone a deep array, all the items and item\'s properties should be cloned.');
	});
	
	test('js.util.Class.copy', function () {
		var a = {
			b: 1,
			c: 2
		};
		var b = js.util.Class.copy(a, {});
		equals(a.b, b.b);
	});
	
	test('js.util.Class.mix()', function(){
		var a = {
			b: 1,
			c: 2
		};
		var b = js.util.Class.mix({}, a);
		equals(b.b, 1, 'When extend a plain object to an empty object, all values in source should be copy to target object.');
		
		var c = js.util.Class.mix({
			b: 10
		}, a);
		equals(c.b, 10, 'When extend a target has same property name with the source one, do not copy the property.');
		
		a.d = {
			e: 5
		};
		var d = js.util.Class.mix({}, a);
		a.d.e = 15;
		equals(d.d.e, 15, 'When extend a source has deep property, copy the properties\' refer to target.');
		
		//特殊键的扩展，如：constructor，prototype
		var con = function(){
		};
		var e = js.util.Class.mix({}, {
			constructor: con,
			prototype: new Function()
		});
		equals(e.constructor, con, 'When extend a object contains a key named "constructor" itsjs own, it can be extended.');
		
		equals(js.util.Class.mix({}, con).constructor, Object, 'When extend a source contains a key named "constructor" but not itsjs own, it cannot be extended, and the target\'s constructor should be the original constructor.');
		
		equals(e.toString, Object.prototype.toString, 'When extend a source contains a "prototype" key, this key should not be extended.');
		
		var f = js.util.Class.mix({
			b: 10
		}, a, true);
		
	});
	
	test('js.util.Class.create()', function(){
		var C = js.util.Class.create({
			constructor: function(a){
				this.a = a;
			}
		});
		
		var a = 123;
		var c = new C(a);
		equal(c.a, a, 'Test the default initialize function "constructor" should be invoked, and the property can be appended onto the new object.');
		
		//创建一个没有填入constructor的类，同时不继承于任何类，能够正常创建，且可以实例化对象
		var C1 = js.util.Class.create({
			test: function(){
				return 1;
			}
		});
		
		var c1 = new C1();
		ok(c1 instanceof C1, 'When no constructor passed in, the class should be create also.');
		
		//多次继承后仍可以正确调用父类方法，包括实例方法和静态方法
	});
}