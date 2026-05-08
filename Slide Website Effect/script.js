const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
let isAnimating = false;

function updateSlides(newIndex, direction) {
  if (newIndex < 0 || newIndex >= slides.length || isAnimating) return;

  isAnimating = true;

  slides.forEach((slide, i) => {
    slide.classList.remove("active", "previous", "next", "reverse-out");

    if (i < newIndex) {
      slide.classList.add("previous");
    } else if (i > newIndex) {
      slide.classList.add("next");
    }
  });

  if (direction === "up") {
    slides[currentSlide].classList.add("reverse-out");
  }

  slides[newIndex].classList.add("active");

  dots.forEach((dot, i) => {
    dot.classList.toggle("active-dot", i === newIndex);
  });

  document.body.classList.toggle("dark-dots", newIndex === 3);

  currentSlide = newIndex;

  setTimeout(() => {
    isAnimating = false;
  }, 950);
}

window.addEventListener("wheel", (e) => {
  if (e.deltaY > 0) {
    updateSlides(currentSlide + 1, "down");
  } else {
    updateSlides(currentSlide - 1, "up");
  }
});

let startY = 0;

window.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

window.addEventListener("touchend", (e) => {
  let endY = e.changedTouches[0].clientY;

  if (startY - endY > 50) {
    updateSlides(currentSlide + 1, "down");
  }

  if (endY - startY > 50) {
    updateSlides(currentSlide - 1, "up");
  }
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const direction = index > currentSlide ? "down" : "up";
    updateSlides(index, direction);
  });
});