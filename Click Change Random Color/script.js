let box = document.querySelector('#box')
let btn = document.querySelector('button')

btn.addEventListener('click',function(){
    let a1 = Math.floor(Math.random()*256)
    let a2 = Math.floor(Math.random()*256)
    let a3 = Math.floor(Math.random()*256)

    box.style.backgroundColor = `rgb(${a1}, ${a2}, ${a3})`
})