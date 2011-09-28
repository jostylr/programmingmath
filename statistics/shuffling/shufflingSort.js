var shuffleSort = function(toRandomize, overwrite) {
	var i, ordering, n, arr;
	ordering = [];
	n = toRandomize.length;
	//make an array of random numbers as sorting criteria
	for (i = 0; i < n; i += 1) {
	    ordering[i] = Math.random();
	}
	//create an array of to be randomized positions
	arr = _.range(0,n);
	//randomize those positions
	arr.sort(function(a, b) {
	    return ordering[a] - ordering[b];
	});
	//make arr into the randomized list of to randomize
	for (i = 0; i<n; i+=1) {
		arr[i] = toRandomize[arr[i]];
	}
	//overwrite toRandomize entries if requested
	if (overwrite) {
		for (i = 0; i<n; i+=1) {
			toRandomize[i] = arr[i];
		}
	}	
	return arr;
};