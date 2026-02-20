const wordElement = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endgameElement = document.getElementById("end-game-container");

const highScoreElement = document.getElementById("high-score");
const streakElement = document.getElementById("streak");
const progress = document.getElementById("progress");

const themeToggle = document.getElementById("theme-toggle");

const words = [
"sigh","tense","airplane","ball","pies",
"juice","warlike","bad","north",
"dependent","steer","silver","highfalutin",
"superficial","quince","eight","feeble",
"admit","drag","loving"
];

let randomWord;
let score = 0;
let time = 10;
let streak = 0;

let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.innerText = highScore;

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  wordElement.innerText = randomWord;
}

function updateScore() {

  score++;
  streak++;

  scoreElement.innerText = score;
  streakElement.innerText = streak;

  if(score > highScore){
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreElement.innerText = highScore;
  }
}

function updateTime(){

  time--;
  timeElement.innerText = time + "s";

  progress.style.width = (time/10)*100 + "%";

  if(time === 0){
    gameOver();
  }
}

function gameOver(){

  clearInterval(timer);

  endgameElement.innerHTML = `
    <h2>Game Over</h2>
    <p>Your score: ${score}</p>
    <button onclick="location.reload()">Play Again</button>
  `;

  endgameElement.style.display = "flex";
}

text.addEventListener("input", e => {

  const insertedText = e.target.value;

  if(randomWord.startsWith(insertedText)){
    text.style.border = "3px solid lime";
  }else{
    text.style.border = "3px solid red";
    streak = 0;
    streakElement.innerText = streak;
  }

  if(insertedText === randomWord){

    e.target.value = "";

    addWordToDOM();
    updateScore();

    time += 3;
  }
});

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){
    themeToggle.innerText = "☀️";
  }else{
    themeToggle.innerText = "🌙";
  }

});

const timer = setInterval(updateTime,1000);

addWordToDOM();

text.focus();