//jshint esversion:6
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let currentGame;
let highScore = 0;
let player;

function startGame() {

  currentGame = new Game();
  player = new Player();
  document.querySelector('#btn-start').classList.toggle('hide-btn');
  document.querySelector('#btn-restart').classList.toggle('hide-btn');
  document.querySelector('#player-health').innerHTML = 'Health: ' + player.health;
  document.querySelector('#player-highscore').innerHTML = 'Current score: ' + currentGame.score;

  updateCanvas();
}
function restartGame() {
  
  location.reload();
}

function clearCanvas() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function updateCanvas() {

  
  clearCanvas();
  let currentObstacle;
  currentGame.obstaclesFrequency++;

  // updates de score/seconds to later use to update the highscore
  if (currentGame.obstaclesFrequency % 140 === 0) {

    currentGame.score++;
    document.querySelector('#player-highscore').innerHTML = 'Current score: ' + currentGame.score;
  
  }
  // push a new obstacle if the obstacleNumber is divisible by 5
  if (currentGame.obstaclesFrequency % 5 === 0 && currentGame.obstacles.length <= currentGame.numberOfObstacles) {

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

    // display higscore
    document.querySelector('#player-health').innerHTML = 'Health: ' + 0;
    document.querySelector('#player-highscore').innerHTML = 'Your final score was: ' + currentGame.score;
    gameOver();
  }

}

function gameOver() {
  
  currentGame.drawGameOver();
  cancelAnimationFrame(currentGame.animationFrameId);
  
}


window.onload = () => {
  document.querySelector('#btn-start').onclick = () => {
  
    startGame();
    
  };
};

window.addEventListener('keydown', (event) => {
    player.moveKey(event);
});

document.querySelector('#btn-restart').addEventListener('click', restartGame);