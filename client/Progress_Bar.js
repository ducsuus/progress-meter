/*function addDivs(){

	var inputstring = window.prompt("How many stages?","0");
	var input = parseInt(inputstring);
	var elementWidth = document.getElementById('progressdiv').offsetWidth;
	console.log(input)
	var distance = elementWidth/input; //Distance between divs
	console.log(distance);
	var count = 0;

	var stageHTML = '';

	while (count < input) {
		var container = document.getElementById('progressdiv');
		stageHTML = '<div id="progressbar"></div><div class="progresscircle" id="progresscircle' + count + '" style="right:' + distance*count + 'px;"></div>';
		container.innerHTML = stageHTML;
		console.log(count);
		count + 1;
	} 

} */

function addDivs(){

	var inputstring = window.prompt("How many stages?","0");
	var divCount = parseInt(inputstring);
	var elementWidth = document.getElementById('progressdiv').offsetWidth;
	var distance = elementWidth/divCount; //Distance between stages

	console.log(elementWidth)

	var container = document.getElementById('progressdiv');

	var divHtml = '<div id="progressbar"><div class="progresscircle" style="right:' + elementWidth + ';"></div></div>';

	var i = 0;

	while(i < divCount){
		divHtml += '<div class="progresscircle" id="progresscircle' + i + '" style="right:' + (distance*i) + 'px;"></div>';
		container.innerHTML = divHtml;
		console.log(i);
		i++;
	}
}