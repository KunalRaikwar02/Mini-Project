const light = document.querySelector(".cursor-light");
const items = document.querySelectorAll(".item");

window.addEventListener("mousemove", (e) => {
  light.style.left = `${e.clientX}px`;
  light.style.top = `${e.clientY}px`;
});

items.forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    item.style.background = `
      radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.18), rgba(255,255,255,0.055) 38%)
    `;
  });

  item.addEventListener("mouseleave", () => {
    item.style.background = "rgba(255,255,255,0.055)";
  });
});