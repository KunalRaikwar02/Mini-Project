const basket = document.getElementById("basket");
const scoreText = document.getElementById("score");
const coupon = document.getElementById("coupon");

let score = 0;

/* instant cursor basket */

document.addEventListener("mousemove", e => {

basket.style.left = e.clientX + "px";

});

/* particle */

function particles(x,y){

for(let i=0;i<6;i++){

let p=document.createElement("div");

p.style.position="absolute";
p.style.left=x+"px";
p.style.top=y+"px";

p.style.width="5px";
p.style.height="5px";

p.style.background="red";

document.body.appendChild(p);

let vx=(Math.random()-0.5)*6;
let vy=(Math.random()-0.5)*6;

let life=25;

let anim=setInterval(()=>{

p.style.left=(p.offsetLeft+vx)+"px";
p.style.top=(p.offsetTop+vy)+"px";

life--;

if(life<=0){

p.remove();
clearInterval(anim);

}

},20);

}

}

/* coin spawn */

function createCoin(){

let coin=document.createElement("div");

coin.classList.add("coin");

coin.style.left=Math.random()*window.innerWidth+"px";
coin.style.top="-40px";

document.body.appendChild(coin);

let fall=setInterval(()=>{

coin.style.top=coin.offsetTop+5+"px";

let coinRect=coin.getBoundingClientRect();
let basketRect=basket.getBoundingClientRect();

if(

coinRect.bottom > basketRect.top &&
coinRect.left < basketRect.right &&
coinRect.right > basketRect.left

){

particles(coinRect.left,coinRect.top);

coin.remove();

clearInterval(fall);

score++;

scoreText.textContent=score;

if(score>=10){

coupon.classList.add("show");

}

}

if(coin.offsetTop > window.innerHeight){

coin.remove();
clearInterval(fall);

}

},20);

}

/* spawn */

setInterval(createCoin,800);