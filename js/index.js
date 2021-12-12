//jshint esversion:6
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let currentGame;
let highScore = 0;
let player;
let leonardo;
let donatello;
let rafaello;
let miguelAngelo;
let choosenTurtle = ""; //used to send src of image to set in the player


function startSelectPlayers() {

  leonardo = new ChoosePlayer(150, 'images/leonardo.png', 100);

  donatello = new ChoosePlayer(275, 'images/donatello.png', 225);

  rafaello = new ChoosePlayer(425, 'images/rafaello.png', 375);

  miguelAngelo = new ChoosePlayer(550, 'images/miguel-angelo.png', 500);

  leonardo.drawClickArea();
  donatello.drawClickArea();
  rafaello.drawClickArea();
  miguelAngelo.drawClickArea();
}

function startGame() {

  
  if (choosenTurtle){

    currentGame = new Game();
    player = new Player(choosenTurtle);
    document.querySelector('#btn-start').classList.toggle('hide-btn');
    document.querySelector('#btn-restart').classList.toggle('hide-btn');
    canvas.classList.add('canvas-background');
    document.querySelector('#player-health').innerHTML = 'Health: ' + player.health;
    document.querySelector('#player-highscore').innerHTML = 'Pizza score: ' + currentGame.score;
    updateCanvas();

  } else {
    alert('Please select your player.');
  }
}
function restartGame() {
  
  location.reload();
}

function clearCanvas() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
function updateScore(){
  currentGame.score++;
  document.querySelector('#player-highscore').innerHTML = 'Pizza score: ' + currentGame.score;
}

function updateCanvas() {

  clearCanvas();
  let currentObstacle;
  currentGame.obstaclesFrequency++;

  // push a new obstacle if the obstacleNumber is divisible by 50
  if (currentGame.obstaclesFrequency % 25 === 0 && currentGame.obstacles.length <= currentGame.numberOfObstacles) {

    //Assign my new obstacle to my obstaclesArray
    currentObstacle = new Obstacles(Math.random() * canvas.width - 20, Math.floor(Math.random() * -35), currentGame.isGood[Math.floor(Math.random() * 2)]);
    currentGame.obstacles.push(currentObstacle);
  }
  
  currentGame.obstacles.forEach((item, i) => {
      
    item.drawObstacle();
    player.detectCollision(item, i);
  });

  player.drawPlayer();
  
  currentGame.animationFrameId = requestAnimationFrame(updateCanvas);

  if (player.health < 1) {

    
    document.querySelector('#player-health').innerHTML = 'Health: ' + 0;
    if (currentGame.score === 1) {

      document.querySelector('#player-highscore').innerHTML = 'You managed to catch ' + currentGame.score + ' pizza.';

    } else {

      document.querySelector('#player-highscore').innerHTML = 'You managed to catch ' + currentGame.score + ' pizzas.';
    gameOver();
    }
    
  }

}

function gameOver() {
  
  currentGame.drawGameOver();
  cancelAnimationFrame(currentGame.animationFrameId);
  document.querySelector('body').classList.remove('start-game');
  document.querySelector('body').classList.add('game-over');
  
}


window.onload = () => {

  document.querySelector('body').classList.add('start');
  startSelectPlayers();
  
  canvas.addEventListener('click', (event) => {

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if(leonardo.playerClicked(x, y)) {
      
      
      if (canvas.classList.contains('canvas-donatello') || canvas.classList.contains('canvas-rafaello') || canvas.classList.contains('canvas-miguel-angelo')) {
        
        canvas.classList.remove('canvas-donatello');
        canvas.classList.remove('canvas-rafaello');
        canvas.classList.remove('canvas-miguel-angelo');
        canvas.classList.add('canvas-leonardo');
      }
      choosenTurtle = 'images/leonardo.png';
    }
    if (donatello.playerClicked(x, y)) {
      if (canvas.classList.contains('canvas-leonardo') || canvas.classList.contains('canvas-rafaello') || canvas.classList.contains('canvas-miguel-angelo')) {
        
        canvas.classList.remove('canvas-leonardo');
        canvas.classList.remove('canvas-rafaello');
        canvas.classList.remove('canvas-miguel-angelo');
        canvas.classList.add('canvas-donatello');
      }
      choosenTurtle = '../images/donatello.png';
    }
    if (rafaello.playerClicked(x, y)) {
      if (canvas.classList.contains('canvas-donatello') || canvas.classList.contains('canvas-leonardo') || canvas.classList.contains('canvas-miguel-angelo')) {
        
        canvas.classList.remove('canvas-donatello');
        canvas.classList.remove('canvas-leonardo');
        canvas.classList.remove('canvas-miguel-angelo');
        canvas.classList.add('canvas-rafaello');
      }
      choosenTurtle = '../images/rafaello.png';
    }
    if (miguelAngelo.playerClicked(x, y)) {
      if (canvas.classList.contains('canvas-donatello') || canvas.classList.contains('canvas-rafaello') || canvas.classList.contains('canvas-leonardo')) {
        
        canvas.classList.remove('canvas-donatello');
        canvas.classList.remove('canvas-rafaello');
        canvas.classList.remove('canvas-leonardo');
        canvas.classList.add('canvas-miguel-angelo');
      }
      choosenTurtle = '../images/miguel-angelo.png';
    }
    
  });

  document.querySelector('#btn-start').onclick = () => {

    startGame();
    
  };

};

window.addEventListener('keydown', (event) => {
    player.moveKey(event);
});

document.querySelector('#btn-restart').addEventListener('click', restartGame);


