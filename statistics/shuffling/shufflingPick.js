/*globals console, pickRange, range */


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

console.log("shufflePick (0 to 5):" +shufflePick([0, 1, 2, 3, 4, 5]));
                    
console.log("shufflePick (cards):"+ shufflePick(range(0, 52, 1)));