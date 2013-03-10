if ('function' !== typeof Array.prototype.reduceRight) {
	Array.prototype.reduceRight = function(callback, opt_initialValue) {
		'use strict';
		if (null === this || 'undefined' === typeof this) {
			// At the moment all modern browsers, that support strict mode, have
			// native implementation of Array.prototype.reduceRight. For instance,
			// IE8 does not support strict mode, so this check is actually useless.
			throw new TypeError(
				'Array.prototype.reduceRight called on null or undefined');
		}
		if ('function' !== typeof callback) {
			throw new TypeError(callback + ' is not a function');
		}
		var length = this.length >>> 0, index = length - 1,
				value, isValueSet = false;
		if (1 < arguments.length) {
			value = opt_initialValue;
			isValueSet = true;
		}
		for ( ; -1 < index; --index) {
			if (!this.hasOwnProperty(index)) continue;
			if (isValueSet) {
				value = callback(value, this[index], index, this);
			} else {
				value = this[index];
				isValueSet = true;
			}
		}
		if (!isValueSet) {
			throw new TypeError('Reduce of empty array with no initial value');
		}
		return value;
	};
}
