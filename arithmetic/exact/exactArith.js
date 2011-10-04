/*globals load */

//define new object of type Exact
//idea is integer+num/den where each of them represents a number in base 1 million  
var Exact = function (integer, numerator, denominator) {
	this.integer = this.chunk(integer) || [0];
	this.numerator = this.chunk(numerator) || [0];
	this.denominator = this.chunk(denominator) || [1];
	
	return this;
}; 

Exact.prototype.base = 1E6; 

Exact.prototype.stringifyNum = function (num, separator) {
	var i, n, tempstr, partstr; 
	console.log(num, separator)
	n = num.length-1;
	tempstr = ''+num[0]; 
	//padding with zeros
	if (num.length > 1) {
		while (tempstr.length < 6) {
			tempstr = '0'+tempstr; 
		}
	} 
	//note last one is not done in loop
	for (i = 1; i <n; i+= 1) {
		partstr = num[i];
		while (partstr.length < 6) {
			partstr = '0'+partstr; 
		}		
		tempstr = partstr +separator + tempstr;
	}
	console.log(partstr, tempstr);
	
	if (num.length >1) {
		tempstr = num[n] + separator + tempstr;			
	}
	return tempstr; 
};

Exact.prototype.display = function (separator) {
	var ret; 
	if (separator === undefined) { //can't do || shortcut because '' is possible
		separator = ',';
	}
	ret = this.stringifyNum(this.integer, separator); 
	ret = ret + ' '+ this.stringifyNum(this.numerator, separator);  
	ret = ret + ' / '+ this.stringifyNum(this.denominator, separator);  
	return ret; 
};

Exact.prototype.chunk = function (number) {
	//divide into units of base. 
	var sign, ret;
	if (number < 0) {
		sign = '-';
		number = Math.abs(number); 
	}
	ret = [];
	while (number >0) {
		ret.push(number % this.base);
		number = Math.floor(number / this.base);
	}
	if (sign === '-') {
		ret[ret.length-1] *= -1;
	}
	return ret;
};

var exactNumber = function (inte, num, den) {
	var n = new Exact (inte, num, den);
	return n.display(',');
};

load("exactNumber", "num", 
"wrapper for making an exact number to display. Use new Exact (num) in code.",
[[1e7, 3, 4], 
[103e9, 3654321, 46373]
], true
);

Exact.prototype.add = function () {
	
	return new Exact (); 
};

var addExact = function (a, b) {
	return a.add(b);
};

load("addExact", "a, b", 
"wrapper for adding two exact numbers. Use a.add(b) instead",
[[new Exact(500), new Exact(1e7, 3, 4)] //10 mill.75 + 500 
], true
); 