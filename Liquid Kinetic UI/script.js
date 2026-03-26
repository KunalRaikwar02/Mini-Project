const text = document.querySelector('.liquid-text');
const displacementMap = document.getElementById('liquid-map');
const turbulence = document.querySelector('feTurbulence');
const cursor = document.getElementById('cursor-glow');

let mouse = { x: window.innerWidth/2, y: window.innerHeight/2 };
let pos = { x: window.innerWidth/2, y: window.innerHeight/2 };
let lastMouse = { x: 0, y: 0 };
let speed = 0;

let targetScale = 0;
let currentScale = 0;
let frame = 0;

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Calculate Speed for Liquid Intensity
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;
    speed = Math.sqrt(dx*dx + dy*dy);
    
    // Scale intensity (Zhatka feel)
    targetScale = Math.min(speed * 2.5, 120); 

    lastMouse.x = e.clientX;
    lastMouse.y = e.clientY;

    // Subtle Text Parallax
    const xRatio = (e.clientX / window.innerWidth) - 0.5;
    const yRatio = (e.clientY / window.innerHeight) - 0.5;
    text.style.transform = `translate(${xRatio * 30}px, ${yRatio * 30}px)`;
});

function animate() {
    frame += 0.02;

    // 1. Smooth Cursor Movement (Lerp)
    pos.x += (mouse.x - pos.x) * 0.1;
    pos.y += (mouse.y - pos.y) * 0.1;
    cursor.style.left = `${pos.x}px`;
    cursor.style.top = `${pos.y}px`;

    // 2. Continuous Water Ripple
    const baseFreq = 0.012 + Math.sin(frame) * 0.003;
    turbulence.setAttribute('baseFrequency', `${baseFreq} ${baseFreq * 0.6}`);

    // 3. Distortion Recovery Logic
    currentScale += (targetScale - currentScale) * 0.08;
    displacementMap.setAttribute('scale', currentScale);
    
    // Gradual Friction (Pani ko shaant karna)
    if (targetScale > 5) {
        targetScale *= 0.94;
    } else {
        targetScale = 5; // Minimal constant flow
    }

    requestAnimationFrame(animate);
}

// Click Effect (Splash)
window.addEventListener('mousedown', () => {
    targetScale = 250; 
    cursor.style.width = '400px';
    cursor.style.height = '400px';
});

window.addEventListener('mouseup', () => {
    cursor.style.width = '300px';
    cursor.style.height = '300px';
});

animate();