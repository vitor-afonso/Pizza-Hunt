//jshint esversion:6

class Obstacles {

    constructor(x, y,isGood){

        // properties to draw
        this.x = x;
        this.y = y;
        this.radius = 50;
        // speed and reset properties
        this.dy = 5;
        this.isGood = isGood;
        this.width = 100;
        this.height = 100;
        this.img = new Image(); 
    }
    setImage() {

        if(this.isGood) {
            this.img.src = "../images/pizza.png";
            ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius - 1, this.width, this.height);
        } else {
            this.img.src = "../images/shreder.png";
            ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius - 1, this.width, this.height);
        }
    }
    drawObstacle(){

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
        this.setImage();
        this.moveObstacle();
    }
    moveObstacle() {
        this.y += this.dy;      
    }
    
    
}




