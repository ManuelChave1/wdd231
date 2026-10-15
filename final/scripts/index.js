
const featuredContainer = document.querySelector("#featured-recipes");
const LoadingRecipes = document.querySelector("#Loading-recipes");

async function loadFeaturedRecipes() {
  try {
    const response = await fetch("data/recipes.json");
    const recipes = await response.json();

    const featuredRecipes = recipes.slice(0, 4);
    featuredContainer.innerHTML = ""

    featuredRecipes.forEach((recipe) => {
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
        `Save ${recipe.name} to favorites`
      );
      favoriteButton.textContent = "♡";
      cardActions.appendChild(favoriteButton);

      cardContent.appendChild(cardActions);
      article.appendChild(cardContent);

      featuredContainer.appendChild(article);
    });

    addFavoriteButtons();
  } catch (error) {
    featuredContainer.innerHTML = "<p>Could not load recipes. Please open the site with Live Server.</p>";
    console.log("Error loading recipes:", error);
  }
}

function addFavoriteButtons() {
  const buttons = document.querySelectorAll(".favorite-button");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  buttons.forEach((button) => {
    const id = Number(button.dataset.id);

    if (favorites.includes(id)) {
      button.textContent = "♥";
      button.classList.add("is-favorite");
    }

    button.addEventListener("click", () => {
      let currentFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

      if (currentFavorites.includes(id)) {
        currentFavorites = currentFavorites.filter((favoriteId) => {
          return favoriteId !== id;
        });
        button.textContent = "♡";
        button.classList.remove("is-favorite");
      } else {
        currentFavorites.push(id);
        button.textContent = "♥";
        button.classList.add("is-favorite");
      }

      localStorage.setItem("favorites", JSON.stringify(currentFavorites));
    });
  });
}

loadFeaturedRecipes();


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

