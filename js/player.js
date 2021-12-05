//jshint esversion:6

class Player {

    constructor(){
        this.x = 325;
        this.y = 450;
        this.dx = 10;
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
        ctx.fillRect(this.x, this.y, 50, 50);
    }
}

let player = new Player();