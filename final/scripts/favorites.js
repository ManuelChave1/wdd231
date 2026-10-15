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

    favoritesList.replaceChildren();

    favoriteRecipes.forEach(function (recipe) {
        const article = document.createElement("article");
        article.classList.add("recipe-card");

        const img = document.createElement("img");
        img.src = recipe.image;
        img.alt = recipe.name;
        article.appendChild(img);

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        const title = document.createElement("h3");
        title.textContent = recipe.name;
        cardContent.appendChild(title);

        const category = document.createElement("span");
        category.classList.add("category");
        category.textContent = recipe.category;
        cardContent.appendChild(category);

        const description = document.createElement("p");
        description.textContent = recipe.description;
        cardContent.appendChild(description);

        const recipeMeta = document.createElement("div");
        recipeMeta.classList.add("recipe-meta");

        const time = document.createElement("span");
        time.textContent = `${recipe.time} min`;
        recipeMeta.appendChild(time);

        const servings = document.createElement("span");
        servings.textContent = `${recipe.servings} servings`;
        recipeMeta.appendChild(servings);

        cardContent.appendChild(recipeMeta);

        const cardActions = document.createElement("div");
        cardActions.classList.add("card-actions");

        const viewButton = document.createElement("button");
        viewButton.classList.add("small-link");
        viewButton.textContent = "View recipe →";

        viewButton.addEventListener("click", () => {
            openRecipeDialog(recipe);
        });

        cardActions.appendChild(viewButton);

        const favoriteButton = document.createElement("button");
        favoriteButton.classList.add("favorite-button", "is-favorite");
        favoriteButton.dataset.id = recipe.id;
        favoriteButton.textContent = "♥ Remove";
        favoriteButton.setAttribute(
            "aria-label",
            `Remove ${recipe.name} from favorites`
        );

        cardActions.appendChild(favoriteButton);

        cardContent.appendChild(cardActions);

        article.appendChild(cardContent);

        favoritesList.appendChild(article);
    });

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
const recipeDialog = document.querySelector("#recipe-dialog");
const closeDialogButton = document.querySelector("#close-dialog");

function openRecipeDialog(recipe) {
    document.querySelector("#dialog-image").src = recipe.image;
    document.querySelector("#dialog-image").alt = recipe.name;

    document.querySelector("#dialog-title").textContent = recipe.name;
    document.querySelector("#dialog-category").textContent = recipe.category;
    document.querySelector("#dialog-description").textContent = recipe.description;

    document.querySelector("#dialog-time").textContent =
        `◷ ${recipe.time} min`;

    document.querySelector("#dialog-servings").textContent =
        `♟ ${recipe.servings} servings`;

    recipeDialog.showModal();
}

closeDialogButton.addEventListener("click", () => {
    recipeDialog.close();
});
