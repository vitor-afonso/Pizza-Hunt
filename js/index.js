//jshint esversion:6
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let currentGame;
let highScore = 0;
let players = [];
let player;

let leonardo;
let donatello;
let rafaello;
let miguelAngelo;
let choosenTurtle = ""; //used to send src of image to set in the player

let sound;


function startSelectPlayers() {

  leonardo = new ChoosePlayer(150, 'leonardo', 100);
  players.push(leonardo);
  donatello = new ChoosePlayer(275, 'donatello', 225);
  players.push(donatello);
  rafaello = new ChoosePlayer(425, 'rafaello', 375);
  players.push(rafaello);
  miguelAngelo = new ChoosePlayer(550, 'miguel-angelo', 500);
  players.push(miguelAngelo);
  
  players.forEach(p => p.drawClickArea());

}

function handleEventListener(event) {
  // controlles the click on canvas when choosing player
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  let clickedPlayer = players.reduce((p,p2) => p2.playerClicked(x, y) ? p = p2 : p = p );

  canvas.classList.remove('canvas-donatello');
  canvas.classList.remove('canvas-rafaello');
  canvas.classList.remove('canvas-miguel-angelo');
  canvas.classList.remove('canvas-leonardo');

  if(clickedPlayer){
    
    canvas.classList.add(`canvas-${clickedPlayer.name}`);
    choosenTurtle = clickedPlayer.img.src;
  }

}

function startGame() {

  currentGame = new Game();
  sound = new Sounds();
  player = new Player(choosenTurtle);
  canvas.removeEventListener("click",handleEventListener);
  document.querySelector('#btn-start').classList.toggle('hide-btn');
  document.querySelector('#btn-restart').classList.toggle('hide-btn');
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

  startSelectPlayers();
  
  canvas.addEventListener('click', handleEventListener);

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



