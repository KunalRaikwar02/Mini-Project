document.addEventListener("click", function (event) {

    let hello = document.createElement("div");

    hello.classList.add("hello");

    hello.innerText = "Hello Hello 👋";

    hello.style.left = event.clientX + "px";
    hello.style.top = event.clientY + "px";

    document.body.appendChild(hello);

    setTimeout(function () {
        hello.remove();
    }, 800);

});