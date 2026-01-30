const mouseFollower = document.querySelector(".mouse-follower");

let x = 0, y = 0;

window.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
});

function follow() {
    mouseFollower.style.transform = `translate(${x - 15}px, ${y - 15}px)`;
    requestAnimationFrame(follow);
}

follow();
