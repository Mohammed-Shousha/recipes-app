export const setUserData = (userData) => ({
  type: 'SET_USER_DATA',
  payload: userData,
})

export const setRecipes = (recipes) => ({
  type: 'SET_RECIPES',
  payload: recipes,
})

export const setSearchRecipes = (searchRecipes) => ({
  type: 'SET_SEARCH_RECIPES',
  payload: searchRecipes,
})

export const setFavRecipes = (favRecipes) => ({
  type: 'SET_FAV_RECIPES',
  payload: favRecipes,
})

export const setUserRecipes = (userRecipes) => ({
  type: 'SET_USER_RECIPES',
  payload: userRecipes,
})

export const authenticateUser = (userData) => ({
  type: 'AUTHENTICATE_USER',
  payload: userData,
})

export const logOut = () => ({ type: 'LOG_OUT' })
