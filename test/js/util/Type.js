if (js.util.Type) {

	module('js.util.Type');
	
	test('js.util.Type.of()', function(){
		function noop(){
		}
		
		equals(js.util.Type.of(null), 'null', 'When passed null value to the function, it returns "null".');
		equals(js.util.Type.of(noop()), 'undefined', 'When passed undefined value to the function, it returns "undefined".');
		
		equals(js.util.Type.of(true), 'boolean', 'When passed a boolean value to the function, it returns "boolean".');
		equals(js.util.Type.of(new Boolean()), 'boolean', 'When passed a boolean object to the function, it returns "boolean".');
		equals(js.util.Type.of(Object(false)), 'boolean', 'When passed a boolean object to the function, it returns "boolean".');
		
		equals(js.util.Type.of(123), 'number', 'When passed a number value to the function, it returns "number".');
		equals(js.util.Type.of(new Number()), 'number', 'When passed a number object to the function, it returns "number".');
		equals(js.util.Type.of(Object(0)), 'number', 'When passed a number object to the function, it returns "number".');
		equals(js.util.Type.of(Infinity), 'number', 'When passed a Infinity value to the function, it returns "number".');
		equals(js.util.Type.of(1 / 0), 'number', 'When passed a Infinity value to the function, it returns "number".');
		equals(js.util.Type.of(Object(Infinity)), 'number', 'When passed a Infinity object to the function, it returns "number".');
		equals(js.util.Type.of(Number.POSITIVE_INFINITY), 'number', 'When passed a Infinity value to the function, it returns "number".');
		equals(js.util.Type.of(Number.NEGATIVE_INFINITY), 'number', 'When passed a Infinity value to the function, it returns "number".');
		equals(js.util.Type.of(NaN), 'nan', 'When passed not a number value or object to the function, it returns "nan".');
		
		equals(js.util.Type.of('abc'), 'string', 'When passed a string value to the function, it returns "string".');
		equals(js.util.Type.of(new String()), 'string', 'When passed a string object to the function, it returns "string".');
		equals(js.util.Type.of(Object('abc')), 'string', 'When passed a string object to the function, it returns "string".');
		equals(js.util.Type.of(''), 'string', 'When passed a empty string value to the function, it returns "string".');
		
		equals(js.util.Type.of(/reg/), 'regexp', 'When passed a regexp value to the function, it returns "regexp".');
		equals(js.util.Type.of(new RegExp("reg")), 'regexp', 'When passed a regexp object to the function, it returns "regexp".');
		
		equals(js.util.Type.of(new Date()), 'date', 'When passed a date object to the function, it returns "date".');
		
		equals(js.util.Type.of(noop), 'function', 'When passed a function object to the function, it returns "function".');
		
		equals(js.util.Type.of({}), 'object', 'When passed an object to the function, it returns "object".');
		equals(js.util.Type.of(new noop()), 'object', 'When passed a new created object to the function, it returns "object".');
		equals(js.util.Type.of(Object()), 'object', 'When passed an object to the function, it returns "object".');
		
	});
	
	test('js.util.Type.isNull()', function(){
		function noop(){
		}
		
		equals(js.util.Type.isNull(null), true, 'When passed a null value to the function, it should return true.');
		equals(js.util.Type.isNull(noop()), false, 'When passed a undefined value to the function, it should return false.');
		
		equals(js.util.Type.isNull(true), false, 'When passed a boolean value to the function, it should return false.');
		equals(js.util.Type.isNull(false), false, 'When passed a boolean value to the function, it should return false.');
		
		equals(js.util.Type.isNull(1), false, 'When passed a number value to the function, it should return false.');
		equals(js.util.Type.isNull(0), false, 'When passed the number "0" to the function, it should return false.');
		equals(js.util.Type.isNull(Infinity), false, 'When passed Infinity to the function, it should return false.');
		equals(js.util.Type.isNull(NaN), false, 'When passed NaN to the function, it should return false.');
		
		equals(js.util.Type.isNull('abc'), false, 'When passed a string value to the function, it should return false.');
		equals(js.util.Type.isNull(''), false, 'When passed a empty string to the function, it should return false.');
		
		equals(js.util.Type.isNull(/reg/), false, 'When passed a regexp to the function, it should return false.');
		
		equals(js.util.Type.isNull(noop), false, 'When passed a function to the function, it should return false.');
		
		equals(js.util.Type.isNull({}), false, 'When passed a object to the function, it should return false.');
	});
	
	test('js.util.Type.isUndefined()', function(){
		function noop(){
		}
		
		equals(js.util.Type.isUndefined(null), false, 'When passed a null value to the function, it should return false.');
		equals(js.util.Type.isUndefined(noop()), true, 'When passed a undefined value to the function, it should return true.');
		
		equals(js.util.Type.isUndefined(true), false, 'When passed a boolean value to the function, it should return false.');
		equals(js.util.Type.isUndefined(false), false, 'When passed a boolean value to the function, it should return false.');
		
		equals(js.util.Type.isUndefined(1), false, 'When passed a number value to the function, it should return false.');
		equals(js.util.Type.isUndefined(0), false, 'When passed the number "0" to the function, it should return false.');
		equals(js.util.Type.isUndefined(Infinity), false, 'When passed Infinity to the function, it should return false.');
		equals(js.util.Type.isUndefined(NaN), false, 'When passed NaN to the function, it should return false.');
		
		equals(js.util.Type.isUndefined('abc'), false, 'When passed a string value to the function, it should return false.');
		equals(js.util.Type.isUndefined(''), false, 'When passed a empty string to the function, it should return false.');
		
		equals(js.util.Type.isUndefined(/reg/), false, 'When passed a regexp to the function, it should return false.');
		
		equals(js.util.Type.isUndefined(noop), false, 'When passed a function to the function, it should return false.');
		
		equals(js.util.Type.isUndefined({}), false, 'When passed a object to the function, it should return false.');
	});
	
	test('js.util.Type.isDefined()', function(){
		function noop(){
		}
		
		equals(js.util.Type.isDefined(null), true, 'When passed a null value to the function, it should return true.');
		equals(js.util.Type.isDefined(noop()), false, 'When passed a undefined value to the function, it should return false.');
		
		equals(js.util.Type.isDefined(true), true, 'When passed a boolean value to the function, it should return true.');
		equals(js.util.Type.isDefined(false), true, 'When passed a boolean value to the function, it should return true.');
		
		equals(js.util.Type.isDefined(1), true, 'When passed a number value to the function, it should return true.');
		equals(js.util.Type.isDefined(0), true, 'When passed the number "0" to the function, it should return true.');
		equals(js.util.Type.isDefined(Infinity), true, 'When passed Infinity to the function, it should return true.');
		equals(js.util.Type.isDefined(NaN), true, 'When passed NaN to the function, it should return false.');
		
		equals(js.util.Type.isDefined('abc'), true, 'When passed a string value to the function, it should return true.');
		equals(js.util.Type.isDefined(''), true, 'When passed a empty string to the function, it should return true.');
		
		equals(js.util.Type.isDefined(/reg/), true, 'When passed a regexp to the function, it should return true.');
		
		equals(js.util.Type.isDefined(noop), true, 'When passed a function to the function, it should return true.');
		
		equals(js.util.Type.isDefined({}), true, 'When passed a object to the function, it should return true.');
	});
	
	test('js.util.Type.isBoolean()', function(){
		function noop(){
		}
		
		equals(js.util.Type.isBoolean(null), false, 'When passed a null value to the function, it should return false.');
		equals(js.util.Type.isBoolean(noop()), false, 'When passed a undefined value to the function, it should return false.');
		
		equals(js.util.Type.isBoolean(true), true, 'When passed a boolean value to the function, it should return true.');
		equals(js.util.Type.isBoolean(false), true, 'When passed a boolean value to the function, it should return true.');
		equals(js.util.Type.isBoolean(new Boolean()), true, 'When passed a boolean object to the function, it should return true.');
		equals(js.util.Type.isBoolean(Object(true)), true, 'When passed a boolean object to the function, it should return true.');
		
		equals(js.util.Type.isBoolean(1), false, 'When passed a number value to the function, it should return false.');
		equals(js.util.Type.isBoolean(0), false, 'When passed the number "0" to the function, it should return false.');
		equals(js.util.Type.isBoolean(Infinity), false, 'When passed Infinity to the function, it should return false.');
		equals(js.util.Type.isBoolean(NaN), false, 'When passed NaN to the function, it should return false.');
		
		equals(js.util.Type.isBoolean('abc'), false, 'When passed a string value to the function, it should return false.');
		equals(js.util.Type.isBoolean(''), false, 'When passed a empty string to the function, it should return false.');
		
		equals(js.util.Type.isBoolean(/reg/), false, 'When passed a regexp to the function, it should return false.');
		
		equals(js.util.Type.isBoolean(noop), false, 'When passed a function to the function, it should return false.');
		
		equals(js.util.Type.isBoolean({}), false, 'When passed a object to the function, it should return false.');
	});
	
	test('js.util.Type.isNumber()', function(){
		function noop(){
		}
		
		equals(js.util.Type.isNumber(null), false, 'When passed a null value to the function, it should return false.');
		equals(js.util.Type.isNumber(noop()), false, 'When passed a undefined value to the function, it should return false.');
		
		equals(js.util.Type.isNumber(true), false, 'When passed a boolean value to the function, it should return false.');
		equals(js.util.Type.isNumber(false), false, 'When passed a boolean value to the function, it should return false.');
		equals(js.util.Type.isNumber(new Boolean()), false, 'When passed a boolean object to the function, it should return false.');
		equals(js.util.Type.isNumber(Object(true)), false, 'When passed a boolean object to the function, it should return false.');
		
		equals(js.util.Type.isNumber(1), true, 'When passed a number value to the function, it should return true.');
		equals(js.util.Type.isNumber(0), true, 'When passed the number "0" to the function, it should return true.');
		equals(js.util.Type.isNumber(Infinity), true, 'When passed Infinity to the function, it should return true.');
		equals(js.util.Type.isNumber(new Number()), true, 'When passed a number object to the function, it should return true.');
		equals(js.util.Type.isNumber(Object(1)), true, 'When passed a number object to the function, it should return true.');
		equals(js.util.Type.isNumber(NaN), false, 'When passed NaN to the function, it should return false.');
		
		equals(js.util.Type.isNumber('abc'), false, 'When passed a string value to the function, it should return false.');
		equals(js.util.Type.isNumber(''), false, 'When passed a empty string to the function, it should return false.');
		
		equals(js.util.Type.isNumber(/reg/), false, 'When passed a regexp to the function, it should return false.');
		
		equals(js.util.Type.isNumber(noop), false, 'When passed a function to the function, it should return false.');
		
		equals(js.util.Type.isNumber({}), false, 'When passed a object to the function, it should return false.');
	});
	
	test('js.util.Type.isString()', function(){
		function noop(){
		}
		
		equals(js.util.Type.isString(null), false, 'When passed a null value to the function, it should return false.');
		equals(js.util.Type.isString(noop()), false, 'When passed a undefined value to the function, it should return false.');
		
		equals(js.util.Type.isString(true), false, 'When passed a boolean value to the function, it should return false.');
		equals(js.util.Type.isString(false), false, 'When passed a boolean value to the function, it should return false.');
		equals(js.util.Type.isString(new Boolean()), false, 'When passed a boolean object to the function, it should return false.');
		equals(js.util.Type.isString(Object(true)), false, 'When passed a boolean object to the function, it should return false.');
		
		equals(js.util.Type.isString(1), false, 'When passed a number value to the function, it should return false.');
		equals(js.util.Type.isString(0), false, 'When passed the number "0" to the function, it should return false.');
		equals(js.util.Type.isString(Infinity), false, 'When passed Infinity to the function, it should return false.');
		equals(js.util.Type.isString(new Number()), false, 'When passed a number object to the function, it should return false.');
		equals(js.util.Type.isString(Object(1)), false, 'When passed a number object to the function, it should return false.');
		equals(js.util.Type.isString(NaN), false, 'When passed NaN to the function, it should return false.');
		
		equals(js.util.Type.isString('abc'), true, 'When passed a string value to the function, it should return true.');
		equals(js.util.Type.isString(''), true, 'When passed a empty string to the function, it should return true.');
		equals(js.util.Type.isString(new String()), true, 'When passed a string object to the function, it should return true.');
		equals(js.util.Type.isString(Object('')), true, 'When passed a string object to the function, it should return true.');
		
		equals(js.util.Type.isString(/reg/), false, 'When passed a regexp to the function, it should return false.');
		
		equals(js.util.Type.isString(noop), false, 'When passed a function to the function, it should return false.');
		
		equals(js.util.Type.isString({}), false, 'When passed a object to the function, it should return false.');
	});
	
	test('js.util.Type.isRegExp()', function(){
		function noop(){
		}
		
		equals(js.util.Type.isRegExp(null), false, 'When passed a null value to the function, it should return false.');
		equals(js.util.Type.isRegExp(noop()), false, 'When passed a undefined value to the function, it should return false.');
		
		equals(js.util.Type.isRegExp(true), false, 'When passed a boolean value to the function, it should return false.');
		equals(js.util.Type.isRegExp(false), false, 'When passed a boolean value to the function, it should return false.');
		equals(js.util.Type.isRegExp(new Boolean()), false, 'When passed a boolean object to the function, it should return false.');
		equals(js.util.Type.isRegExp(Object(true)), false, 'When passed a boolean object to the function, it should return false.');
		
		equals(js.util.Type.isRegExp(1), false, 'When passed a number value to the function, it should return false.');
		equals(js.util.Type.isRegExp(0), false, 'When passed the number "0" to the function, it should return false.');
		equals(js.util.Type.isRegExp(Infinity), false, 'When passed Infinity to the function, it should return false.');
		equals(js.util.Type.isRegExp(new Number()), false, 'When passed a number object to the function, it should return false.');
		equals(js.util.Type.isRegExp(Object(1)), false, 'When passed a number object to the function, it should return false.');
		equals(js.util.Type.isRegExp(NaN), false, 'When passed NaN to the function, it should return false.');
		
		equals(js.util.Type.isRegExp('abc'), false, 'When passed a string value to the function, it should return false.');
		equals(js.util.Type.isRegExp(''), false, 'When passed a empty string to the function, it should return false.');
		equals(js.util.Type.isRegExp(new String()), false, 'When passed a string object to the function, it should return false.');
		equals(js.util.Type.isRegExp(Object('')), false, 'When passed a string object to the function, it should return false.');
		
		equals(js.util.Type.isRegExp(/reg/), true, 'When passed a regexp to the function, it should return true.');
		equals(js.util.Type.isRegExp(new RegExp('abc')), true, 'When passed a regexp to the function, it should return true.');
		
		equals(js.util.Type.isRegExp(noop), false, 'When passed a function to the function, it should return false.');
		
		equals(js.util.Type.isRegExp({}), false, 'When passed a object to the function, it should return false.');
	});
	
	test('js.util.Type.isDate()', function(){
		function noop(){
		}
		
		equals(js.util.Type.isDate(null), false, 'When passed a null value to the function, it should return false.');
		equals(js.util.Type.isDate(noop()), false, 'When passed a undefined value to the function, it should return false.');
		
		equals(js.util.Type.isDate(true), false, 'When passed a boolean value to the function, it should return false.');
		equals(js.util.Type.isDate(false), false, 'When passed a boolean value to the function, it should return false.');
		equals(js.util.Type.isDate(new Boolean()), false, 'When passed a boolean object to the function, it should return false.');
		equals(js.util.Type.isDate(Object(true)), false, 'When passed a boolean object to the function, it should return false.');
		
		equals(js.util.Type.isDate(1), false, 'When passed a number value to the function, it should return false.');
		equals(js.util.Type.isDate(0), false, 'When passed the number "0" to the function, it should return false.');
		equals(js.util.Type.isDate(Infinity), false, 'When passed Infinity to the function, it should return false.');
		equals(js.util.Type.isDate(new Number()), false, 'When passed a number object to the function, it should return false.');
		equals(js.util.Type.isDate(Object(1)), false, 'When passed a number object to the function, it should return false.');
		equals(js.util.Type.isDate(NaN), false, 'When passed NaN to the function, it should return false.');
		
		equals(js.util.Type.isDate('abc'), false, 'When passed a string value to the function, it should return false.');
		equals(js.util.Type.isDate(''), false, 'When passed a empty string to the function, it should return false.');
		equals(js.util.Type.isDate(new String()), false, 'When passed a string object to the function, it should return false.');
		equals(js.util.Type.isDate(Object('')), false, 'When passed a string object to the function, it should return false.');
		
		equals(js.util.Type.isDate(/reg/), false, 'When passed a regexp to the function, it should return false.');
		equals(js.util.Type.isDate(new RegExp('abc')), false, 'When passed a regexp to the function, it should return false.');
		
		equals(js.util.Type.isDate(new Date()), true, 'When passed a date object to the function, it should return true.');
		
		equals(js.util.Type.isDate(noop), false, 'When passed a function to the function, it should return false.');
		
		equals(js.util.Type.isDate({}), false, 'When passed a object to the function, it should return false.');
	});
	
	test('js.util.Type.isFunction()', function(){
		function noop(){
		}
		
		equals(js.util.Type.isFunction(null), false, 'When passed a null value to the function, it should return false.');
		equals(js.util.Type.isFunction(noop()), false, 'When passed a undefined value to the function, it should return false.');
		
		equals(js.util.Type.isFunction(true), false, 'When passed a boolean value to the function, it should return false.');
		equals(js.util.Type.isFunction(false), false, 'When passed a boolean value to the function, it should return false.');
		equals(js.util.Type.isFunction(new Boolean()), false, 'When passed a boolean object to the function, it should return false.');
		equals(js.util.Type.isFunction(Object(true)), false, 'When passed a boolean object to the function, it should return false.');
		
		equals(js.util.Type.isFunction(1), false, 'When passed a number value to the function, it should return false.');
		equals(js.util.Type.isFunction(0), false, 'When passed the number "0" to the function, it should return false.');
		equals(js.util.Type.isFunction(Infinity), false, 'When passed Infinity to the function, it should return false.');
		equals(js.util.Type.isFunction(new Number()), false, 'When passed a number object to the function, it should return false.');
		equals(js.util.Type.isFunction(Object(1)), false, 'When passed a number object to the function, it should return false.');
		equals(js.util.Type.isFunction(NaN), false, 'When passed NaN to the function, it should return false.');
		
		equals(js.util.Type.isFunction('abc'), false, 'When passed a string value to the function, it should return false.');
		equals(js.util.Type.isFunction(''), false, 'When passed a empty string to the function, it should return false.');
		equals(js.util.Type.isFunction(new String()), false, 'When passed a string object to the function, it should return false.');
		equals(js.util.Type.isFunction(Object('')), false, 'When passed a string object to the function, it should return false.');
		
		equals(js.util.Type.isFunction(/reg/), false, 'When passed a regexp to the function, it should return false.');
		equals(js.util.Type.isFunction(new RegExp('abc')), false, 'When passed a regexp to the function, it should return false.');
		
		equals(js.util.Type.isFunction(new Date()), false, 'When passed a date object to the function, it should return false.');
		
		equals(js.util.Type.isFunction(noop), true, 'When passed a function to the function, it should return true.');
		equals(js.util.Type.isFunction(new Function()), true, 'When passed a function to the function, it should return true.');
		equals(js.util.Type.isFunction(function(){
		}), true, 'When passed a function to the function, it should return true.');
		
		equals(js.util.Type.isFunction({}), false, 'When passed a object to the function, it should return false.');
	});
	
	test('js.util.Type.isObject()', function(){
		function noop(){
		}
		
		equals(js.util.Type.isObject(null), false, 'When passed a null value to the function, it should return false.');
		equals(js.util.Type.isObject(noop()), false, 'When passed a undefined value to the function, it should return false.');
		
		equals(js.util.Type.isObject(true), false, 'When passed a boolean value to the function, it should return false.');
		equals(js.util.Type.isObject(false), false, 'When passed a boolean value to the function, it should return false.');
		equals(js.util.Type.isObject(new Boolean()), false, 'When passed a boolean object to the function, it should return false.');
		equals(js.util.Type.isObject(Object(true)), false, 'When passed a boolean object to the function, it should return false.');
		
		equals(js.util.Type.isObject(1), false, 'When passed a number value to the function, it should return false.');
		equals(js.util.Type.isObject(0), false, 'When passed the number "0" to the function, it should return false.');
		equals(js.util.Type.isObject(Infinity), false, 'When passed Infinity to the function, it should return false.');
		equals(js.util.Type.isObject(new Number()), false, 'When passed a number object to the function, it should return false.');
		equals(js.util.Type.isObject(Object(1)), false, 'When passed a number object to the function, it should return false.');
		equals(js.util.Type.isObject(NaN), false, 'When passed NaN to the function, it should return false.');
		
		equals(js.util.Type.isObject('abc'), false, 'When passed a string value to the function, it should return false.');
		equals(js.util.Type.isObject(''), false, 'When passed a empty string to the function, it should return false.');
		equals(js.util.Type.isObject(new String()), false, 'When passed a string object to the function, it should return false.');
		equals(js.util.Type.isObject(Object('')), false, 'When passed a string object to the function, it should return false.');
		
		equals(js.util.Type.isObject(/reg/), false, 'When passed a regexp to the function, it should return false.');
		equals(js.util.Type.isObject(new RegExp('abc')), false, 'When passed a regexp to the function, it should return false.');
		
		equals(js.util.Type.isObject(new Date()), false, 'When passed a date object to the function, it should return false.');
		
		equals(js.util.Type.isObject(noop), false, 'When passed a function to the function, it should return false.');
		equals(js.util.Type.isObject(new Function()), false, 'When passed a function to the function, it should return false.');
		equals(js.util.Type.isObject(function(){
		}), false, 'When passed a function to the function, it should return false.');
		
		equals(js.util.Type.isObject({}), true, 'When passed a object to the function, it should return true.');
		equals(js.util.Type.isObject(new Object()), true, 'When passed a object to the function, it should return true.');
		equals(js.util.Type.isObject(Object()), true, 'When passed a object to the function, it should return true.');
		equals(js.util.Type.isObject(new noop()), true, 'When passed a object to the function, it should return true.');
	});
	
	if (js.util.Type.isElement) {
	
		test('js.util.Type.isElement()', function(){
			equals(js.util.Type.isElement(document.body), true, '');
			equals(js.util.Type.isElement(document.createElement('div')), true, '');
			equals(js.util.Type.isElement(document), false, '');
			equals(js.util.Type.isElement(document.createDocumentFragment()), false, '');
			
			equals(js.util.Type.isElement(document.getElementById('test-js-util-type-sub').contentWindow.document.body), true, 'The element in another window(such as iframe, opened window etc.) should be the same type in the current window.');
			
			equals(js.util.Type.of(document.body), 'element', 'When passed body to the function, it returns "element".');
			equals(js.util.Type.of(document.createElement('div')), 'element', 'When passed new created element to the function, it returns "element".');
			equals(js.util.Type.of(document.createDocumentFragment()), 'object', 'When passed new created fragment element to the function, it returns "object".');
			
		});
		
	}
	
	if (js.util.Type.isDocument) {
	
		test('js.util.Type.isDocument()', function(){
			equals(js.util.Type.isDocument(document.body), false, '');
			equals(js.util.Type.isDocument(document.documentElement), false, '');
			equals(js.util.Type.isDocument(document.body.parentNode.parentNode), true, '');
			equals(js.util.Type.isDocument(document.createElement('div')), false, '');
			equals(js.util.Type.isDocument(document), true, '');
			equals(js.util.Type.isDocument(document.createDocumentFragment()), false, '');
			
			var typeWin = document.getElementById('test-js-util-type-sub').contentWindow;
			var typeDoc = typeWin.document;
			typeDoc.write('js.util.Type test');
			typeDoc.close();
			
			equals(js.util.Type.isDocument(typeDoc), true, 'The document in another window(such as iframe, opened window etc.) should be the same type in the current window.');
		});
		
	}
	
	if (js.util.Type.isWindow) {
	
		test('js.util.Type.isWindow()', function(){
			equals(js.util.Type.isWindow(window), true, 'The window should be Window type.');
			
			var typeWin = document.getElementById('test-js-util-type-sub').contentWindow;
			var typeDoc = typeWin.document;
			typeDoc.write('js.util.Type test');
			typeDoc.close();
			
			equals(js.util.Type.isWindow(typeWin), true, 'The window in another window(such as iframe, opened window etc.) should be the same type in the current window.');
			//这里需要浏览器允许弹出窗口
			var win = window.open('about:blank');
			equals(js.util.Type.isWindow(win), true, 'The window in another window(such as iframe, opened window etc.) should be the same type in the current window.');
			win.close();
		});
		
	}
	
}