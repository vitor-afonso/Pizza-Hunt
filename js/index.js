//jshint esversion:6
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let currentGame;
let player;

function clearCanvas() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function updateCanvas() {

    clearCanvas();
    
    let currentObstacle;
    currentGame.obstaclesFrequency++;

    // push a new obstacle if the obstacleNumber is divisible by 200
    if (currentGame.obstaclesFrequency % 50 === 0 && currentGame.obstacles.length < 6) {

        //Assign my new obstacle to my obstaclesArray
        currentObstacle = new Obstacles(Math.random() * canvas.width - 20, Math.floor(Math.random() * -35), currentGame.isGood[Math.floor(Math.random() * 2)]);
        currentGame.obstacles.push(currentObstacle);

    }
    
    currentGame.obstacles.forEach((item, i) => {
        
        item.drawObstacle();
        player.detectCollision(item, i);
    });

    player.drawPlayer();
    
    let animationFrameId = requestAnimationFrame(updateCanvas);

  if (player.health < 1) {
      
    cancelAnimationFrame(animationFrameId);
  }

}

window.onload = () => {
    document.querySelector('#btn-start').onclick = () => {
        
        startGame();
    };
    function startGame() {
        
        currentGame = new Game();
        player = new Player();
        updateCanvas();
    }
};

window.addEventListener('keydown', (event) => {
    // Stop the default behavior (moving the screen to the left/up/right/down)
    event.preventDefault();
  
    // React based on the key pressed
    switch (event.keyCode) {
      case 37:
        player.moveLeft(); //left
        break;
      case 39:
        player.moveRight(); //right
        break;
    }
});