const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
const points = [];
const numPoints = 35; // Number of segments in the tentacle
const segmentLength = 20;

for (let i = 0; i < numPoints; i++) {
    points.push({ x: mouse.x, y: mouse.y });
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function update() {
    // First point follows the mouse
    points[0].x = mouse.x;
    points[0].y = mouse.y;

    for (let i = 1; i < numPoints; i++) {
        const p1 = points[i - 1];
        const p2 = points[i];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const angle = Math.atan2(dy, dx);

        p2.x = p1.x - Math.cos(angle) * segmentLength;
        p2.y = p1.y - Math.sin(angle) * segmentLength;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Glow Effect
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ffffff';

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < numPoints; i++) {
        // Tapering effect: Har segment chota hota jayega tail tak
        ctx.lineWidth = (numPoints - i) * 0.8; 
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();

    // Adding a "head" or glowing tip
    ctx.beginPath();
    ctx.arc(points[0].x, points[0].y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
}

function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();