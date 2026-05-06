const cards = document.querySelectorAll(".card");
const preview = document.querySelector(".preview");
const previewImg = document.querySelector(".preview img");
const previewTitle = document.querySelector(".preview h2");
const closeBtn = document.querySelector(".close");

cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 15;
    const rotateY = (x - rect.width / 2) / 15;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });

  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    previewImg.src = img.src;
    previewTitle.textContent = card.dataset.title;
    preview.classList.add("active");
  });
});

closeBtn.addEventListener("click", () => {
  preview.classList.remove("active");
});