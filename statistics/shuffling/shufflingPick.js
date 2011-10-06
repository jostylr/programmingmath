/*globals console, pickRange, range, load */


var shufflePick = function (toRandomize, clone) {
	var i, j, n, ret, temp;
	if (clone) {
		ret = [];
		for (i = 0; i < n; i+=1) {
			ret[i] = toRandomize[i];
		} 
	} else {
		ret = toRandomize;
	}
	n = toRandomize.length;
	for (i = 0; i < n; i+=1) {
		j = pickRange(i, n);
		temp = ret[i];
		ret[i] = ret[j];
		ret[j] = temp;
	}
	return ret;
};

load("shufflePick", "toRandomize, clone",
"array toRandomize is shuffled using Fisher-Yates. If clone, then a new array is returned; otherwise toRandomize is changed and returned.", 
[
	[[0, 1, 2, 3, 4, 5]],
	["!# range(0, 52, 1)"]
], false);
