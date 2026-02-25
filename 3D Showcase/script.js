const card = document.querySelector(".card");

card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = -(y - centerY) / 15;
  const rotateY = (x - centerX) / 15;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  card.style.setProperty("--x", `${x}px`);
  card.style.setProperty("--y", `${y}px`);
});

card.addEventListener("mouseleave", () => {
  card.style.transform = "rotateX(0deg) rotateY(0deg)";
});