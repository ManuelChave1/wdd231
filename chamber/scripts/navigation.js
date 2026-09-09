const btnHumburguer = document.querySelector("#btn-humburguer")
const navigation = document.querySelector("#navigation")

btnHumburguer.addEventListener("click", () => {
    btnHumburguer.classList.toggle("show")
    navigation.classList.toggle("show")
})