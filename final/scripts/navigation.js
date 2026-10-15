const btnHumburguer = document.querySelector("#btn-humburguer")
const navigation = document.querySelector("#navBar")

btnHumburguer.addEventListener("click", () => {
    btnHumburguer.classList.toggle("show")
    navigation.classList.toggle("show")
})