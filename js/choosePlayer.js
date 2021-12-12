//jshint esversion:6

class ChoosePlayer {

    constructor(x, srcImg, imgX) {
        
        this.x = x;
        this.y = canvas.height / 2;
        this.radius = 50;
        this.img = new Image();
        this.img.src = srcImg;
        this.imgX = imgX;
        this.imgY = canvas.height / 2 - 50;
        
    }
    drawClickArea(){

        ctx.beginPath();
        // ctx.lineWidth = 2;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.closePath();

        ctx.drawImage(this.img, this.imgX, this.imgY, 100, 100);

    }
    playerClicked(xMouse, yMouse) {
        
        let dx = xMouse - this.x;
        let dy = yMouse - this.y;
      
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.radius) {

            return true;

        } else {
            
            return false;
        }
    }
}

