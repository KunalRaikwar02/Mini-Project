const items = document.querySelectorAll(".nav li");
const pill = document.getElementById("pill");
const wrapper = document.querySelector(".nav-wrapper");

function movePill(element){

    pill.style.width = element.offsetWidth + "px";
    pill.style.left = element.offsetLeft + "px";

    createParticles(
        element.offsetLeft + element.offsetWidth/2,
        element.offsetTop + element.offsetHeight/2
    );
}

function createParticles(x,y){

    for(let i=0;i<20;i++){

        const particle = document.createElement("span");

        particle.classList.add("particle");

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        const randomX = (Math.random()*160-80)+"px";
        const randomY = (Math.random()*160-80)+"px";

        particle.style.setProperty("--x",randomX);
        particle.style.setProperty("--y",randomY);

        wrapper.appendChild(particle);

        setTimeout(()=>{
            particle.remove();
        },800);
    }
}

items.forEach(item=>{

    item.addEventListener("click",()=>{

        document
        .querySelector(".nav li.active")
        .classList.remove("active");

        item.classList.add("active");

        movePill(item);
    });

});

window.onload = ()=>{
    movePill(document.querySelector(".nav li.active"));
};