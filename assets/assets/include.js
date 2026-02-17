document.addEventListener("DOMContentLoaded", function () {

  fetch("./navbar.html")   // IMPORTANT FIX
    .then(response => response.text())
    .then(data => {
      document.getElementById("navbar").innerHTML = data;

      const hamburger = document.querySelector(".hamburger");
      const menu = document.querySelector(".menu");

      if (hamburger && menu) {
        hamburger.addEventListener("click", function () {
          menu.classList.toggle("active");
        });

        menu.querySelectorAll("a").forEach(link => {
          link.addEventListener("click", () => {
            menu.classList.remove("active");
          });
        });
      }
    })
    .catch(error => console.error("Navbar load error:", error));
});