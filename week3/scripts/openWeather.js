// const currentTemp = document.querySelector('#current-temp');
// const weatherIcon = document.querySelector('#weather-icon');
// const captionDesc = document.querySelector('figcaption');

const trier_lat = 49.76580092138007;
const trier_long = 6.643266756944;
const API_KEY = "1e788ed9305b1e798f62f97661071c4c";
const API_DEFAULT_KEY = "153708e038c85d994473a2e7a0b79637";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${trier_lat}&lon=${trier_long}&units=metric&appid=${API_KEY}`

async function apiFetch() {
    try {
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            // console.log(data)
            displayResults(data)
        }
        else {
            throw Error(await response.text());
        }

    } catch (error) {
        console.error(error)
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${______}.___`;
    let desc = data.weather[0].______;
    weatherIcon.setAttribute('___', _____);
    weatherIcon.setAttribute('___', _____);
    captionDesc.textContent = `${desc}`;
}

apiFetch();