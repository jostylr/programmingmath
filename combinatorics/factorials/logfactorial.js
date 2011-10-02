/*globals load */

var logFactorial = function () {
	
};

load("logFactorial", "n",
"Computes the log of the factorial up to n using the fact that ln(n!) = sum_i=0^n (ln i)",
[ [1],
[10],
[50],
[100],
[-1],
[0.23],
["a"]
]
);