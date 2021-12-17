//jshint esversion:6

class Player {

    constructor(srcImg){

        this.x = canvas.width / 2;
        this.y = canvas.height - 35;
        this.dx = 35;
        this.radius = 35;
        this.health = 100;
        this.img = new Image();
        this.img.src = srcImg;
        this.width = 67;
        this.height = 67;
    }

    moveKey(event) {
        
        // Stop the default behavior (moving the screen to the left/up/right/down)
        event.preventDefault();
        
        // React based on the key pressed
        switch (event.keyCode) {
        case 37:
            this.moveLeft(); //left
            break;
        case 39:
            this.moveRight(); //right
            break;
        }
    }

    moveLeft() {

        if (this.x - this.radius > 1) {

            this.x -= this.dx;
        }

    }

    moveRight() {

        if (this.x + this.radius < canvas.width - 1){

            this.x += this.dx;
        }
        
    }

    drawPlayer() {

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();  
        
        ctx.drawImage(this.img, this.x - this.radius + 2, this.y - this.radius + 1, this.width , this.height);

    }

    detectCollision(obstacle, i) {

        let dx = obstacle.x - this.x;
        let dy = obstacle.y - this.y;

        let distance = Math.sqrt(dx * dx + dy * dy);
        let sumOfRadius = this.radius + currentGame.obstacles[i].radius;

        // removes the obstacle from the array after colision
        if (distance < sumOfRadius) {

            if (obstacle.isGood) {
                currentGame.pizzaHit.play();
                this.updateHealth(); //win 2 points when hitting a goodObstacle

            } else {

                currentGame.shredderHit.play();
                this.updateHealth(10); //loose 10 points when hitting a badObstacle 
            }
            this.removeObstacle(i);
        } 

        //removes obstacle from the array when theres no colision and obstacle is out of the canvas
        if (obstacle.y > canvas.height + (this.radius * 2)) {

            if(obstacle.isGood && this.health > 0) {

                this.updateHealth(7); //loose 7 points of health when a goodObstacle is missed
            }
        
            this.removeObstacle(i); 
        }        
    }

    removeObstacle(index) {
        
        currentGame.obstacles.splice(index,1);
    }
    
    updateHealth(damage) {

        if (damage) {

            this.health -= damage;

        } else {

            if (this.health < 100 && this.health > 0) {

                this.health += 2; 
                currentGame.score++;
            }
        } 
    }
}

