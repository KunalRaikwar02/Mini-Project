let glow = document.querySelector(".glow");

document.addEventListener("mousemove", function (e) {

  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";

});

let btn = document.querySelector("#btn");

btn.addEventListener("click", function () {
  alert("You clicked the button!");
});
