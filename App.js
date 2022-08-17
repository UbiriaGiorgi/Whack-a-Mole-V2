const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const startBtn = document.getElementById('play-btn');
const levelId = document.getElementById('level-id');

let result = 0;
let level = 1;
let hitPosition;
let started = false;
let timerId = null;
let currentTime = 15;
const currentTimeEd = currentTime;
let squareColor;
let countDownTimerID;

startBtn.addEventListener('click', function(){
    result = 0;
    document.getElementById('score-sheet').textContent = 'Score: ';
    score.textContent = result;
    document.getElementById('time-label').textContent = 'Time Left: ';
    timeLeft.textContent = currentTimeEd;
    document.getElementById('level').textContent = 'Level: ';
    levelId.textContent = level;
    if(started === false){
        timerId = setInterval(randomSquare, (2000 / level));
        countDownTimerID  = setInterval(countDown, 1000);
        squares.forEach(square => {
            square.addEventListener('click', function(){
                if(square.id === hitPosition){
                    document.getElementById(square.id).classList.add('active');
                    setTimeout(function(){
                        document.getElementById(square.id).classList.remove('active');
                     }, 100); 
                    result++;
                    score.textContent = result;
                    hitPosition = null;
                }
            });
        });
        countdown();
        started = true;
    } else {
        moveMole();
        started = false;
    }
});

function randomSquare(){
    squares.forEach(className => {
        className.classList.remove('mole');
    });

    let randomSquares = squares[Math.floor(Math.random() * 9)];

    randomSquares.classList.add('mole');

    hitPosition = randomSquares.id;
}

function moveMole() {
    timerId = setInterval(randomSquare, 500);
}

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if(currentTime === 0){
        level++;
        window.clearInterval(countDownTimerID);
        window.clearInterval(timerId);
        currentTime = currentTimeEd;
        document.getElementById('score-sheet').textContent = 'Game Over! Your Score is ';
        document.getElementById('score').textContent = result;
        document.getElementById('time-label').textContent = "";
        document.getElementById('time-left').textContent = "";
        document.getElementById('level-id').textContent = "";
        document.getElementById('level').textContent = "";
    }
}