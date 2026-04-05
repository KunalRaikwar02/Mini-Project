const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const mouse = { x: -100, y: -100, radius: 180 };

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];

 
    let spacing = 35;
    for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
            particles.push(new Particle(x, y));
        }
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.vx = 0;
        this.vy = 0;
        this.accX = 0;
        this.accY = 0;
        this.friction = 0.85; 
        this.spring = 0.08;   
    }

    update() {

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouse.radius) {
            let force = (mouse.radius - dist) / mouse.radius;
            this.accX = (dx / dist) * force * 15; 
            this.accY = (dy / dist) * force * 15;
            this.vx -= this.accX;
            this.vy -= this.accY;
        }

        this.vx += (this.baseX - this.x) * this.spring;
        this.vy += (this.baseY - this.y) * this.spring;

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {

        let speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        let colorValue = Math.min(255, 50 + speed * 20);
        ctx.fillStyle = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {

    ctx.fillStyle = 'rgba(8, 8, 8, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    drawLines();
    
    requestAnimationFrame(animate);
}

function drawLines() {
    ctx.lineWidth = 0.5;
    for (let i = 0; i < particles.length; i++) {
    
        let p = particles[i];
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist/100})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('resize', init);

init();
animate();