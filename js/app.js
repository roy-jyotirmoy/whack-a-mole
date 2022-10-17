const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let countDownTimerId;

function randomSquare() {
  squares.forEach(square => {
    //clears out all the squares of mole
    square.classList.remove('mole');
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)]; //generates a random square
  randomSquare.classList.add('mole'); //and, then adds the mole to it

  hitPosition = randomSquare.id; //stores the id of the random square selected
}

squares.forEach(square => {
  //this checks if we hit the mole in time
  square.addEventListener('click', () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 550); //moves the mole every 550ms
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;
  if (currentTime === 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert("Time's up! Your final score is: " + result);
    alert('Reload page to start again!');
    startGame.removeEventListener('click', moveMole); //removes event listener once the game has begun
    startTimer.removeEventListener('click', startTimerFn);
  }
}

function startTimerFn() {
  countDownTimerId = setInterval(countDown, 1000);
}

const startGame = document.querySelector('#start');
startGame.addEventListener('click', moveMole); //adds event listener to the button to begin the game

const startTimer = document.querySelector('#start');
startTimer.addEventListener('click', startTimerFn); //adds event listener to the button to begin the countdown timer
