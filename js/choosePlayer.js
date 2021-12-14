//jshint esversion:6

class ChoosePlayer {

    constructor(x, name, imgX) {
        
        this.x = x;
        this.y = canvas.height / 2;
        this.radius = 50;
        this.name = name
        this.img = new Image();
        this.img.src = `images/${this.name}.png`;
        this.imgX = imgX;
        this.imgY = canvas.height / 2 - 50;
        
    }
    drawClickArea() {

        ctx.beginPath();
        ctx.fillStyle = '#FFF';
        ctx.font = '40px Arial';
        ctx.fillText('Select Player', 230, 125);
        ctx.closePath();

        ctx.beginPath();
        // ctx.lineWidth = 2;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.closePath();
        console.log("this.img, this.imgX, this.imgY");
        console.log(this.img, this.imgX, this.imgY);
        ctx.drawImage(this.img, this.imgX, this.imgY, 100, 100);


    }
    playerClicked(xMouse, yMouse) {
        
        let dx = xMouse - this.x;
        let dy = yMouse - this.y;
      
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < this.radius ? true : false;
    }
    
}

