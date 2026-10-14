const favoritesList = document.querySelector("#favorites-list");
const emptyMessage = document.querySelector("#empty-message");

async function loadFavorites() {
    try {
        const response = await fetch("data/recipes.json");
        const recipes = await response.json();

        showFavorites(recipes);
    } catch (error) {
        favoritesList.innerHTML =
            "<p>Could not load recipes. Please use Live Server.</p>";

        console.log("Error:", error);
    }
}

function showFavorites(recipes) {
    const favoriteIds =
        JSON.parse(localStorage.getItem("favorites")) || [];

    const favoriteRecipes = recipes.filter(function (recipe) {
        return favoriteIds.includes(recipe.id);
    });

    favoritesList.innerHTML = favoriteRecipes.map(function (recipe) {
        return `
            <article class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.name}">

                <div class="card-content">
                    <h3>${recipe.name}</h3>

                    <span class="category">
                        ${recipe.category}
                    </span>

                    <p>${recipe.description}</p>

                    <div class="recipe-meta">
                        <span>${recipe.time} min</span>
                        <span>${recipe.servings} servings</span>
                    </div>

                    <div class="card-actions">
                        <a class="small-link"
                           href="details.html?id=${recipe.id}">
                            View recipe →
                        </a>

                        <button
                            class="favorite-button is-favorite"
                            data-id="${recipe.id}">
                            ♥ Remove
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join("");

    emptyMessage.classList.toggle(
        "hidden",
        favoriteRecipes.length > 0
    );

    addRemoveButtons(recipes);
}

function addRemoveButtons(recipes) {
    const buttons =
        document.querySelectorAll(".favorite-button");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const id = Number(button.dataset.id);

            let favoriteIds =
                JSON.parse(localStorage.getItem("favorites")) || [];

            favoriteIds = favoriteIds.filter(function (favoriteId) {
                return favoriteId !== id;
            });

            localStorage.setItem(
                "favorites",
                JSON.stringify(favoriteIds)
            );

            showFavorites(recipes);
        });
    });
}

loadFavorites();
