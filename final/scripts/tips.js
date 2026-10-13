
const tipContainer = document.querySelector("#tip-container");

async function displayRandomTip() {
    try {
        // Fetch the tips from the JSON file
        const response = await fetch("./data/tips.json");

        if (!response.ok) {
            throw new Error("Could not load the study tips.");
        }

        // Convert the response into a JavaScript array
        const tips = await response.json();

        // Check whether the array contains any tips
        if (!Array.isArray(tips) || tips.length === 0) {
            throw new Error("No study tips were found.");
        }

        // Select a random tip
        const randomIndex = Math.floor(Math.random() * tips.length);
        const randomTip = tips[randomIndex];

        // Display the selected tip
        tipContainer.innerHTML = `
            <h3>${randomTip.title}</h3>
            <p>${randomTip.tip}</p>
            <span class="tip-category">
                ${randomTip.category}
            </span>
        `;

    } catch (error) {
        console.error("Error loading study tip:", error);

        tipContainer.textContent =
            "Study tip unavailable. Please try again later.";
    }
}

// Display a random tip when the page loads
displayRandomTip();
