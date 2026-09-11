const companies = document.querySelector("#companies")
const btnGrid = document.querySelector("#btn-grid")
const btnList = document.querySelector("#btn-list")

btnList.addEventListener("click", () => {
    companies.innerHTML = ""
    companies.classList.remove("btn-grid")
    companies.classList.add("btn-list")
    creatCards();

})

btnGrid.addEventListener("click", () => {
    companies.innerHTML = ""
    companies.classList.remove("btn-list")
    companies.classList.add("btn-grid")
    creatCards()
})

creatCards()

async function creatCards() {
    try {
        const response = await fetch("./data/members.json")
        const data = await response.json();

        data.forEach(element => {
            let card = document.createElement("section");
            let busnessName = document.createElement("h2");

            let bussnessInfo = document.createElement("div");
            bussnessInfo.classList.add("bussnessInfo")

            let companieImgDiv = document.createElement("div");
            companieImgDiv.classList.add("companieImgDiv")

            let companieContactInfo = document.createElement("div");
            companieContactInfo.classList.add("companieContactInfo")

            let companieImageLogo = document.createElement("img");
            let companieImail = document.createElement("p");
            let companiePhoneNumber = document.createElement("p");
            let companieUrl = document.createElement("p");


            busnessName.textContent = element.name
            companieImageLogo.setAttribute("src", element.image)
            companieImageLogo.setAttribute("alt", `${element.name} image`)
            companieImageLogo.setAttribute("loading", "lazy")
            companieImail.innerHTML = `<strong>Email: </strong> ${element.email}`
            companiePhoneNumber.innerHTML = `<strong>Phone: </strong> ${element.phone}`
            companieUrl.innerHTML = `<strong>Url: </strong> ${element.url}`

            companieImgDiv.appendChild(companieImageLogo)
            companieContactInfo.append(
                companieImail,
                companiePhoneNumber,
                companieUrl
            )

            bussnessInfo.append(
                companieImgDiv,
                companieContactInfo
            )

            card.appendChild(busnessName)
            card.appendChild(bussnessInfo)

            companies.appendChild(card)
        });



    } catch (error) {
        console.error("Error:", error)
    }
}