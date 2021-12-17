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

    setHighScores(){

        let playerName = prompt("Nooooo! You Lost! Save your name for posterity!!");
        let playersArr = JSON.parse(localStorage.getItem('playersScore')) || [];
        let playerObj = {};
        playerObj[playerName] = this.score;
        playersArr.push(playerObj);
        localStorage.setItem('playersScore', JSON.stringify(playersArr));
    }

    getHighScores(){

        let playersRecord = document.querySelector('#players-score');
        
        // Retrieve the object from storage
        let retrievedArr = JSON.parse(localStorage.getItem('playersScore'));

        if(retrievedArr.length > 4) {
            delete retrievedArr[0];
        }

        retrievedArr.forEach(element => {
            
            let keyName = Object.keys(element);
            let lastRecord = document.createElement('p');
            lastRecord.innerHTML = `${keyName}: ${element[keyName]}`;
            playersRecord.insertBefore(lastRecord, playersRecord.firstChild);

        });
    }
}