//jshint esversion:6

class Game {
    constructor() {
        
        this.obstacles = [];
        this.score = 0;
        this.obstaclesFrequency = 0;
        this.isGood = [true, false];
        this.numberOfObstacles = 5;
        
        // this.healthTimer = setInterval(player.decreaseHealth(1), 1000);
        // this.animationId = null;
        // this.gameOver = false;
    }
    drawGameOver(){

        ctx.font = '48px serif';
        ctx.fillText('GAME OVER', 210, 250);

    }
}