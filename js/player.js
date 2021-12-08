//jshint esversion:6

class Player {

    constructor(){
        this.x = 325;
        this.y = 450;
        this.dx = 10;
        this.width = 50;
        this.height = 50;
        //this.img = new Image();
        //this.img.src = "images/player.png";
    }
    moveLeft(){
        if (this.x < 1) {
            return;
        }
        this.x -= this.dx;
        
    }
    moveRight(){
        if (this.x > canvas.width - 51){
            return;
        }
        this.x += this.dx;
        
    }
    drawPlayer(){
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    checkColision (obstacle) {
        
    }

    detectCollision(obstacle) {
        
        if (obstacle.y + obstacle.radius > this.y && obstacle.y > this.x && obstacle.x < this.x + this.width) {
            console.log("here");
            for(let i = 0; i < currentGame.obstacles.length; i++){
                if(currentGame.obstacles[i] === obstacle || obstacle.y > canvas.height){
                    currentGame.obstacles.splice(i,1);
                }
        
            }
            
          } else {
            
        }
    }
}

let player = new Player();