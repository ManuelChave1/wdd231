const btnHumburger = document.querySelector("#btn-humburger")
const navBar = document.querySelector("#nav-bar")


btnHumburger.addEventListener("click", () => {
    btnHumburger.classList.toggle("show")
    btnHumburger.ariaLabel = "Close menu"
    navBar.classList.toggle("show")
})