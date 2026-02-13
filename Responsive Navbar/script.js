 let isHamburgerClicked = false;
      function toggleNavbar(x) {
        x.classList.toggle("change");
        document.querySelector('.left-navbar').classList.toggle('active');
        isHamburgerClicked = !isHamburgerClicked;
      }
