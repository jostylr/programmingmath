/*globals $, $$ */

//purpose is to setup an easy to use enivronment for checking code running in designing pm posts
//load("fname", "description", [[args1], [args2], [args3], ...])
// Hello World
// Compact syntax: initializers are passed in the order M, V, C:

var fileContainer = $$({}, "<ul></ul>");
fileContainer.itemsToHide = [];


var load = function load (fname, args, description, argumentArr, active) {
	var topBlock, resultItem, i, n, result, arg, argJ, command, curArg, j, m; 
	topBlock = $$({fname: fname, desc: description, args:args}, 
		"<li><h4><span data-bind='fname'/>(<span class='normal' data-bind='args'/>)</h4><p data-bind='desc' /p></div><ul></li>",
		"& .normal {font-weight:normal} & h4 {margin:0} & p {margin:0} ",
		{
		'click h4' : function () {
			this.view.$('ul, p').toggle(); 
		}
	});
	if (!active) {
		fileContainer.itemsToHide.push(topBlock);
	}
	resultItem = $$({fname:fname}, "<li><span data-bind='fname'/>(<span data-bind='argsJSON'/>): <span data-bind='results'/></li>");
	n = argumentArr.length;
	for (i=0; i<n; i+=1) {
		arg = argumentArr[i];
	  argJ = [];
		m = arg.length;
		for (j=0; j<m; j+=1) {
			curArg = arg[j];
			if ( (typeof curArg === "string") && (curArg.slice(0,3) === "!# ")) {
				command = curArg.slice(3);
				argJ.push(command);
				arg[j] = eval(command);
			} else {
				argJ.push(JSON.stringify(curArg));
			}
		}
		result = window[fname].apply(null, arg);
		topBlock.append($$(resultItem, {argsJSON:argJ.join(','), results:result}), "ul");	
	}
	fileContainer.append(topBlock);
};


$(document).ready(function () {
	var i, n, toHide;
	$$.document.append(fileContainer);	
	toHide = fileContainer.itemsToHide;
	n = toHide.length;
	for (i=0; i<n; i += 1) {
		toHide[i].view.$('ul, p').hide(); 
	}
	
});
