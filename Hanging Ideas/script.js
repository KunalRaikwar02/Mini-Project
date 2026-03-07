for(let i=0;i<60;i++){

let p=document.createElement("div");
p.classList.add("particle");

p.style.left=Math.random()*100+"vw";
p.style.animationDuration=(6+Math.random()*8)+"s";
p.style.opacity=Math.random();

document.body.appendChild(p);

}