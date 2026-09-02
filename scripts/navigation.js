const btnHumburger = document.querySelector("#btn-humburger")
const navBar = document.querySelector("#nav-bar")


btnHumburger.addEventListener("click", () => {
    btnHumburger.classList.toggle("show")
    navBar.classList.toggle("show")
})