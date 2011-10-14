/*globals load, permuteIter, console, range */

var transpose = function (arr, i) {
	var temp;
	if (i >= arr.length) {
		return;
	} 
	if (i > 0) {
		temp = arr[i];
		arr[i] = arr[i-1];
		arr[i-1] = temp;
	}
	return arr;
};

//populates an array with given vale
var zeroArray = function (n, value) {
	var arr =[], i; 
	for (i =0; i<n; i+=1) {
		arr[i] = value;
	}
	return arr;
};

//[0, 3, 4], max=4 becomes [0, 4, 0];
var increment = function (arr, max) {
	var notDone = true, i = arr.length-1;
	while (notDone) {
		if (i <0) {
			return false;
		}
		arr[i] += 1; 
		
		if (arr[i] > max) {
			arr[i] = 0; 
			i -= 1; 
		} else {
			notDone = false; 
		}
	}
};

var laddersCount = function (numLabels, numRows) {
	var i, count = {}, rungMax, rows, arr, j;
	var permutations = range(0,numLabels); 
	var perm = permuteIter(permutations);
	count[JSON.stringify(permutations)] = 0;
	while (perm()) {
		count[JSON.stringify(permutations)] = 0; 
	}
	// r^(n) each row has n labels. last label is idempotent
	rungMax = Math.pow(numLabels, numRows);
	rows = zeroArray(numRows, 0);
	//add 1 to no ordering; 
	//count[JSON.stringify(range(0,numLabels))] = 1; 
	for (i = 0; i < rungMax; i+=1) {
		increment(rows, numLabels-1); 
		arr = range(0,numLabels);
	  for (j = 0; j<numRows; j+=1) {
			transpose(arr, rows[j]);
		}
		count[JSON.stringify(arr)] += 1; 
	}

	return JSON.stringify(count); 
};

load("laddersCount", "numLabels, numRungs",
	"Frequency counting of permutations given ladder setup.", 
	[
	[3, 4],
	[4,1],
	[4,2],
	[4,3],
	[4,4],
	[4,5],
	[4,6],
	[4,7]
	], false
);
	
var laddersProb = function (numLabels, numRows)	{
	var count = JSON.parse(laddersCount(numLabels, numRows));
	var perm; 
	var prob = [];
	var rungMax = Math.pow(numLabels, numRows);
	for (perm in count) {
		prob.push((count[perm]/rungMax*100).toFixed(2));
	}
	return JSON.stringify(prob); 
};
	 
load("laddersProb", "numLabels, numRungs",
	"Frequency counting of permutations given ladder setup.", 
	[
	[3,2],
	[3, 4],
	[3,6],
	[3,8],
	[3,10],
	[3,12],
	[4,1],
	[4,2],
	[4,3],
	[4,5],
	[4,8], 
	[4,9],
	[4,10],
	], true
);
