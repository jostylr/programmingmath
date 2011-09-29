/*globals console, range*/

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

console.log("shuffleSort (0 to 5):" +shuffleSort([0, 1, 2, 3, 4, 5]));

console.log("shuffleSort (cards):"+ shuffleSort(range(0, 52, 1)));