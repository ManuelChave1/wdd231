const endPont = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cards = document.querySelector("#cards");

async function getProphetData() {
    try {
        const response = await fetch(endPont)
        const data = await response.json();
        // console.table(data.prophets)
        displayProphets(data.prophets)
    } catch (error) {
        // error(mensage.error)
    }
}

getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        let card = document.createElement("section");
        let fullName = document.createElement("h2");
        let portrait = document.createElement("img");
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        portrait.setAttribute("src", prophet.imageurl)
        portrait.setAttribute("alt", `${prophet.name} ${prophet.lastname} portrait `);
        portrait.setAttribute("loading", "lazy")
        portrait.setAttribute("width", "200px")
        portrait.setAttribute("higth", "250px")
        card.appendChild(fullName)
        card.appendChild(portrait)
        cards.appendChild(card)

    });
}
