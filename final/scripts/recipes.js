
const recipesList = document.querySelector("#recipes-list");
const searchInput = document.querySelector("#search-input");
const categorySelect = document.querySelector("#category-select");
const emptyMessage = document.querySelector("#empty-message");

let allRecipes = [];

async function loadRecipes() {
  try {
    const response = await fetch("data/recipes.json");
    allRecipes = await response.json();

    showRecipes();
  } catch (error) {
    recipesList.innerHTML = "<p>Could not load recipes.</p>";
    console.log("Error loading recipes:", error);
  }
}

function showRecipes() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  let filteredRecipes = allRecipes;

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];


  filteredRecipes = filteredRecipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(searchText);
  });

  if (selectedCategory !== "All") {
    filteredRecipes = filteredRecipes.filter((recipe) => {
      return recipe.category === selectedCategory;
    });
  }

  recipesList.replaceChildren();

  filteredRecipes.forEach((recipe) => {
    const isFavorite = favorites.includes(recipe.id);

    const article = document.createElement("article");
    article.classList.add("recipe-card");

    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;

    article.appendChild(image);

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
    time.textContent = `◷ ${recipe.time} min`;

    const servings = document.createElement("span");
    servings.textContent = `♟ ${recipe.servings} servings`;

    recipeMeta.appendChild(time);
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
    favoriteButton.classList.add("favorite-button");
    favoriteButton.dataset.id = recipe.id;
    favoriteButton.setAttribute(
      "aria-label",
      isFavorite ? `Remove ${recipe.name} from favorites` : `Save ${recipe.name} to favorites`
    );

    if (isFavorite) {
      favoriteButton.classList.add("is-favorite");
    }

    favoriteButton.textContent = isFavorite ? "♥ Saved" : "♡ Favorite";

    cardActions.appendChild(favoriteButton);

    cardContent.appendChild(cardActions);
    article.appendChild(cardContent);

    recipesList.appendChild(article);
  });

  emptyMessage.classList.toggle("hidden", filteredRecipes.length !== 0);

  addFavoriteButtons();
}

function addFavoriteButtons() {
  const buttons = document.querySelectorAll(".favorite-button");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = Number(button.dataset.id);
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      if (favorites.includes(id)) {
        favorites = favorites.filter(function (favoriteId) {
          return favoriteId !== id;
        });
      } else {
        favorites.push(id);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      showRecipes();
    });
  });
}

searchInput.addEventListener("input", showRecipes);
categorySelect.addEventListener("change", showRecipes);

loadRecipes();


const recipeDialog = document.querySelector("#recipe-dialog");
const closeDialogButton = document.querySelector("#close-dialog");

function openRecipeDialog(recipe) {
  document.querySelector("#dialog-image").src = recipe.image;
  document.querySelector("#dialog-image").alt = recipe.name;

  document.querySelector("#dialog-title").textContent = recipe.name;
  document.querySelector("#dialog-category").textContent = recipe.category;
  document.querySelector("#dialog-description").textContent =
    recipe.description;

  document.querySelector("#dialog-time").textContent =
    `◷ ${recipe.time} min`;

  document.querySelector("#dialog-servings").textContent =
    `♟ ${recipe.servings} servings`;

  recipeDialog.showModal();
}

closeDialogButton.addEventListener("click", () => {
  recipeDialog.close();
});
