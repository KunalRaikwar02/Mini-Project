const target = document.getElementById("target");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");

let score = 0;
let timeLeft = 20;
let gameInterval;
let moveSpeed = 1000;

function randomPosition() {
  const gameArea = document.getElementById("gameArea");
  const maxX = gameArea.clientWidth - 70;
  const maxY = gameArea.clientHeight - 70;

  target.style.left = Math.random() * maxX + "px";
  target.style.top = Math.random() * maxY + "px";
}

function moveTarget() {
  randomPosition();
}

function startGame() {
  score = 0;
  timeLeft = 20;
  moveSpeed = 1000;
  scoreDisplay.innerText = score;
  timeDisplay.innerText = timeLeft;
  target.style.display = "block";

  gameInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(moveLoop);
      target.style.display = "none";
      alert("Game Over! Your Score: " + score);
    }
  }, 1000);

  moveLoop = setInterval(moveTarget, moveSpeed);
}

target.onclick = function() {
  score++;
  scoreDisplay.innerText = score;

  if (score % 5 === 0 && moveSpeed > 300) {
    moveSpeed -= 100;
    clearInterval(moveLoop);
    moveLoop = setInterval(moveTarget, moveSpeed);
  }

  randomPosition();
};

let moveLoop;
startBtn.onclick = startGame;