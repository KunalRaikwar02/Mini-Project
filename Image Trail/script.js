const images = [
  "https://picsum.photos/id/1015/300/400",
  "https://picsum.photos/id/1016/300/400",
  "https://picsum.photos/id/1018/300/400",
  "https://picsum.photos/id/1025/300/400",
  "https://picsum.photos/id/1035/300/400",
  "https://picsum.photos/id/1040/300/400",
  "https://picsum.photos/id/1050/300/400",
  "https://picsum.photos/id/1060/300/400"
];

let index = 0;
let lastX = 0;
let lastY = 0;

const threshold = 80;

document.addEventListener("mousemove",(e)=>{

  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;

  const distance = Math.sqrt(dx*dx + dy*dy);

  if(distance > threshold){

    createTrail(e.clientX,e.clientY);

    lastX = e.clientX;
    lastY = e.clientY;
  }

});

function createTrail(x,y){

  const img = document.createElement("img");

  img.src = images[index];

  img.classList.add("trail-image");

  img.style.left = x + "px";
  img.style.top = y + "px";

  document.body.appendChild(img);

  index++;

  if(index >= images.length){
    index = 0;
  }

  setTimeout(()=>{
    img.remove();
  },1000);

}