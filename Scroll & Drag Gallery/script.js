const gallery = document.getElementById("gallery");

const items = [
  { img: "https://picsum.photos/seed/1/800/900?grayscale", title: "Bridge" },
  { img: "https://picsum.photos/seed/2/800/900?grayscale", title: "Desk Setup" },
  { img: "https://picsum.photos/seed/3/800/900?grayscale", title: "Waterfall" },
  { img: "https://picsum.photos/seed/4/800/900?grayscale", title: "Street" },
  { img: "https://picsum.photos/seed/5/800/900?grayscale", title: "Ocean" },
  { img: "https://picsum.photos/seed/6/800/900?grayscale", title: "Mountains" },
  { img: "https://picsum.photos/seed/7/800/900?grayscale", title: "City" },
  { img: "https://picsum.photos/seed/8/800/900?grayscale", title: "Forest" }
];

const allItems = [...items, ...items];

allItems.forEach(item => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <img src="${item.img}" alt="${item.title}">
    <h3>${item.title}</h3>
  `;
  gallery.appendChild(card);
});

let target = 0;
let current = 0;
let isDown = false;
let startX = 0;
let startTarget = 0;

function animate() {
  current += (target - current) * 0.08;

  const cards = document.querySelectorAll(".card");
  const cardWidth = cards[0].offsetWidth + 40;
  const totalWidth = cardWidth * items.length;

  if (target > totalWidth) target = 0;
  if (target < -totalWidth) target = 0;

  gallery.style.transform = `translateX(${-current}px)`;

  cards.forEach((card, index) => {
    const x = index * cardWidth - current;
    const center = window.innerWidth / 2;
    const distance = x - center;
    const rotate = distance / 45;
    const yMove = Math.abs(distance) / 18;

    card.style.transform = `
      translateY(${yMove}px)
      rotateZ(${rotate}deg)
    `;

    card.style.opacity = Math.max(0.35, 1 - Math.abs(distance) / 900);
  });

  requestAnimationFrame(animate);
}

window.addEventListener("wheel", e => {
  target += e.deltaY * 0.7;
});

window.addEventListener("mousedown", e => {
  isDown = true;
  startX = e.clientX;
  startTarget = target;
});

window.addEventListener("mousemove", e => {
  if (!isDown) return;
  const diff = startX - e.clientX;
  target = startTarget + diff * 1.5;
});

window.addEventListener("mouseup", () => {
  isDown = false;
});

window.addEventListener("touchstart", e => {
  isDown = true;
  startX = e.touches[0].clientX;
  startTarget = target;
});

window.addEventListener("touchmove", e => {
  if (!isDown) return;
  const diff = startX - e.touches[0].clientX;
  target = startTarget + diff * 1.5;
});

window.addEventListener("touchend", () => {
  isDown = false;
});

animate();