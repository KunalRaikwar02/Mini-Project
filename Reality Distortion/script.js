const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: 0, y: 0 };

document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function drawGrid(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  const size = 40;

  for(let x = 0; x < canvas.width; x += size){
    for(let y = 0; y < canvas.height; y += size){

      let dx = mouse.x - x;
      let dy = mouse.y - y;
      let distance = Math.sqrt(dx*dx + dy*dy);
      let distortion = 50 / distance;

      ctx.beginPath();
      ctx.arc(x + dx * distortion, y + dy * distortion, 2, 0, Math.PI*2);
      ctx.fillStyle = "rgba(255,255,255,0.2)";
      ctx.fill();
    }
  }
}

function animate(){
  drawGrid();
  requestAnimationFrame(animate);
}

animate();


// Text warp effect
const texts = document.querySelectorAll(".warp");

document.addEventListener("mousemove", (e)=>{
  texts.forEach(text=>{
    const rect = text.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width/2);
    const dy = e.clientY - (rect.top + rect.height/2);
    text.style.transform = `translate(${dx*0.02}px, ${dy*0.02}px)`;
  });
});