const stack = document.getElementById("stack");
let cards = Array.from(document.querySelectorAll(".card"));

const sensitivity = 180;
const randomRotation = true;
const sendToBackOnClick = true;
const autoplay = true;
const autoplayDelay = 3000;
const pauseOnHover = true;

let isDragging = false;
let startX = 0;
let startY = 0;
let activeCard = null;
let autoplayTimer = null;
let isPaused = false;

cards.forEach(card => {
  card.dataset.random = randomRotation
    ? (Math.random() * 10 - 5).toFixed(2)
    : 0;
});

function updateStack() {
  cards.forEach((card, index) => {
    const reverseIndex = cards.length - index - 1;
    const random = Number(card.dataset.random);

    card.style.zIndex = index + 1;

    card.style.transform = `
      translate(0px, 0px)
      rotateZ(${reverseIndex * 4 + random}deg)
      scale(${1 + index * 0.06 - cards.length * 0.06})
    `;
  });
}

function sendToBack(card) {
  cards = cards.filter(item => item !== card);
  cards.unshift(card);
  updateStack();
}

function startDrag(e) {
  isDragging = true;
  activeCard = this;

  startX = e.clientX || e.touches[0].clientX;
  startY = e.clientY || e.touches[0].clientY;

  activeCard.style.transition = "none";
}

function moveDrag(e) {
  if (!isDragging || !activeCard) return;

  const currentX = e.clientX || e.touches[0].clientX;
  const currentY = e.clientY || e.touches[0].clientY;

  const offsetX = currentX - startX;
  const offsetY = currentY - startY;

  const rotateX = offsetY / 3;
  const rotateY = offsetX / 3;

  activeCard.style.transform = `
    translate(${offsetX}px, ${offsetY}px)
    rotateX(${-rotateX}deg)
    rotateY(${rotateY}deg)
    scale(1)
  `;
}

function endDrag(e) {
  if (!isDragging || !activeCard) return;

  const endX = e.clientX || startX;
  const endY = e.clientY || startY;

  const offsetX = endX - startX;
  const offsetY = endY - startY;

  activeCard.style.transition =
    "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";

  if (Math.abs(offsetX) > sensitivity || Math.abs(offsetY) > sensitivity) {
    sendToBack(activeCard);
  } else {
    updateStack();
  }

  isDragging = false;
  activeCard = null;
}

cards.forEach(card => {
  card.addEventListener("mousedown", startDrag);
  card.addEventListener("touchstart", startDrag);

  card.addEventListener("click", function () {
    if (sendToBackOnClick) {
      sendToBack(this);
    }
  }); 
});

window.addEventListener("mousemove", moveDrag);
window.addEventListener("touchmove", moveDrag);

window.addEventListener("mouseup", endDrag);
window.addEventListener("touchend", endDrag);

function startAutoplay() {
  autoplayTimer = setInterval(() => {
    if (!autoplay || isPaused) return;

    const topCard = cards[cards.length - 1];
    sendToBack(topCard);
  }, autoplayDelay);
}

stack.addEventListener("mouseenter", () => {
  if (pauseOnHover) isPaused = true;
});

stack.addEventListener("mouseleave", () => {
  if (pauseOnHover) isPaused = false;
});

updateStack();
startAutoplay();