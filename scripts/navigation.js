const btnHumburger = document.querySelector("#btn-humburger")
const navBar = document.querySelector("#nav-bar")
const active = document.querySelector("#active")
active.addEventListener("click", (e) => {
    const li = e.target.closest("li")
    if (!li) {
        return
    }
    active.querySelectorAll("li").forEach(li => {
        li.classList.remove("active")
    })
    li.classList.add("active")
})


btnHumburger.addEventListener("click", () => {
    btnHumburger.classList.toggle("show")
    btnHumburger.ariaLabel = "Close menu"
    navBar.classList.toggle("show")
})

