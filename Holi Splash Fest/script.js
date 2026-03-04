const container = document.querySelector(".balloon-container");
const startBtn = document.getElementById("startBtn");
const overlay = document.getElementById("overlay");
const scoreBoard = document.querySelector(".score-board");
const scoreEl = document.getElementById("score");

let score = 0;
let gameInterval;

const colors = [
    "#00c6ff",
    "#0072ff",
    "#43e97b",
    "#f7971e",
    "#a18cd1"
];

function createBalloon() {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    const size = Math.random() * 40 + 50;
    balloon.style.width = size + "px";
    balloon.style.height = size + "px";

    balloon.style.left = Math.random() * (window.innerWidth - size) + "px";
    balloon.style.background =
        colors[Math.floor(Math.random() * colors.length)];

    balloon.style.animationDuration =
        (Math.random() * 3 + 3) + "s";

    balloon.addEventListener("click", () => {
        splash(balloon.style.background);

        // Increase score
        score++;
        scoreEl.textContent = score;

        // Pop animation
        balloon.style.transition = "0.3s ease";
        balloon.style.transform = "scale(1.5)";
        balloon.style.opacity = "0";

        setTimeout(() => {
            balloon.remove();
        }, 300);
    });

    container.appendChild(balloon);

    // Auto remove if not clicked
    setTimeout(() => {
        balloon.remove();
    }, 6000);
}

function splash(color) {
    const splash = document.createElement("div");

    splash.style.position = "absolute";
    splash.style.width = "150px";
    splash.style.height = "150px";
    splash.style.borderRadius = "50%";
    splash.style.pointerEvents = "none";

    splash.style.background = color;
    splash.style.left =
        Math.random() * window.innerWidth + "px";
    splash.style.top =
        Math.random() * window.innerHeight + "px";

    splash.style.opacity = "0.8";
    splash.style.transform = "scale(0)";
    splash.style.transition = "0.6s ease";

    document.body.appendChild(splash);

    setTimeout(() => {
        splash.style.transform = "scale(3)";
        splash.style.opacity = "0";
    }, 10);

    setTimeout(() => {
        splash.remove();
    }, 600);
}

startBtn.addEventListener("click", () => {

    // Reset score
    score = 0;
    scoreEl.textContent = score;

    // Fade overlay
    overlay.style.opacity = "0";

    setTimeout(() => {
        overlay.remove();
    }, 600);

    // Change background
    document.body.style.background =
        "linear-gradient(135deg,#0f2027,#203a43,#2c5364)";

    scoreBoard.style.display = "block";

    // Start balloon spawn
    gameInterval = setInterval(createBalloon, 700);
});