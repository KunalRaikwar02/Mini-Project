const canvas = document.getElementById("ribbonCanvas");
const ctx = canvas.getContext("2d");

let width;
let height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const mouse = {
  x: width / 2,
  y: height / 2
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("touchmove", (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});

const ribbons = [];
const colors = ["#ffffff", "#bbbbbb", "#777777"];

for (let i = 0; i < colors.length; i++) {
  let points = [];

  for (let j = 0; j < 50; j++) {
    points.push({
      x: width / 2,
      y: height / 2
    });
  }

  ribbons.push({
    points,
    color: colors[i],
    thickness: 30 - i * 6,
    offset: (i - 1) * 35,
    speed: 0.22 - i * 0.03
  });
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  ribbons.forEach((ribbon) => {
    ribbon.points[0].x += (mouse.x + ribbon.offset - ribbon.points[0].x) * ribbon.speed;
    ribbon.points[0].y += (mouse.y - ribbon.points[0].y) * ribbon.speed;

    for (let i = 1; i < ribbon.points.length; i++) {
      ribbon.points[i].x += (ribbon.points[i - 1].x - ribbon.points[i].x) * 0.35;
      ribbon.points[i].y += (ribbon.points[i - 1].y - ribbon.points[i].y) * 0.35;
    }

    ctx.beginPath();

    ctx.moveTo(ribbon.points[0].x, ribbon.points[0].y);

    for (let i = 1; i < ribbon.points.length - 1; i++) {
      const xc = (ribbon.points[i].x + ribbon.points[i + 1].x) / 2;
      const yc = (ribbon.points[i].y + ribbon.points[i + 1].y) / 2;
      ctx.quadraticCurveTo(ribbon.points[i].x, ribbon.points[i].y, xc, yc);
    }

    ctx.strokeStyle = ribbon.color;
    ctx.lineWidth = ribbon.thickness;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = 0.9;
    ctx.stroke();
    ctx.globalAlpha = 1;
  });

  requestAnimationFrame(animate);
}

animate();