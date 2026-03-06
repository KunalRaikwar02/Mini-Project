const cord = document.getElementById("cord");
const bulb = document.getElementById("bulb");
const login = document.getElementById("login");

let lampOn = false;

cord.addEventListener("click",()=>{

cord.classList.add("pull");

setTimeout(()=>{
cord.classList.remove("pull");
},350);

lampOn = !lampOn;

if(lampOn){

bulb.classList.add("on");
login.classList.add("show");
document.body.style.background="#161616";

}else{

bulb.classList.remove("on");
login.classList.remove("show");
document.body.style.background="#0c0c0c";

}

});


/* particles background */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<80;i++){

particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2,
dx:(Math.random()-0.5)*0.5,
dy:(Math.random()-0.5)*0.5
})

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

p.x+=p.dx;
p.y+=p.dy;

ctx.beginPath();
ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
ctx.fillStyle="rgba(255,255,255,0.2)";
ctx.fill();

})

requestAnimationFrame(animate)

}

animate()