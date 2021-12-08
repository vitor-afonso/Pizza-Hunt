//jshint esversion:6

class Obstacles {

    constructor(x,y,isGood){
        //properties to draw
        this.x = x;
        this.y = y;
        this.dx = Math.floor(Math.random() * canvas.width);
        this.radius = Math.floor(Math.random() * 40) + 20;
        // speed and reset properties
        this.dy = 1;
        this.resetY = y; 
        this.obstacles = [];
        this.isGood = isGood;
        this.colors = [ 'red', 'green', 'blue', 'orange', 'yellow', 'purple'];
        this.colorIndex = this.colors[Math.floor(Math.random() * this.colors.length)];
        
    }
    drawObstacle(){
        
        ctx.beginPath();
        ctx.strokeStyle = this.colorIndex;
        ctx.arc(this.dx, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        this.y += this.dy;         
    }
    //makes the obstacles loop and change its properties

    loopObstacles() {

        if (this.y === canvas.height + (this.radius * 2) ) {
        
            this.y = this.resetY;
            this.dx = Math.floor(Math.random() * canvas.width);
            this.colorIndex = this.colors[Math.floor(Math.random() * this.colors.length)];
            this.radius = Math.floor(Math.random() * 40) + 20;
        }
        if (this.y + this.radius === player.x && this.x + this.radius === player.x){
            console.log("here!");
        }
    }
    
}




