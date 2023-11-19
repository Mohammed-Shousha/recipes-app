import { API_KEY } from '@env'

const RECIPES_NUMBER = 50

const API_URL = `https://api.spoonacular.com/recipes`

const SEARCH_URL = `${API_URL}/complexSearch?apiKey=${API_KEY}&number=${RECIPES_NUMBER}`

export const QUERY_SEARCH = (query) => `${SEARCH_URL}&query=${query}`

//step size 15 min
export const TIME_SEARCH = (time) =>
  `${SEARCH_URL}&maxReadyTime=${time}&minReadyTime=${
    time - 15
  }&instructionsRequired=true`

export const DIET_SEARCH = (diet) =>
  `${SEARCH_URL}&diet=${diet}&instructionsRequired=true`

// step size 250 calories
export const CALORIES_SEARCH = (calories) =>
  `${SEARCH_URL}&maxCalories=${calories}&minCalories=${
    calories - 250
  }&instructionsRequired=true`

export const CATEGORY_SEARCH = (category) =>
  `${SEARCH_URL}&type=${category}&instructionsRequired=true`

export const RECIPE_URL = (id) =>
  `${API_URL}/${id}/information?apiKey=${API_KEY}&includeNutrition=true`

// ranking 2 to minimize missing ingredients, ingredients separated by comma
export const INGREDIENTS_SEARCH = (ingredients) =>
  `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&number=${RECIPES_NUMBER}&ranking=2&ingredients=${ingredients.join(
    ','
  )}`
