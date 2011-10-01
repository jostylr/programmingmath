/*globals console, range, load*/

var shuffleSort = function(toRandomize, clone) {
	var i, ordering, n, arr;
	ordering = [];
	n = toRandomize.length;
	//make an array of random numbers as sorting criteria
	for (i = 0; i < n; i += 1) {
	    ordering[i] = Math.random();
	}
	//create an array of to be randomized positions
	arr = range(0,n);
	//randomize those positions
	arr.sort(function(a, b) {
	    return ordering[a] - ordering[b];
	});
	//make arr into the randomized list of to randomize
	for (i = 0; i<n; i+=1) {
		arr[i] = toRandomize[arr[i]];
	}
	//clone toRandomize entries if requested
	if (!clone) {
		for (i = 0; i<n; i+=1) {
			toRandomize[i] = arr[i];
		}
		return toRandomize;
	}	
	return arr;
};


load("shuffleSort", "toRandomize, clone",
"array toRandomize is shuffled by sorting using an array of random numbers. If clone, then a new array is returned; otherwise toRandomize is changed and returned.", 
[
	[[0, 1, 2, 3, 4, 5]],
	["!# range(0, 52, 1)"]
], false);
