const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');

    const size = 800;
    canvas.width = size;
    canvas.height = size;

    let stars = [];
    const starCount = 2800; 
    // GAP SIZE: 75 se 95 kiya taaki cursor ke niche feel ho
    const mouse = { x: null, y: null, radius: 95 }; 

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Star {
        constructor() {
            let angle = Math.random() * Math.PI * 2;
            let r = Math.random() * (size / 2.8);
            
            this.baseX = (size / 2) + Math.cos(angle) * r;
            this.baseY = (size / 2) + Math.sin(angle) * r;
            
            this.x = this.baseX;
            this.y = this.baseY;
            
            this.vx = 0;
            this.vy = 0;
            this.accelX = 0;
            this.accelY = 0;
            
            this.size = Math.random() * 1.5 + 0.2;
            this.friction = 0.88; // Slightly more fluid
            this.spring = 0.045;   // Wapas aane ki tension thodi badhai
            
            this.color = Math.random() > 0.85 ? '#D5CEA3' : '#ffffff';
            this.offset = Math.random() * 3000;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        update() {
            let time = Date.now() * 0.0008;
            let floatX = Math.sin(time + this.offset) * 4;
            let floatY = Math.cos(time + this.offset) * 4;
            
            let targetX = this.baseX + floatX;
            let targetY = this.baseY + floatY;

            if (mouse.x !== null) {
                let dx = this.x - mouse.x;
                let dy = this.y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < mouse.radius) {
                    // Force ko 1.2 se 2.5 kiya taaki hatne ka feel aage
                    let force = (mouse.radius - dist) / mouse.radius;
                    this.accelX += (dx / dist) * force * 2.5; 
                    this.accelY += (dy / dist) * force * 2.5;
                }
            }

            this.vx += this.accelX;
            this.vy += this.accelY;
            
            this.vx += (targetX - this.x) * this.spring;
            this.vy += (targetY - this.y) * this.spring;

            this.x += this.vx;
            this.y += this.vy;

            this.vx *= this.friction;
            this.vy *= this.friction;
            
            this.accelX = 0;
            this.accelY = 0;
        }
    }

    function init() {
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let star of stars) {
            star.update();
            star.draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();