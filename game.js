var start = 0;
var score = 0;
var output;
var toggle = 0;
var tile = 0;
var finished = 0;
var blackTiles = [];
var totalNumberOfTiles;
var audio = new Audio('hit.ogg');
var input = 30;

function getInput(){
	input = prompt("What should be the time limit in seconds?");
	input = parseInt(input,10);
}

function failed(){
	if (finished == 0) {
		score = 0;
		document.getElementById('score').innerHTML = "Score: " + score;
		alert('You failed.');
		var tiles = document.getElementsByClassName('tile');
		for(var i = 0; i < tiles.length; i++){
			tiles[i].style.backgroundColor = "white";
		}	
		toggle = 0;
		blackTiles = [];
		finished = 1;
		start = 0;
	}
	else {
		done();
	}
}

function done(){
	if (finished == 0) {
		score = 0;
		document.getElementById('score').innerHTML = "Score: " + score;
		alert('Times up!');
		var tiles = document.getElementsByClassName('tile');
		for(var i = 0; i < tiles.length; i++){
			tiles[i].style.backgroundColor = "white";
		}
		toggle = 0;
		blackTiles = [];
		finished = 1;
		start = 0;
	}
	else {
		failed();
	}
}

function timer(){
	document.getElementById('time').innerHTML = "Time limit: " + input + " seconds";
	setTimeout(done,input*1000);
}

function randomizer(){
	if (start == 0){
		console.log("Start");
		toggle = 1;
		finished = 0;
		start = 1;

		totalNumberOfTiles = document.getElementsByClassName("tile").length
		for(var i = 0; i < totalNumberOfTiles; i++){
			document.getElementsByClassName("tile")[i].addEventListener("click", clickTile);
		}	

		console.log("Start");

		generateBlackTile();
		generateBlackTile();
		generateBlackTile();

		timer();
	}
}

function generateBlackTile(){
	var isBlackTile = false;
	var randNumber;

	do {
		randNumber = generateRandomInteger(16,0);
		isBlackTile = boolSearchArray(randNumber, blackTiles);
		console.log(randNumber);
		console.log(blackTiles);
		console.log(isBlackTile);
	} while(isBlackTile == true);

	blackTiles.push(randNumber);
	document.getElementsByClassName('tile')[randNumber].style.backgroundColor = "black";
}

function generateRandomInteger(min, max){
	return Math.floor(Math.random()*(max-min)) + min;
}

function boolSearchArray(item, searchArray){
	for(var i = 0; i < searchArray.length; i++){
		if (searchArray[i] == item){return true;}
	}
	return false;
}

function clickTile(event){
	if(toggle == 1){
		var tileIndex = -1;

		for(var i = 0; i < totalNumberOfTiles; i++){
			if(document.getElementsByClassName(event.target.className)[i] === event.target){
				tileIndex = i;
				break;
			}
		}

		if (blackTiles.includes(tileIndex) == true){
			document.getElementsByClassName('tile')[tileIndex].style.backgroundColor = "white";

			score++;

			document.getElementById('score').innerHTML = "Score: " + score;

			generateBlackTile();

			blackTiles.splice(blackTiles.indexOf(tileIndex),1);	
			audio.play();
		}
		else {
			failed();
		}
	}
	else {
		alert("Please start the game first.");
	}
}