//jshint esversion:6

class Player {

    constructor(){

        this.x = canvas.width / 2;
        this.y = canvas.height - 35;
        this.dx = 35;
        this.radius = 35;
        this.health = 100;

        //this.img = new Image();
        //this.img.src = "images/player.png";
    }
    moveLeft(){

        if (this.x - this.radius < 1) {
            return;
        }
        this.x -= this.dx;
        
    }
    moveRight(){

        if (this.x + this.radius > canvas.width - 1){
            return;
        }
        this.x += this.dx;
        
    }
    drawPlayer(){

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();  

    }
    detectCollision(obstacle, i) {

        let dx = obstacle.x - this.x;
        let dy = obstacle.y - this.y;

        let distance = Math.sqrt(dx * dx + dy * dy);
        let sumOfRadius = this.radius + currentGame.obstacles[i].radius;

        // removes the obstacle from the array after colision
        if (distance < sumOfRadius || distance === sumOfRadius) {

            // console.log("colision");
            // console.log(obstacle.isGood);

            if (obstacle.isGood) {

                this.increaseHealth(); //win 2 points when hit a goodObstacle

            } else {

                this.decreaseHealth(-5); //loose 5 points when the hit badObstacle 
            }
            currentGame.obstacles.splice(i,1);

            
            

        } 

        // removes obstacle from the array in case theres no colision and is out of the canvas
        if (obstacle.y > canvas.height + (this.radius * 2)) {

            if(obstacle.isGood && this.health > 0) {

                this.decreaseHealth(-5); //loose 5 points when miss a goodObstacle
            }
            // console.log("no collision");
            currentGame.obstacles.splice(i,1);
            
        }        
    }
    increaseHealth() {

        let playerHealth = document.querySelector('#score');

        if(this.health < 100 && this.health > 97) {

            this.health = 100;

            playerHealth.innerHTML = this.health.toString();
        } 
        if (this.health < 95 && this.health > 0) {

            this.health += 2; 

            playerHealth.innerHTML = this.health.toString();
        }
    }
    decreaseHealth(x) {

        let playerHealth = document.querySelector('#score');

        this.health += x;
        
        playerHealth.innerHTML = this.health.toString();
    }

}

