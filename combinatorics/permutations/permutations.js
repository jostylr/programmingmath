// permuteIter creates a function that will yield permutations of a list object
// It modifies the list directly. It returns true if still producing
// compare is what defines the relation between values in the list
// swap implements the exchange of two elements
var permuteIter = function(list, compare, swap) {
    //install defaults if needed
    compare = compare ||
    function(list, i, j) {
        return (list[i] <= list[j]);
    };

    swap = swap ||
    function(list, i, j) {
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    };

    //to be returned
    var permuter = function() {
        var newkey = key = list.length - 1;
        // The key value is the first value from the end which
        // is smaller than the value to its immediate right    
        while ((key > 0) && compare(list, key, key - 1)) {
            key -= 1;
        }

        key -= 1;

        // If key < 0 the data is in reverse sorted order, 
        // which is the last permutation.                         
        if (key < 0) return false;

        // list[key+1] is greater than list[key] because of how key 
        // was found. If no other in tail is greater, list[key+1] is used  
        newkey = list.length - 1;
        while ((newkey > key) && compare(list, newkey, key)) {
            newkey -= 1;
        }

        swap(list, key, newkey);

        //sort post key by looping through and swapping towards the center
        //note list was already sorted so this is not a normal sort.
        var upper = list.length - 1;
        var lower = key + 1;

        while (upper > lower) {
            swap(list, upper, lower);
            lower += 1;
            upper -= 1;
        }

        return list;
    };

    return permuter;

};

/*
var arr = [0, 0, 0, 1, 2, 3];

var perm = permuteIter(arr); 

// count the original list
var count = 1;
console.log(arr); 
while (perm()) {
    count += 1;
   console.log(arr);  
}
console.log(count);
*/


var permSetup = function(N, out) {
    out = out ||
    function(arr) {
        console.log(JSON.stringify(arr));
    }
    var visit = function me(k) {
        me.level += 1;
        var val = me.value; 
        val[k] = me.level;
        if (me.level === N) {
            out(val.slice());
        } else {
            for (var i = 0; i < N; i += 1) {
                if (val[i] === 0) {
                    me(i);
                }
            }
        }
        me.level = me.level - 1;
        val[k] = 0;
    }
    visit.level = -1;
    var arr = [];
    for (var i = 0; i < N; i += 1) {
        arr[i] = 0;
    }
    visit.value = arr;
    return visit; 
};

/*
count = 0; 

var permer = permSetup(10, function () {
    count += 1;
}); 

permer();
*/