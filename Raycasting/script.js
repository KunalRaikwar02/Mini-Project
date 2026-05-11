const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let walls = [];
let rayCount = 500;

class Boundary {
    constructor(x1, y1, x2, y2) {
        this.a = { x: x1, y: y1 };
        this.b = { x: x2, y: y2 };
    }
    draw() {
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.stroke();
    }
}

class Ray {
    constructor(pos, angle) {
        this.pos = pos;
        this.dir = { x: Math.cos(angle), y: Math.sin(angle) };
    }

    cast(wall) {
        const x1 = wall.a.x, y1 = wall.a.y;
        const x2 = wall.b.x, y2 = wall.b.y;
        const x3 = this.pos.x, y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x, y4 = this.pos.y + this.dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) return;

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t > 0 && t < 1 && u > 0) {
            return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1), dist: u };
        }
    }
}

for (let i = 0; i < 7; i++) {
    walls.push(new Boundary(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*canvas.width, Math.random()*canvas.height));
}
// Screen borders
walls.push(new Boundary(0, 0, canvas.width, 0));
walls.push(new Boundary(canvas.width, 0, canvas.width, canvas.height));
walls.push(new Boundary(canvas.width, canvas.height, 0, canvas.height));
walls.push(new Boundary(0, canvas.height, 0, 0));

function animate(e) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const mousePos = { x: e ? e.clientX : canvas.width/2, y: e ? e.clientY : canvas.height/2 };
    
    for (let wall of walls) wall.draw();

    let scene = [];
    for (let i = 0; i < 360; i += 360/rayCount) {
        let ray = new Ray(mousePos, i * Math.PI / 180);
        let closest = null;
        let record = Infinity;

        for (let wall of walls) {
            const pt = ray.cast(wall);
            if (pt) {
                if (pt.dist < record) {
                    record = pt.dist;
                    closest = pt;
                }
            }
        }
        if (closest) scene.push(closest);
    }

    // Light drawing
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(mousePos.x, mousePos.y);
    for(let p of scene) ctx.lineTo(p.x, p.y);
    ctx.closePath();
    ctx.fill();

    // Sharp Rays
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    for(let p of scene) {
        ctx.beginPath();
        ctx.moveTo(mousePos.x, mousePos.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
    }
}

window.addEventListener('mousemove', animate);
animate();