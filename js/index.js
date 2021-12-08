//jshint esversion:6

let currentGame;
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let obstacleNum = 0;

function clearCanvas() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function updateCanvas() {

    clearCanvas();
    obstacleNum++;
    let currentObstacle;
    // push a new obstacle if the obstacleNum is divisible by 200
    if(obstacleNum % 200 === 0) {
        //Assign my new obstacle to my new game
        currentObstacle = new Obstacles(Math.random() * canvas.width - 20,Math.floor(Math.random() * -35) + -300, true);
        currentGame.obstacles.push(currentObstacle);

    }
    
    currentGame.obstacles.forEach((item) => {
        item.drawObstacle();
        player.detectCollision(item);
    });
    
    player.drawPlayer();
    
    let animationFrameId = requestAnimationFrame(updateCanvas);

  // if (obstacle.y > canvas.height) {
  //   cancelAnimationFrame(animationFrameId);
  // }

}


window.onload = () => {
    document.querySelector('#btn-start').onclick = () => {
        
        startGame();
    };
    function startGame() {

        //Instantiate new game
        currentGame = new Game();
        //Instantiate new obstacle
        
        
        
        
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