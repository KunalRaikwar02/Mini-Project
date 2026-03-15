const cursor = document.querySelector(".cursor");
const blobs = document.querySelectorAll(".blob");
const magneticBtn = document.querySelector(".magnetic");

let mX = window.innerWidth / 2, mY = window.innerHeight / 2;
let cX = mX, cY = mY;
let lastX = mX, lastY = mY;

// Mouse Tracking
document.addEventListener("mousemove", (e) => {
    mX = e.clientX;
    mY = e.clientY;
    
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

// Magnetic Button Interaction
document.addEventListener("mousemove", (e) => {
    const box = magneticBtn.getBoundingClientRect();
    const bX = box.left + box.width / 2;
    const bY = box.top + box.height / 2;
    const dist = Math.hypot(e.clientX - bX, e.clientY - bY);
    
    if (dist < 120) {
        const x = (e.clientX - bX) * 0.4;
        const y = (e.clientY - bY) * 0.4;
        magneticBtn.style.transform = `translate(${x}px, ${y}px)`;
        cursor.style.transform = "scale(5)";
    } else {
        magneticBtn.style.transform = `translate(0px, 0px)`;
        cursor.style.transform = "scale(1)";
    }
});

function animate() {

    cX += (mX - cX) * 0.04; 
    cY += (mY - cY) * 0.04;

    // 2. Velocity calculation
    const dx = mX - lastX;
    const dy = mY - lastY;
    const speed = Math.sqrt(dx * dx + dy * dy);
    
    const stretch = Math.min(speed * 0.005, 0.12); 
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    blobs.forEach((blob, i) => {

        const factor = (i + 1) * 0.08; 
        const tx = (cX - window.innerWidth / 2) * factor;
        const ty = (cY - window.innerHeight / 2) * factor;
        
        // Organic Float
        const orbitX = Math.sin(Date.now() * 0.001 + i) * 15;
        const orbitY = Math.cos(Date.now() * 0.001 + i) * 15;

        blob.style.transform = `
            translate(${tx + orbitX}px, ${ty + orbitY}px)
            rotate(${angle}deg)
            scale(${1 + stretch}, ${1 - stretch * 0.5})
            rotate(${-angle}deg)
        `;
    });

    lastX = mX;
    lastY = mY;

    requestAnimationFrame(animate);
}

animate();