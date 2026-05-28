const menuItems = document.querySelectorAll(".menu-item");

menuItems.forEach((item) => {
  const text = item.dataset.text;
  const image = item.dataset.image;
  const marquee = item.querySelector(".marquee");

  const marqueeInner = document.createElement("div");
  marqueeInner.className = "marquee-inner";

  for (let i = 0; i < 10; i++) {
    const part = document.createElement("div");
    part.className = "marquee-part";

    part.innerHTML = `
      <span>${text}</span>
      <div class="marquee-img" style="background-image: url('${image}')"></div>
    `;

    marqueeInner.appendChild(part);
  }

  marquee.appendChild(marqueeInner);
});