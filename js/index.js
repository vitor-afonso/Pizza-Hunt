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

    updateCanvas();

  } else {

    alert('Please select your player.');
  }
}

function clearCanvas() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

function updateScore(){
  currentGame.score++;
}

function updateScreenScore(playerHealth) {

  ctx.font = '30px serif';
  ctx.fillStyle = '#FFF';
  ctx.fillText('Health: ' + playerHealth, 10, 50);
  ctx.fillText('Pizza score: ' + currentGame.score, 10, 80);
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

  if (player.health < 1) {

    gameOver();
    
  } else {

    updateScreenScore(player.health);
    
    currentGame.animationFrameId = requestAnimationFrame(updateCanvas);
  }
}

function gameOver() {

  updateScreenScore('0');
  currentGame.drawGameOver();
  // cancelAnimationFrame(currentGame.animationFrameId);
  document.querySelector('body').classList.remove('start-game');
  document.querySelector('body').classList.add('game-over');
  
}

function restartGame() {
  
  location.reload();
}

window.onload = () => {

  document.querySelector('body').classList.add('start');

  startSelectPlayers();
  
  canvas.addEventListener('click', (event) => {

    // controlles the click on canvas when choosing player
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if(leonardo.playerClicked(x, y)) {
      
      
      if (canvas.classList.contains('canvas-donatello') || canvas.classList.contains('canvas-rafaello') || canvas.classList.contains('canvas-miguel-angelo')) {
        
        canvas.classList.remove('canvas-donatello');
        canvas.classList.remove('canvas-rafaello');
        canvas.classList.remove('canvas-miguel-angelo');
        canvas.classList.add('canvas-leonardo');
      } else {
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
      } else {
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

      } else {
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

      } else {
        canvas.classList.add('canvas-miguel-angelo');
      }
      choosenTurtle = '../images/miguel-angelo.png';
    }
    
  });

  document.querySelector('#btn-start').onclick = () => {

    startGame();
    
  };
  document.querySelector('#btn-restart').onclick = () => {

    restartGame();
    
  };

};

window.addEventListener('keydown', (event) => {
  player.moveKey(event);
});



