const gallery = document.getElementById("gallery");

const items = [
  ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop", "Mountains"],
  ["https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop", "Forest"],
  ["https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1200&auto=format&fit=crop", "City"],
  ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop", "Ocean"],
  ["https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200&auto=format&fit=crop", "Valley"],
  ["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop", "Desert"],
  ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop", "Village"],
  ["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop", "Road"],
  ["https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop", "Nature"],
  ["https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1200&auto=format&fit=crop", "Wild"]
];

gallery.innerHTML = "";

items.forEach(item => {
  gallery.innerHTML += `
    <div class="card">
      <img src="${item[0]}" alt="${item[1]}">
      <h2>${item[1]}</h2>
    </div>
  `;
});

gallery.innerHTML += gallery.innerHTML;

let current = 0;
let target = 0;
let isDown = false;
let startX = 0;
let startTarget = 0;

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

function getLoopWidth() {
  return gallery.scrollWidth / 2;
}

function loopFix() {
  const width = getLoopWidth();

  if (target <= -width) {
    target += width;
    current += width;
  }

  if (target >= 0) {
    target -= width;
    current -= width;
  }
}

function animate() {
  target -= 0.7;

  loopFix();

  current = lerp(current, target, 0.08);

  gallery.style.transform = `translateX(${current}px)`;

  document.querySelectorAll(".card").forEach(card => {
    const rect = card.getBoundingClientRect();
    const center = window.innerWidth / 2;
    const cardCenter = rect.left + rect.width / 2;
    const distance = (cardCenter - center) / center;

    const rotate = distance * 20;
    const y = Math.abs(distance) * -45;

    card.style.transform = `
      perspective(1000px)
      rotateY(${rotate}deg)
      translateY(${y}px)
    `;
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("wheel", e => {
  target -= e.deltaY * 0.5;
  loopFix();
});

gallery.addEventListener("mousedown", e => {
  isDown = true;
  startX = e.pageX;
  startTarget = target;
});

window.addEventListener("mouseup", () => {
  isDown = false;
});

window.addEventListener("mousemove", e => {
  if (!isDown) return;

  const move = e.pageX - startX;
  target = startTarget + move * 1.5;

  loopFix();
});