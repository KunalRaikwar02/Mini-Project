const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  cards.forEach((card) => {
    const title = card.dataset.title.toLowerCase();
    const text = card.innerText.toLowerCase();

    if (title.includes(searchValue) || text.includes(searchValue)) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
});