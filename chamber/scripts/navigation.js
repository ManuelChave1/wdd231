const btnHumburguer = document.querySelector("#btn-humburguer")
const navigation = document.querySelector("#navigation")
const btnActive = document.querySelector(".active")
const unorderList = document.querySelector("#unorder-List")

btnHumburguer.addEventListener("click", () => {
    btnHumburguer.classList.toggle("show")
    navigation.classList.toggle("show")
})

unorderList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    const a = e.target.closest("a");
    if (!li && !a) {
        return
    }

    unorderList.querySelectorAll("li").forEach((link) => {
        link.classList.remove("active")
    })
    unorderList.querySelectorAll("a").forEach((Alink) => {
        Alink.classList.remove("link-color")
    })

    li.classList.add("active")
    a.classList.add("link-color")
})