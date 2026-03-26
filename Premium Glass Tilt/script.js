const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
     
        const { width, height, left, top } = card.getBoundingClientRect();
        
        const x = e.clientX - left;
        const y = e.clientY - top;
        
        // Update CSS Variables for the glow effect
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);

        const centerX = width / 2;
        const centerY = height / 2;
        const rotateX = (centerY - y) / 10; 
        const rotateY = (x - centerX) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

        card.style.setProperty('--x', `-100%`);
        card.style.setProperty('--y', `-100%`);
    });
});