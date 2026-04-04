const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const links = document.querySelectorAll('.item, button, span, a');
links.forEach(link => {
    link.addEventListener('mouseenter', () => cursor.style.transform = 'scale(5)');
    link.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
});

const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.item').forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(50px)";
    item.style.transition = "all 0.8s cubic-bezier(0.19, 1, 0.22, 1)";
    observer.observe(item);
});

const items = document.querySelectorAll('.item');
items.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        const img = item.querySelector('img');
        img.style.transform = `scale(1.1) translate(${x * 30}px, ${y * 30}px)`;
        
        const color = item.getAttribute('data-color');
        item.style.boxShadow = `0 20px 50px ${color}22`;
    });

    item.addEventListener('mouseleave', () => {
        const img = item.querySelector('img');
        img.style.transform = `scale(1) translate(0, 0)`;
        item.style.boxShadow = `none`;
    });
});

let current = 0;
let target = 0;
let ease = 0.075;

function smoothScroll() {
    target = window.scrollY;
    current = current + (target - current) * ease;

    requestAnimationFrame(smoothScroll);
}
smoothScroll();