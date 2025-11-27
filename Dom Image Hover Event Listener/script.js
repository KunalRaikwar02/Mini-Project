var chutki = document.querySelector('img')
var msg = document.querySelector('h2')

chutki.addEventListener('mouseenter', function(){
    msg.innerHTML = 'Chutki se dhur reh samja 😡'
});
chutki.addEventListener('mouseleave', function(){
    msg.innerHTML = 'Good aab aana bhi mat..'
});