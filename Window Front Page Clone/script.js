function openFolder() {
  document.getElementById("folderWindow").style.display = "block";
}

function closeFolder() {
  document.getElementById("folderWindow").style.display = "none";
}

/* DATE TIME */
function updateDateTime() {
  const el = document.getElementById("datetime");
  const now = new Date();
  el.innerHTML =
    now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
    "<br>" +
    now.toLocaleDateString();
}
setInterval(updateDateTime, 1000);
updateDateTime();

/* RIGHT CLICK */
function showMenu(e) {
  e.preventDefault();
  const menu = document.getElementById("contextMenu");
  menu.style.display = "block";
  menu.style.left = e.pageX + "px";
  menu.style.top = e.pageY + "px";
}

document.addEventListener("click", () => {
  document.getElementById("contextMenu").style.display = "none";
});
