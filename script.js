const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");
const recipeContainre = document.querySelector(".recipe_containre");
const recipeDetailsContent = document.querySelector(".recipe-details-content");

const fetchRecipes = async (query) => {
  recipeContainre.innerHTML = "Fetching Recipes....";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const response = await data.json();
    recipeContainre.innerHTML = "";
    response.meals.forEach((meal) => {
      const rescipeDiv = document.createElement("div");
      rescipeDiv.classList.add("recipe");
      rescipeDiv.innerHTML = `<img src=${meal.strMealThumb}>
   <div class="textContent">
    <h2>${meal.strMeal}</h2>
    <p>Dish : ${meal.strArea}</p>
    <p>Category : ${meal.strCategory}</p>
   </div>
  
    `;
      const button = document.createElement("button");
      button.textContent = "View Recipe";
      rescipeDiv.appendChild(button);

      button.addEventListener("click", () => {
        openRecipesPopup(meal);
      });

      recipeContainre.appendChild(rescipeDiv);
    });
  } catch (error) {
    recipeContainre.innerHTML = "Error in  Fetching Recipes....";
  }
};
const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }

  return ingredientsList;
};
const openRecipesPopup = (meal) => {
  console.log(meal);
  recipeDetailsContent.innerHTML = `
  <h2>${meal.strMeal}</h2>
  <h3>Inredents:</h3>
  <ul>${fetchIngredients(meal)}</ul>
  <div>
  <h3>Instuctions :</h3>
  <p>${meal.strInstructions} </p>
  </div>
  `;
  recipeDetailsContent.parentElement.style.display = "block";
};

recipeCloseBtn.addEventListener("click", () => {
  recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipeContainre.innerHTML = `<h2>Type The meal in the Search Box.</h2>`;
    return;
  }
  fetchRecipes(searchInput);
});
