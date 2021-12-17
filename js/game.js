//jshint esversion:6

class Game {
    constructor() {

        this.obstacles = [];
        this.score = 0;
        this.obstaclesFrequency = 0;
        this.isGood = [true, false];
        this.numberOfObstacles = 5;
        this.animationFrameId = null;

        this.gameStart = document.querySelector('#game-audio');
        this.gameOver = document.querySelector('#game-over');
        this.shredderHit = document.querySelector('#shredderHit');
        this.pizzaHit = document.querySelector('#pizzaHit');

        this.players = [];
    }
    drawSelectTurtle() {

        ctx.font = '48px sans-serif';
        ctx.fillStyle = '#FFF';
        ctx.fillText('SELECT PLAYER', 160, 135);
    }

    drawGameOver() {

        ctx.font = '48px serif';
        ctx.fillText('GAME OVER', 210, 250);

        ctx.font = '30px serif';
        ctx.fillStyle = '#FFF';
        ctx.fillText('You managed to catch ' + this.score + ' pizzas', 190, 310);
    }
}