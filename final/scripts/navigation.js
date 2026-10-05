const navBar = document.querySelector("#navbar")
const btnHumburguer = document.querySelector("#humburguer")

btnHumburguer.addEventListener("click", () => {
    navBar.classList.toggle("show")
    btnHumburguer.classList.toggle("show")
})