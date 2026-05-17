const cardNav = document.getElementById("cardNav");
const hamburger = document.getElementById("hamburger");

hamburger.addEventListener("click", () => {
  cardNav.classList.toggle("open");
  hamburger.classList.toggle("active");
});