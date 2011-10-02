/*global Math, console, pochisq */

var rnd = function (min, max) {
  var interval = max - min;
  var r = Math.random() * interval + min;
  return Math.round(r);
};

var numcategories = 6;

console.log(rnd(1, 6));

var data = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 5, 6];

//[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6];
//[1, 4, 5, 3, 2, 5, 6, 3, 4, 2, 3, 2, 5, 4, 1, 4, 3, 6];
var dl = data.length;

console.log(dl);

var expected = {
  "1": dl / 6,
  "2": dl / 6,
  "3": dl / 6,
  "4": dl / 6,
  "5": dl / 6,
  "6": dl / 6
};

console.log(JSON.stringify(expected));


var countFreq = function (values, freq) {
  if (freq) {
    freq = JSON.parse(JSON.stringify(freq));
  } else {
    freq = {};
  }
  var n = values.length;
  var val;
  var i;
  for (i = 0; i < n; i += 1) {
    val = values[i];
    if (freq.hasOwnProperty(val)) {
      freq[val] += 1;
    } else {
      freq[val] = 1;
    }
  }
  return freq;
};

var baseFreq = {
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0,
  "5": 0,
  "6": 0
};

var dataCount = countFreq(data);

console.log(JSON.stringify(dataCount));

var chisq = function (obsA, expA, term, sum, result) {
  var val;
  for (val in expA) {
    result = sum(term(obsA[val], expA[val]), result);
  }
  return result;
};

var tchi = function (obs, exp) {
  obs = obs || 0;
  return (obs - exp) * (obs - exp) / exp;
};

var sum = function (left, right) {
  return left + right;
};

var cs = chisq(dataCount, expected, tchi, sum, 0);

var p = pochisq(cs, numcategories - 1);

console.log(cs, p);

//generates equally distributed data from 0 to number, length samplesize
var simulateEq = function (min, max, samplesize) {
  var simData = [];
  var i;
  for (i = 0; i < samplesize; i += 1) {
    simData.push(rnd(min, max));
  }
  return simData;
};



var simulate = function (categories, samplesize) {
  //categories: [ [val, prob], ...}
  //create the limits where random number falls. 
  var i = 0;
  var n = categories.length;
  var sum = 0;
  for (i = 0; i < n; i += 1) {
    sum += categories[i][1];
  }
  var catNorm = [];
  var runningTotal = 0;
  for (i = 0; i < n; i += 1) {
    //val, prob
    catNorm[i] = [categories[i][0], runningTotal + categories[i][1] / sum];
    runningTotal = catNorm[i][1];
  }
  var simulatedData = [];
  //generate an array of random numbers
  //then sort them and we can fill in the frequencies from that
  var rndA = [];
  for (i = 0; i < samplesize; i += 1) {
    rndA.push([Math.random(), i]);
  }
  rndA.sort(function (a, b) {
    return a[0] - b[0];
  });
  var curLimitLocation = 0;
  var curProb = catNorm[curLimitLocation][1];
  var curVal = catNorm[curLimitLocation][0];
  for (i = 0; i < samplesize; i += 1) {
    //assigning value to 3 element
    if (rndA[i][0] < curProb) {
      rndA[i][2] = curVal;
    } else {
      curLimitLocation += 1;
      if (curLimitLocation >= catNorm.length) {
        console.log("error in simulate", i);
        break;
      }
      curProb = catNorm[curLimitLocation][1];
      curVal = catNorm[curLimitLocation][0];
      i -= 1;
    }
  }
  //return to original order
  rndA.sort(function (a, b) {
    return a[1] - b[1];
  });
  //make an array of the values only
  var ret = [];
  for (i = 0; i < samplesize; i += 1) {
    ret.push(rndA[i][2]);
  }
  return ret;
};

var scaleToExpected = function (prob, size) {
  var i = 0;
  var n = prob.length;
  var sum = 0;
  for (i = 0; i < n; i += 1) {
    sum += prob[i][1];
  }
  var freq = {};
  var normConst = size / sum;
  for (i = 0; i < n; i += 1) {
    freq[prob[i][0]] = prob[i][1] * size / sum;
  }
  return freq;
};

var mainSampleSize = 10;

var badDiceProb = [[1, 1], [2, 1.5], [3, 0.5], [4, 1], [5, 2], [6, 0.1]];

var bDExp = scaleToExpected(badDiceProb, mainSampleSize);

var goodDiceProb = [[1, 1 / 6], [2, 1 / 6], [3, 1 / 6], [4, 1 / 6], [5, 1 / 6], [6, 1 / 6]];

var goodExp = scaleToExpected(goodDiceProb, mainSampleSize);

var bDFreq = countFreq(simulate(badDiceProb, mainSampleSize), baseFreq);


var csB = chisq(bDFreq, bDExp, tchi, sum, 0);
var pB = pochisq(csB, numcategories - 1);
console.log(csB, pB);


var csG = chisq(bDFreq, goodExp, tchi, sum, 0);
var pG = pochisq(csG, numcategories - 1);
console.log(csG, pG);


var countAbove = 0;
var lcs = 0;
var lf = {};

var i;
var trials = 1000; 
for (i = 0; i < trials; i += 1) {
  lf = countFreq(simulate(goodDiceProb, mainSampleSize), baseFreq);
//  console.log(JSON.stringify(lf));
  lcs = chisq(lf, goodExp, tchi, sum, 0);
//  console.log(lcs, cs);
  if (lcs > csG) {
    countAbove += 1;
  }
}

console.log(countAbove/trials);
