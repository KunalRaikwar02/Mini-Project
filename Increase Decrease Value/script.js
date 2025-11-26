var h2 = document.querySelector('h2')
var inc = document.querySelector('#inc')
var decr = document.querySelector('#decr')

var a = 0
document.body.style.backgroundColor = "black"
document.body.style.color = "white"
document.body.style.display = "flex"
document.body.style.flexDirection = "column"
document.body.style.justifyContent = "center"
document.body.style.alignItems = "center"
document.body.style.height = "100vh"
document.body.style.fontFamily = "Arial"

h2.style.fontSize = "60px"
h2.style.marginBottom = "30px"


function styleButton(btn){
    btn.style.padding = "12px 25px"
    btn.style.margin = "10px"
    btn.style.fontSize = "18px"
    btn.style.border = "none"
    btn.style.borderRadius = "10px"
    btn.style.cursor = "pointer"
    btn.style.background = "#9c9c9cff"
    btn.style.color = "black"
    btn.style.fontWeight = "bold"
}
styleButton(inc)
styleButton(decr)

inc.onmouseover = () => inc.style.background = "#ff9d00ff"
inc.onmouseout = () => inc.style.background = "#7c7c7cff"

decr.onmouseover = () => decr.style.background = "#ff9d00ff"
decr.onmouseout = () => decr.style.background = "#7c7c7cff"


inc.addEventListener('click', function(){
      a++
      h2.innerHTML = a
    })
    
    decr.addEventListener('click', function(){
        a--
        h2.innerHTML = a
})
