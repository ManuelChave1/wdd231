import { places } from "../data/places.mjs"

const discoverCards = document.querySelector("#discover-cards")
let welcomeMessage = document.querySelector("#welcomeMessage")


let lastVisit = localStorage.getItem("lastVisit");

if (lastVisit === null) {
    lastVisit = new Date().toISOString();
    localStorage.setItem("lastVisit", lastVisit);
    welcomeMessage.textContent = "Welcome! Let us know if you have any questions."
} else {
    const lastDate = new Date(lastVisit);
    const now = new Date();

    const difference = now - lastDate;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (days < 1) {
        welcomeMessage.textContent = "Back so soon! Awesome!"
    } else if (days === 1) {
        welcomeMessage.textContent = `You last visited ${days} day ago.`
    } else if (days > 1) {
        welcomeMessage.textContent = `You last visited ${days} days ago.`
    }
}

creatCards()
function creatCards() {
    try {

        places.forEach(element => {
            let card = document.createElement("section");
            card.classList.add("discoverCard")

            let divTitle = document.createElement("div")
            divTitle.classList.add("divTitle")
            let title = document.createElement("h2");

            let figure = document.createElement("figure");
            figure.classList.add("figure")
            let image = document.createElement("img");

            let divAddDesBtn = document.createElement("div")
            divAddDesBtn.classList.add("divAddDesBtn")
            let address = document.createElement("address");
            let description = document.createElement("p");
            let btnLearnMore = document.createElement("button");

            title.textContent = element.name;
            address.textContent = element.address;
            description.textContent = element.description
            image.setAttribute("src", element.photo)
            image.setAttribute("alt", `${element.name} image`)
            image.setAttribute("loading", "lazy")

            btnLearnMore.textContent = "learn More"



            figure.appendChild(image)
            divTitle.appendChild(title)
            divAddDesBtn.append(
                description,
                address,
                btnLearnMore
            )

            card.append(
                figure,
                divTitle,
                divAddDesBtn

            )
            discoverCards.appendChild(card)

        })

    } catch (error) {
        console.error("Error:", error)
    }
}