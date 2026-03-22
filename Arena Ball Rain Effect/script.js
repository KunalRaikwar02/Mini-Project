const arena = document.getElementById('arena');
const starfield = document.getElementById('starfield');
const ballCount = 100;
const starCount = 150;
const balls = [];
let mouse = { x: -2000, y: -2000 };

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Background Stars Logic
for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    starfield.appendChild(star);
}

class Ball {
    constructor(id) {
        this.id = id;
        this.radius = Math.random() * 15 + 25;
        this.size = this.radius * 2;
        this.x = Math.random() * (window.innerWidth - this.size);
        this.y = -100 - (Math.random() * 2000); 
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = 0;
        this.friction = 0.95;
        this.gravity = 0.4;
        this.bounce = 0.5;
        this.element = document.createElement('div');
    }

    update() {
        this.vy += this.gravity;
        const dx = (this.x + this.radius) - mouse.x;
        const dy = (this.y + this.radius) - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
            const force = (150 - distance) / 150;
            const angle = Math.atan2(dy, dx);
            this.vx += Math.cos(angle) * force * 15;
            this.vy += Math.sin(angle) * force * 15;
        }

        for (let i = this.id + 1; i < balls.length; i++) {
            const other = balls[i];
            const bdx = other.x + other.radius - (this.x + this.radius);
            const bdy = other.y + other.radius - (this.y + this.radius);
            const bDist = Math.sqrt(bdx * bdx + bdy * bdy);
            const minSt = this.radius + other.radius;

            if (bDist < minSt) {
                const bAngle = Math.atan2(bdy, bdx);
                const pushX = (Math.cos(bAngle) * minSt - bdx) * 0.2;
                const pushY = (Math.sin(bAngle) * minSt - bdy) * 0.2;
                this.vx -= pushX; this.vy -= pushY;
                other.vx += pushX; other.vy += pushY;
            }
        }

        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) { this.x = 0; this.vx *= -this.bounce; }
        if (this.x > window.innerWidth - this.size) { this.x = window.innerWidth - this.size; this.vx *= -this.bounce; }
        if (this.y > window.innerHeight - this.size) { this.y = window.innerHeight - this.size; this.vy *= -this.bounce; }
    }

    render() {
        if (!this.element.parentNode) {
            this.element.className = 'ball';
            this.element.style.width = `${this.size}px`;
            this.element.style.height = `${this.size}px`;
            arena.appendChild(this.element);
        }
        this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
    }
}

for (let i = 0; i < ballCount; i++) balls.push(new Ball(i));

function loop() {
    balls.forEach(ball => { ball.update(); ball.render(); });
    requestAnimationFrame(loop);
}
loop();

window.addEventListener('resize', () => location.reload());