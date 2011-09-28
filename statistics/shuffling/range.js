/*globals console */

var range = function (start, stop, increment) {
	var i, ret, reverse, temp;
	if (stop < start) {
		temp = start;
		start = stop;
		stop = temp;
		reverse = true;
	} else {
		reverse = false;
	}
	increment = Math.abs(increment || 1);
	ret = [];
	for (i = start; i< stop; i += increment) {
		ret.push(i);
	}
	if (reverse) {ret.reverse();}
	return ret;
};

console.log("range(0,5,1):", range(0, 5, 1));