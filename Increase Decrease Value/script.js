let value = document.querySelector("#value")
let inc = document.querySelector("#inc")
let decr = document.querySelector("#decr")
let reset = document.querySelector("#reset")

let count = 0

function animate(){
value.style.transform = "scale(1.3)"

setTimeout(()=>{
value.style.transform = "scale(1)"
},150)
}

function updateColor(){

if(count > 0){
value.style.color = "#00ff9d"
}

else if(count < 0){
value.style.color = "#ff4d4d"
}

else{
value.style.color = "white"
}

}

inc.addEventListener("click",function(){

count++
value.innerHTML = count
animate()
updateColor()

})

decr.addEventListener("click",function(){

count--
value.innerHTML = count
animate()
updateColor()

})

reset.addEventListener("click",function(){

count = 0
value.innerHTML = count
animate()
updateColor()

})