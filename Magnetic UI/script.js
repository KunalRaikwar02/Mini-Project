const button = document.querySelector(".magnet");
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove",(e)=>{

cursor.style.left = e.clientX + "px";
cursor.style.top = e.clientY + "px";

const rect = button.getBoundingClientRect();

const x = e.clientX - (rect.left + rect.width/2);
const y = e.clientY - (rect.top + rect.height/2);

const distance = Math.sqrt(x*x + y*y);

if(distance < 120){
button.style.transform = `translate(${x*0.25}px, ${y*0.25}px)`;
}else{
button.style.transform = `translate(0,0)`;
}

});