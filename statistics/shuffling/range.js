/*globals load */

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

load("range", "start,stop,increment",
"Produces an array of numbers from start to stop with all incrementing in between. Stop excluded.",
[[0,5,1],
[5,0,-1],
[1,6,2]
], false
);

