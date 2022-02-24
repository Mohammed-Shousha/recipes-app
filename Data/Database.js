import ingredientsPhoto from './images/Ingredients.png'
import dietPhoto from './images/Diet.png'
import caloriesPhoto from './images/Calories.png'
import timePhoto from './images/Time.png'
import breakfastPhoto from './images/Breakfast.png'
import dinnerPhoto from './images/Dinner.png'
import saladPhoto from './images/Salad.png'
import snacksPhoto from './images/Snacks.png'
import dessertsPhoto from './images/Desserts.png'
import drinksPhoto from './images/Drinks.png'
import quarter from './images/15-minutes.png'
import half from './images/30-minutes.png'
import threeQuarters from './images/45-minutes.png'
import hour from './images/60-minutes.png'
import tray from './images/tray.png'
import search from './images/search.png'
import heart from './images/heart.png'
import user from './images/user.png'
import greyTray from './images/greyTray.png'
import greySearch from './images/greySearch.png'
import greyHeart from './images/greyHeart.png'
import greyUser from './images/greyUser.png'
import vegan from './images/vegan.png'
import vegetarian from './images/vegetarian.png'
import keto from './images/keto.png'
import glutenFree from './images/glutenFree.png'
import logOut from './images/logout.png'
import next from './images/next.png'
import star from './images/star.png'
import myRecipes from './images/myRecipes.png'

export const passwordRegex = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[A-Za-z\d@$!%*#?&]{8,}$/

// number of recipes to be fetched
export const recipesNumber = 50

export const NavIcons = {
   Main: [tray, greyTray], //active , non-active
   Search: [search, greySearch],
   Favourite: [heart, greyHeart],
   User: [user, greyUser],
}

export const IconsSizes = {
   Main: 40,
   Search: 30,
   Favourite: 32,
   User: 31
}

export const userDetails = [
   {
      name: 'Edit Profile',
      img: next,
      size: 30,
      action: 'profile'
   },
   {
      name: 'My Recipes',
      img: myRecipes,
      size: 35,
      action: 'recipes'
   },
   {
      name: 'Rate Us',
      img: star,
      size: 32,
      action: 'rate'
   },
   {
      name: 'Log Out',
      img: logOut,
      size: 30,
      action: 'logout'
   },
]

export const dietCategories = [
   {
      name: 'Vegan',
      image: vegan,
      color: '#adce74',
      imgSize: 120
   },
   {
      name: 'Gluten Free',
      image: glutenFree,
      color: '#f2d974',
      imgSize: 120
   },
   {
      name: 'Ketogenic',
      image: keto,
      color: '#ecb390',
      imgSize: 120
   },
   {
      name: 'Vegetarian',
      image: vegetarian,
      color: '#bedbbb',
      imgSize: 120
   },
]

export const mainCategories = [
   {
      name: 'Breakfast',
      color: '#a3ddcb',
      image: breakfastPhoto,
      imgSize: 90
   },
   {
      name: 'Dinner',
      color: '#e6b566',
      image: dinnerPhoto,
      imgSize: 90
   },
   {
      name: 'Salads',
      color: '#e8e9a1',
      image: saladPhoto,
      imgSize: 95
   },
   {
      name: 'Snacks',
      color: '#bbbfca',
      image: snacksPhoto,
      imgSize: 90
   },
   {
      name: 'Desserts',
      color: '#e5707e',
      image: dessertsPhoto,
      imgSize: 90
   },
   {
      name: 'Drinks',
      color: '#e4e978',
      image: drinksPhoto,
      imgSize: 90
   },
]

export const dishTypes = ['Breakfast', 'Dinner', 'Salad', 'Snack', 'Dessert', 'Drink']

export const recipeDetails = ['Ingredients', 'Directions', 'Nutrients']

export const recipesTypes = ['breakfast', 'dinner', 'salad', 'snack', 'drink', 'dessert']


export const searchCategories = [
   {
      name: 'Ingredients',
      color: '#8bcdcd',
      image: ingredientsPhoto,
      imgSize: 120,
   },
   {
      name: 'Diet',
      color: '#cee397',
      image: dietPhoto,
      imgSize: 120,
   },
   {
      name: 'Calories',
      color: '#fcf876',
      image: caloriesPhoto,
      imgSize: 120,
   },
   {
      name: 'Time',
      color: '#fa7f72',
      image: timePhoto,
      imgSize: 120,
   },
]

export const timeCategories = [
   {
      name: '15 Minutes',
      color: '#e5707e',
      image: quarter,
      imgSize: 100
   },
   {
      name: '30 Minutes',
      color: '#70af85',
      image: half,
      imgSize: 100
   },
   {
      name: '45 Minutes',
      color: '#e6b566',
      image: threeQuarters,
      imgSize: 90
   },
   {
      name: '60 Minutes',
      color: '#aee1e1 ',
      image: hour,
      imgSize: 100
   }
]

export const caloriesCategories = [
   {
      name: 'Under 250',
      color: '#6a2c70',
      image: quarter,
      imgSize: 0
   },
   {
      name: '250 to 500',
      color: '#f08a5d',
      image: half,
      imgSize: 0
   },
   {
      name: '500 to 750',
      color: '#007965',
      image: threeQuarters,
      imgSize: 0
   },
   {
      name: '750 to 1000',
      color: '#b83b5e',
      image: hour,
      imgSize: 0
   }
]