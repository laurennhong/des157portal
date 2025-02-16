(function(){
	
	"use strict";
	/* 
	This gets the player: gameData.players[gameData.index]
	This gets the first die: gameData.dice[gameData.roll1-1]
	This gets the second die: gameData.dice[gameData.roll2-1]
	This gets the score of the current player: gameData.score[gameData.index]
	*/
	
	const startGame = document.getElementById('startgame');
	const gameControl = document.getElementById('gamecontrol');
	const game = document.getElementById('game');
	const score = document.getElementById('score');
	const score2 = document.getElementById('score2');
	const actionArea = document.getElementById('actions');
	const girl1 = document.getElementById('girl1');
	const girl2 = document.getElementById('girl2');
	const winningmessage = document.getElementById('winningmessage');
	const volume = document.getElementById('volume');
	const volumeOff = document.getElementById('volumeOff');
	const creepysong = new Audio('sounds/creepysong.mp3');

	const gameData = {
		dice: ['images/1die.png', 'images/2die.png', 'images/3die.png', 
			   'images/4die.png', 'images/5die.png', 'images/6die.png'],
		players: ['Player 1', 'Player 2'],
		score: [0, 0],
		roll1: 0,
		roll2: 0,
		rollSum: 0,
		index: 0,
		gameEnd: 29
	};

	volume.addEventListener('click', function() {
		creepysong.play();
	})

	volumeOff.addEventListener('click', function() {
		creepysong.pause();
	})
	
	startGame.addEventListener('click', function () {
		gameData.index = Math.round(Math.random());
		console.log(gameData.index);

		gameControl.innerHTML = '<h2>The Game Has Started</h2>';
		gameControl.innerHTML += '<button id="quit">wanna quit?</button>';

		girl2.src="images/girl2On.png";
		girl1.src="images/girl1On.png";

		document.getElementById('quit').addEventListener('click', function () {
				location.reload();
			});
			if (gameData.index) {
				girl2.src="images/girl2On.png";
				girl1.src="images/girl1Off.png";
			}
			else {
				girl1.src="images/girl1On.png";
				girl2.src="images/girl2Off.png";
			} 

		setUpTurn();
	});

	function setUpTurn() {
		game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
		actionArea.innerHTML = '<button id="roll">ROLL THE DICE</button>';
		document.getElementById('roll').addEventListener('click', function(){

			throwDice();

		});
	}

	function throwDice(){
		actionArea.innerHTML = '';
		gameData.roll1 = Math.floor(Math.random() * 6) + 1; //using ceil could result in a zero
		gameData.roll2 = Math.floor(Math.random() * 6) + 1;
		game.innerHTML = `<p>Roll the dice for the ${gameData.players[gameData.index]}</p>`;
		game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}"> 
							<img src="${gameData.dice[gameData.roll2-1]}">`;
		gameData.rollSum = gameData.roll1 + gameData.roll2;

		// if two 1's are rolled...
		if( gameData.rollSum === 2 ){ 
			game.innerHTML += '<p>Oh snap! Snake eyes!</p>';
			gameData.score[gameData.index] = 0;
			//on and off player 1 and 2
			if (gameData.index) {
				girl2.src="images/girl2Off.png";
				girl1.src="images/girl1On.png";
			}
			else {
				girl1.src="images/girl1Off.png";
				girl2.src="images/girl2On.png";
			} 
			// player is switching
			gameData.index ? (gameData.index = 0) : (gameData.index = 1);
			showCurrentScore();
			setTimeout(setUpTurn, 1500);
		}

		// if either die is a 1...
		else if(gameData.roll1 === 1 || gameData.roll2 === 1){
			if (gameData.index) {
				girl2.src="images/girl2Off.png";
				girl1.src="images/girl1On.png";
			}
			else {
				girl1.src="images/girl1Off.png";
				girl2.src="images/girl2On.png";
			} 
			// player is switching
			gameData.index ? (gameData.index = 0) : (gameData.index = 1);
			game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to  ${
				gameData.players[gameData.index]
			}</p>`;
			setTimeout(setUpTurn, 2000);
		}

		// if neither die is a 1...
		else { 
			gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
			actionArea.innerHTML = '<button id="rollagain">ROLL AGAIN</button> or <button id="pass">PASS</button>';

			document.getElementById('rollagain').addEventListener('click', function () {
				//setUpTurn();
				throwDice();
			});

			document.getElementById('pass').addEventListener('click', function () {
				gameData.index ? (gameData.index = 0) : (gameData.index = 1);
				if (gameData.index) {
					girl2.src="images/girl2Off.png";
					girl1.src="images/girl1On.png";
				}
				else {
					girl1.src="images/girl1Off.png";
					girl2.src="images/girl2On.png";
				} 
				setUpTurn();
			});

			checkWinningCondition();
		}

	}

	function checkWinningCondition() {
		if (gameData.score[gameData.index] > gameData.gameEnd) {
			winningmessage.innerHTML = `<h2>${gameData.players[gameData.index]} 
			wins with ${gameData.score[gameData.index]} points!</h2>`;

			actionArea.innerHTML = '';
			document.getElementById('quit').innerHTML = 'Start a New Game?';
		} else {
			// show current score...
			showCurrentScore();
		}
	}

	function showCurrentScore() {
		score.innerHTML = `<p>${gameData.score[0]}</p>`;
		score2.innerHTML = `<p>${gameData.score[1]}</p>`;
	}
}());