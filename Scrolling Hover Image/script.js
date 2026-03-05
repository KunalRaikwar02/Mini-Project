const words = document.querySelectorAll(".track span");
const bg = document.getElementById("bgImage");

words.forEach(word=>{

const img = new Image();
img.src = word.dataset.img;

word.addEventListener("mouseenter",()=>{

bg.style.backgroundImage=`url(${word.dataset.img})`;
bg.style.opacity="1";

});

word.addEventListener("mouseleave",()=>{

bg.style.opacity="0";

});

});