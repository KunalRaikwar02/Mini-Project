const clock = document.getElementById("clock");
const buttons = document.querySelectorAll("button");
const quote = document.getElementById("quote");

const quotes = {
  focus: "Stay locked in. Discipline creates freedom.",
  chill: "Relax. You are exactly where you need to be.",
  energy: "Push harder. Your future self is watching.",
  dark: "Silence builds power."
};

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const mood = btn.dataset.mood;
    document.body.className = mood;
    quote.textContent = quotes[mood];
    localStorage.setItem("mood", mood);
  });
});

const savedMood = localStorage.getItem("mood");
if (savedMood) {
  document.body.className = savedMood;
  quote.textContent = quotes[savedMood];
}