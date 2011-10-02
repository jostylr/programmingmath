/*globals load */ 
// returns a ranomd value between start and stop (not including stop) 
var pickRange = function (start, stop) {
	return Math.floor(Math.random()*(stop-start) + start);
};

load("pickRange", "start, stop",
"pickRange is a function that takes in two numbers and selects integers in between them.",
[
[2,10],
[5, 8]
], false);

var pickArray = function (start, stop, n) {
	var i, ret;
	ret =[]; 
	for ( i=0; i<n; i += 1) {
		ret.push(pickRange(start,stop));
	}
	return ret;
};

load("pickArray", "start, stop, n",
"Makes an array of length n of random integers between start and stop using pickRange.",
[
[2,10, 20],
[5, 8, 3]
],false);