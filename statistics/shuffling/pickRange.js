/*globals console */ 
// returns a ranomd value between start and stop (not including stop) 
var pickRange = function (start, stop) {
	return Math.floor(Math.random()*(stop-start) + start);
};

(function () {
	var i, ret;
	ret =[]; 
	for ( i=0; i<40; i += 1) {
		ret.push(pickRange(2,10));
	}
	console.log("random ints between 2 and 9:", "pickRange(2,10)", ret);
}());