// --- Custom Cursor Logic ---
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    // Center the cursor circle
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

// Add hover class on interactive elements
const interactables = document.querySelectorAll('.nav-links a, .menu-item');
interactables.forEach(link => {
    link.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});


// --- Interactive Split-Screen Logic ---
const menuItems = document.querySelectorAll('.menu-item');
const bgSlides = document.querySelectorAll('.bg-slide');

menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // 1. Remove active class from all menu items
        menuItems.forEach(i => i.classList.remove('active'));
        // 2. Add active class to hovered item
        item.classList.add('active');

        // 3. Handle Background Slide change
        const targetBgId = item.getAttribute('data-bg');
        
        // Remove active class from all slides
        bgSlides.forEach(slide => slide.classList.remove('active'));
        // Add active class to target slide
        document.getElementById(targetBgId).classList.add('active');
    });
});