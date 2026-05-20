const sphere = document.getElementById("sphere");
const stage = document.getElementById("stage");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popupImg");

const images = Array.from({ length: 120 }, (_, i) =>
  `https://picsum.photos/seed/dome-${i + 1}/400/500`
);

let rotateX = 0;
let rotateY = 0;

let isDown = false;
let dragged = false;
let startX = 0;
let startY = 0;
let lastX = 0;
let lastY = 0;

const rows = 5;
const cols = 22;
const radius = 640;

let index = 0;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const tile = document.createElement("div");
    tile.className = "tile";

    const img = document.createElement("img");
    img.src = images[index];
    img.alt = `Image ${index + 1}`;

    tile.appendChild(img);

    const angleY = (360 / cols) * col;
    const angleX = (row - 2) * 13;
    tile.style.transform = `
      rotateY(${angleY}deg)
      rotateX(${angleX}deg)
      translateZ(${radius}px)
    `;

    tile.addEventListener("pointerup", (e) => {
      e.stopPropagation();

      if (!dragged) {
        popupImg.src = img.src;
        popup.classList.add("active");
      }
    });

    sphere.appendChild(tile);
    index++;
  }
}

function updateSphere() {
  sphere.style.transform = `
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
  `;
}

stage.addEventListener("pointerdown", (e) => {
  isDown = true;
  dragged = false;

  startX = e.clientX;
  startY = e.clientY;
  lastX = e.clientX;
  lastY = e.clientY;
});

stage.addEventListener("pointermove", (e) => {
  if (!isDown) return;

  const totalX = e.clientX - startX;
  const totalY = e.clientY - startY;

  if (Math.abs(totalX) > 6 || Math.abs(totalY) > 6) {
    dragged = true;
  }

  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;

  rotateY += dx * 0.18;
  rotateX -= dy * 0.06;

  rotateX = Math.max(-8, Math.min(8, rotateX));

  lastX = e.clientX;
  lastY = e.clientY;

  updateSphere();
});

window.addEventListener("pointerup", () => {
  isDown = false;

  setTimeout(() => {
    dragged = false;
  }, 120);
});

popup.addEventListener("click", () => {
  popup.classList.remove("active");
});

updateSphere();