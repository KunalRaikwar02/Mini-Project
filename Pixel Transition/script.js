const pixelCard = document.getElementById("pixelCard");
const pixelGrid = document.getElementById("pixelGrid");
const secondContent = document.querySelector(".second-content");

const gridSize = 12;
const pixelColor = "#ffffff";
const animationStepDuration = 400;

let isActive = false;
let once = false;

function createPixels() {
  pixelGrid.innerHTML = "";

  const size = 100 / gridSize;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const pixel = document.createElement("div");

      pixel.classList.add("pixel");

      pixel.style.width = size + "%";
      pixel.style.height = size + "%";
      pixel.style.left = col * size + "%";
      pixel.style.top = row * size + "%";
      pixel.style.backgroundColor = pixelColor;

      pixelGrid.appendChild(pixel);
    }
  }
}

function shufflePixels(pixels) {
  return [...pixels].sort(() => Math.random() - 0.5);
}

function animatePixels(activate) {
  isActive = activate;

  const pixels = shufflePixels(document.querySelectorAll(".pixel"));
  const totalPixels = pixels.length;
  const delay = animationStepDuration / totalPixels;

  pixels.forEach((pixel) => {
    pixel.style.display = "none";
  });

  pixels.forEach((pixel, index) => {
    setTimeout(() => {
      pixel.style.display = "block";
    }, index * delay);
  });

  setTimeout(() => {
    secondContent.style.display = activate ? "grid" : "none";
  }, animationStepDuration);

  pixels.forEach((pixel, index) => {
    setTimeout(() => {
      pixel.style.display = "none";
    }, animationStepDuration + index * delay);
  });
}

pixelCard.addEventListener("mouseenter", () => {
  if (!isActive) {
    animatePixels(true);
  }
});

pixelCard.addEventListener("mouseleave", () => {
  if (isActive && !once) {
    animatePixels(false);
  }
});

pixelCard.addEventListener("click", () => {
  if (!isActive) {
    animatePixels(true);
  } else if (isActive && !once) {
    animatePixels(false);
  }
});

createPixels();