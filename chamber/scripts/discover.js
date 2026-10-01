import { places } from "./data/places.mjs";

const discoverCards = document.querySelector("#discover-cards")

creatCards()

console.log("hello im here")

function creatCards() {
    try {

        places.forEach(element => {
            let card = document.createElement("section");
            let title = document.createElement("h2");

            let image = document.createElement("figure");
            let address = document.createElement("address");
            let description = document.createElement("p");
            let btnLearnMore = document.createElement("button");

            title.textContent = element.name;
            address.textContent = element.address;
            description.textContent = element.description
            image.setAttribute("src", element.photo)
            image.setAttribute("alt", `${element.name} image`)
            image.setAttribute("loading", "lazy")

            btnLearnMore.value = "learn More"

            card.append(
                title,
                address,
                description,
                image,
                btnLearnMore
            )
            discoverCards.appendChild(card)

        })

    } catch (error) {
        console.error("Error:", error)
    }
}