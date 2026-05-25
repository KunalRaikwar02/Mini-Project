const horizontalLine = document.querySelector(".horizontal");
const verticalLine = document.querySelector(".vertical");
const links = document.querySelectorAll("a");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  horizontalLine.classList.add("active");
  verticalLine.classList.add("active");
});

function animateCrosshair() {
  currentX += (mouseX - currentX) * 0.15;
  currentY += (mouseY - currentY) * 0.15;

  verticalLine.style.transform = `translateX(${currentX}px)`;
  horizontalLine.style.transform = `translateY(${currentY}px)`;

  requestAnimationFrame(animateCrosshair);
}

animateCrosshair();

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    horizontalLine.classList.add("distort");
    verticalLine.classList.add("distort");
  });

  link.addEventListener("mouseleave", () => {
    setTimeout(() => {
      horizontalLine.classList.remove("distort");
      verticalLine.classList.remove("distort");
    }, 450);
  });
});