var main = document.querySelector('main')
var cursor = document.querySelector('#cursor')

main.addEventListener('mousemove',function(val){
    cursor.style.left = val.x + 'px'
    cursor.style.top = val.y + 'px'
})