const weatherInf = document.querySelector("#weather-info");
const companieSpotlight = document.querySelector("#companie-spotlights");

const maputo_lat = -25.970355239806477;
const maputo_long = 32.57055070612188;
const API_KEY = "1e788ed9305b1e798f62f97661071c4c";
const API_DEFAULT_KEY = "153708e038c85d994473a2e7a0b79637";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${maputo_lat}&lon=${maputo_long}&units=metric&appid=${API_KEY}`

weatherInformation()
async function weatherInformation() {
    try {
        let response = await fetch(url)
        let divWeatheDeateils = document.createElement("div");
        divWeatheDeateils.classList.add("divWeatheDeateils")


        if (!response.ok) {
            console.log("Error", response.status())
        }

        let data = await response.json()

        let divWeatheUnitDeateils = document.createElement("div")
        divWeatheUnitDeateils.classList.add("divWeatheUnitDeateils")

        let divTempDetaeils = document.createElement("div")
        divTempDetaeils.classList.add("divTempDetaeils")

        let weatherIcon = document.createElement("img")
        let weatherUnit = document.createElement("p")
        let weatherDeatil = document.createElement("p")
        let weatherHumidity = document.createElement("p")
        let weatherWind = document.createElement("p")
        let divUnitAndDetails = document.createElement("div")
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        weatherIcon.setAttribute("alt", `${data.weather[0].description}`)
        weatherIcon.setAttribute("loading", "lazy")

        weatherUnit.textContent = `${Math.round(data.main.temp)}ºC `;
        weatherDeatil.innerHTML = `${data.weather[0].description} <br> <br>H: ${data.main.temp_max} L: ${data.main.temp_min}`
        weatherHumidity.innerHTML = `Humidity <br> ${Math.round(data.main.humidity)}%`
        weatherWind.innerHTML = `Wind <br> ${Math.round(data.wind.speed)} km/h`

        divUnitAndDetails.appendChild(weatherUnit)
        divUnitAndDetails.appendChild(weatherDeatil)

        divWeatheUnitDeateils.appendChild(weatherIcon)
        divWeatheUnitDeateils.appendChild(divUnitAndDetails)

        divTempDetaeils.appendChild(weatherHumidity)
        divTempDetaeils.appendChild(weatherWind)

        divWeatheDeateils.appendChild(divWeatheUnitDeateils)
        divWeatheDeateils.appendChild(divTempDetaeils)

        weatherInf.appendChild(divWeatheDeateils)

    } catch (error) {
        console.error("Error: ", error);
    }
}

creatCards()
async function creatCards() {
    try {
        const response = await fetch("./data/members.json")
        const data = await response.json();

        const randomCompanies = [...data]
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);

        randomCompanies.forEach(element => {
            let card = document.createElement("section");
            let busnessName = document.createElement("h2");

            let bussnessInfo = document.createElement("div");
            bussnessInfo.classList.add("bussnessInfo")

            let companieImgDiv = document.createElement("div");
            companieImgDiv.classList.add("companieImgDiv")

            let companieContactInfo = document.createElement("div");
            companieContactInfo.classList.add("companieContactInfo")

            let memberLever = document.createElement("p")
            memberLever.classList.add("memberlevel")

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


            switch (element.membership_level) {
                case 1:
                    memberLever.innerHTML = `Membership level: Gold`
                    break;

                case 2:
                    memberLever.innerHTML = `Membership level: Silver`
                    break;
            }

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
            card.appendChild(memberLever)

            companieSpotlight.appendChild(card)
        });

    } catch (error) {
        console.error("Error:", error)
    }
}