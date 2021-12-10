//jshint esversion:6

class Obstacles {

    constructor(x,y,isGood){
        //properties to draw
        this.x = x;
        this.y = y;
        //this.dx = Math.floor(Math.random() * canvas.width);
        this.radius = Math.floor(Math.random() * 40) + 20;
        // speed and reset properties
        this.dy = 2;
        this.isGood = isGood;
        //TODO: Add width and height
            
    }
    drawObstacle(){
        ctx.beginPath();
        if (this.isGood){
            ctx.strokeStyle = 'green';
        } else {
            ctx.strokeStyle = 'red';
        }
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        
        //TODO: create move method
        this.y += this.dy;         
    }

    //makes the obstacles loop and change its properties
    
}




