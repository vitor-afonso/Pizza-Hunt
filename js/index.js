//jshint esversion:6

function clearCanvas() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
function updateCanvas() {

    clearCanvas();
    
    obstacle.drawObstacle();
    obstacle2.drawObstacle();
    obstacle3.drawObstacle();
    obstacle4.drawObstacle();
    obstacle5.drawObstacle();
    player.drawPlayer();
    

    let animationFrameId = requestAnimationFrame(updateCanvas);

  // if (obstacle.y > canvas.height) {
  //   cancelAnimationFrame(animationFrameId);
  // }

}
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

window.onload = () => {
    document.querySelector('#btn-start').onclick = () => {
        
        startGame();
    };
    function startGame() {
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



