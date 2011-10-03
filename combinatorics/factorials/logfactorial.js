/*globals load */

var logFactorial = function (n) {
	var i, m, logf; 
	logf= Math.log(n);
	m = n+1;
	for (i=n-1; i>0; i-=1) {
		logf += Math.log(i);
	}
	return [Math.exp(logf%Math.LN10).toFixed(1)+"E"+Math.floor(logf/Math.LN10), logf, logf/Math.LN10];
};

load("logFactorial", "n",
"Computes the log of the factorial up to n using the fact that ln(n!) = sum_i=1^n (ln i). Returns (n!, ln n!, log_10 n!)",
[ [1],
[10],
[50],
[100],
[500],
[1000],
[2000],
[10000],
[100000],
[1000000],
[-1],
[0.23],
["a"]
], true
);