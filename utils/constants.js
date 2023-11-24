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

export const DEFAULT_RECIPE_IMAGE = 'https://source.unsplash.com/Mz__0nr1AM8'

export const GOOGLE_API_URL = (accessToken) =>
  `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`

export const BACKEND_URL =
  'https://recipes-app-backend-plxd.onrender.com/graphql'

export const RATE_FORM_URL = 'https://forms.gle/JrtqqiygVRPgsgxn9'

export const CLOUDINARY_URL =
  'https://api.cloudinary.com/v1_1/dn8thrc9l/image/upload'
