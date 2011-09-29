/*globals console */

var range = function (start, stop, increment) {
	var i, ret, reverse, temp;
	increment = Math.abs(increment || 1);
	if (stop < start) {
		temp = start;
		start = stop+increment;
		stop = temp+increment;
		reverse = true;
	} else {
		reverse = false;
	}
	ret = [];
	for (i = start; i< stop; i += increment) {
		ret.push(i);
	}
	if (reverse) {ret.reverse();}
	return ret;
};

console.log("range(0,5,1):", range(0, 5, 1));
console.log("range(5,0,-1):", range(5, 0, -1));
console.log("range(1,6,2):", range(1, 6, 2));