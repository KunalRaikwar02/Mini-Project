var img = document.querySelector('img')
var love = document.querySelector('#love')

img.addEventListener('dblclick', function () {

    love.style.opacity = 1
    love.style.transform = 'translate(-50%,-50%) scale(1) rotate(0deg)'

    setTimeout(function () {
        love.style.transform = 'translate(-50%,-300%) scale(1) rotate(60deg)'
    }, 800)
    setTimeout(function () {
        love.style.opacity = 0
    }, 1000)
    setTimeout(function () {
        love.style.transform = 'translate(-50%,-50%) scale(0) rotate(-60deg)'
    }, 1200)

})


            //  or  \\\


// var img = document.querySelector("img");
// var love = document.querySelector("#love");

// img.addEventListener("dblclick", function () {

//     love.style.opacity = 1;
//     love.style.transform = "translate(-50%, -50%) scale(1.4)"; // big pop effect

//     setTimeout(function () {
//         love.style.transform = "translate(-50%, -50%) scale(1)"; // bounce compress
//     }, 150);

//     setTimeout(function () {
//         love.style.transform = "translate(-50%, -50%) scale(0.9)";
//         love.style.opacity = 0.85;
//     }, 350);

//     setTimeout(function () {
//         love.style.opacity = 0;
//     }, 550);

//     setTimeout(function () {
//         // reset so future double taps animate from zero
//         love.style.transform = "translate(-50%, -50%) scale(0)";
//     }, 750);
// });
