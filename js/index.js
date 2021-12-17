//jshint esversion:6
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let currentGame;
let highScore = 0;
let player;
//used to send src of image to set in creation of player
let choosenTurtle = ""; 

function setTurtleSrc(turtleId, turtleSrc) {

  canvas.classList.remove('canvas-donatello');
  canvas.classList.remove('canvas-rafaello');
  canvas.classList.remove('canvas-miguel-angelo');
  canvas.classList.remove('canvas-leonardo');

  if(turtleId, turtleSrc){
    
    canvas.classList.add(`canvas-${turtleId}`);
    choosenTurtle = turtleSrc;
  }
}

function startGame() {

  
  player = new Player(choosenTurtle);
  document.querySelector('#btn-start').classList.toggle('hide-btn');
  document.querySelector('#btn-restart').classList.toggle('hide-btn');
  document.querySelector('#player-select').style.display = 'none';
  canvas.classList.add('canvas-background');

  currentGame.gameStart.volume = 0.3;
  currentGame.shredderHit.volume = 1;
  currentGame.gameOver.volume = 0.3;
  currentGame.pizzaHit.volume = 0.5;
  currentGame.gameStart.play();
  
  updateCanvas();
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
    currentGame.gameStart.pause();
    currentGame.gameOver.play();
    gameOver();
    cancelAnimationFrame(currentGame.animationFrameId);
    
  } else {

    updateScreenScore(player.health);
    
    currentGame.animationFrameId = requestAnimationFrame(updateCanvas);
  }
}

function gameOver() {

  updateScreenScore('0');
  currentGame.drawGameOver();
  
  document.querySelector('body').classList.remove('start-game');
  document.querySelector('body').classList.add('game-over');
}

function restartGame() {
  
  location.reload();
}

window.onload = () => {

  document.querySelector('body').classList.add('start');

  document.querySelectorAll('.turtles > img').forEach(turtle => {

    turtle.onclick = () => {
      setTurtleSrc(turtle.id, turtle.src);
    };
  });
  currentGame = new Game();
  currentGame.drawSelectTurtle();
  
  document.querySelector('#btn-start').onclick = () => {

    if (choosenTurtle) {

      startGame();

    } else {

      alert('Please select your player.');
    }
  };

  document.querySelector('#btn-restart').onclick = () => {

    restartGame();
  };
};

window.addEventListener('keydown', (event) => {
  player.moveKey(event);
});



