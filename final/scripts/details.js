
const detailsContainer = document.querySelector("#recipe-details");
const params = new URLSearchParams(window.location.search);
const recipeId = Number(params.get("id"));

async function loadRecipeDetails() {
  try {
    const response = await fetch("data/recipes.json");
    const recipes = await response.json();

    const recipe = recipes.find((item) => {
      return item.id === recipeId;
    });

    detailsContainer.replaceChildren();

    if (!recipe) {
      const title = document.createElement("h1");
      title.textContent = "Recipe not found";

      const message = document.createElement("p");
      message.textContent = "We could not find that recipe.";

      const backLink = document.createElement("a");
      backLink.classList.add("button");
      backLink.href = "recipes.html";
      backLink.textContent = "Back to recipes";

      detailsContainer.appendChild(title);
      detailsContainer.appendChild(message);
      detailsContainer.appendChild(backLink);

      return;
    }

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const isFavorite = favorites.includes(recipe.id);

    const backLink = document.createElement("a");
    backLink.classList.add("back-link");
    backLink.href = "recipes.html";
    backLink.textContent = "← Back to recipes";

    detailsContainer.appendChild(backLink);

    const detailsLayout = document.createElement("div");
    detailsLayout.classList.add("details-layout");

    const leftColumn = document.createElement("div");

    const image = document.createElement("img");
    image.classList.add("details-image");
    image.src = recipe.image;
    image.alt = recipe.name;

    leftColumn.appendChild(image);

    const favoriteButton = document.createElement("button");
    favoriteButton.id = "favorite-button";
    favoriteButton.classList.add("button");

    favoriteButton.textContent = isFavorite ? "♥ Remove from favorites" : "♡ Save to favorites";

    leftColumn.appendChild(favoriteButton);

    const rightColumn = document.createElement("div");

    const category = document.createElement("span");
    category.classList.add("category");
    category.textContent = recipe.category;

    rightColumn.appendChild(category);

    const title = document.createElement("h1");
    title.textContent = recipe.name;

    rightColumn.appendChild(title);

    const recipeMeta = document.createElement("div");
    recipeMeta.classList.add("recipe-meta");

    const time = document.createElement("span");
    time.textContent = `◷ ${recipe.time} minutes`;

    const servings = document.createElement("span");
    servings.textContent = `♟ ${recipe.servings} servings`;

    recipeMeta.appendChild(time);
    recipeMeta.appendChild(servings);

    rightColumn.appendChild(recipeMeta);

    const description = document.createElement("p");
    description.classList.add("details-description");
    description.textContent = recipe.description;

    rightColumn.appendChild(description);

    const detailsColumns = document.createElement("div");
    detailsColumns.classList.add("details-columns");

    const ingredientsSection = document.createElement("section");

    const ingredientsTitle = document.createElement("h2");
    ingredientsTitle.textContent = "Ingredients";

    const ingredientsList = document.createElement("ul");

    recipe.ingredients.forEach((ingredient) => {
      const listItem = document.createElement("li");
      listItem.textContent = ingredient;
      ingredientsList.appendChild(listItem);
    });

    ingredientsSection.appendChild(ingredientsTitle);
    ingredientsSection.appendChild(ingredientsList);

    const instructionsSection = document.createElement("section");

    const instructionsTitle = document.createElement("h2");
    instructionsTitle.textContent = "Instructions";

    const instructionsList = document.createElement("ol");

    recipe.steps.forEach((step) => {
      const listItem = document.createElement("li");
      listItem.textContent = step;
      instructionsList.appendChild(listItem);
    });

    instructionsSection.appendChild(instructionsTitle);
    instructionsSection.appendChild(instructionsList);

    detailsColumns.appendChild(ingredientsSection);
    detailsColumns.appendChild(instructionsSection);

    rightColumn.appendChild(detailsColumns);

    detailsLayout.appendChild(leftColumn);
    detailsLayout.appendChild(rightColumn);

    detailsContainer.appendChild(detailsLayout);

    favoriteButton.addEventListener("click", function () {
      let currentFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

      if (currentFavorites.includes(recipe.id)) {
        currentFavorites = currentFavorites.filter((id) => {
          return id !== recipe.id;
        });
      } else {
        currentFavorites.push(recipe.id);
      }

      localStorage.setItem(
        "favorites", JSON.stringify(currentFavorites)
      );

      favoriteButton.textContent = currentFavorites.includes(recipe.id)
        ? "♥ Remove from favorites"
        : "♡ Save to favorites";
    });
  } catch (error) {
    detailsContainer.replaceChildren();

    const errorMessage = document.createElement("p");
    errorMessage.textContent =
      "Could not load this recipe. Please open the site with Live Server.";

    detailsContainer.appendChild(errorMessage);

    console.log("Error loading recipe details:", error);
  }
}

loadRecipeDetails();
