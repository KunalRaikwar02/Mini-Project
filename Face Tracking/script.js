const head = document.getElementById("head");
const eyes = document.querySelectorAll(".eye");

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  targetX = (e.clientX - centerX) / centerX;
  targetY = (e.clientY - centerY) / centerY;
});

function animateFace() {
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;

  head.style.transform = `
    rotateY(${currentX * 24}deg)
    rotateX(${-currentY * 14}deg)
  `;

  eyes.forEach((eye) => {
    eye.style.transform = `
      translateX(${currentX * 10}px)
      translateY(${currentY * 7}px)
    `;
  });

  requestAnimationFrame(animateFace);
}

animateFace();