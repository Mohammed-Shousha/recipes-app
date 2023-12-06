import ingredientsPhoto from '@assets/images/Ingredients.png'
import dietPhoto from '@assets/images/Diet.png'
import caloriesPhoto from '@assets/images/Calories.png'
import timePhoto from '@assets/images/Time.png'
import breakfastPhoto from '@assets/images/Breakfast.png'
import dinnerPhoto from '@assets/images/Dinner.png'
import saladPhoto from '@assets/images/Salad.png'
import snacksPhoto from '@assets/images/Snacks.png'
import dessertsPhoto from '@assets/images/Desserts.png'
import drinksPhoto from '@assets/images/Drinks.png'
import quarter from '@assets/images/15-minutes.png'
import half from '@assets/images/30-minutes.png'
import threeQuarters from '@assets/images/45-minutes.png'
import hour from '@assets/images/60-minutes.png'

import tray from '@assets/icons/tray.png'
import search from '@assets/icons/search.png'
import heart from '@assets/icons/heart.png'
import user from '@assets/icons/user.png'
import greyTray from '@assets/icons/greyTray.png'
import greySearch from '@assets/icons/greySearch.png'
import greyHeart from '@assets/icons/greyHeart.png'
import greyUser from '@assets/icons/greyUser.png'

import vegan from '@assets/images/vegan.png'
import vegetarian from '@assets/images/vegetarian.png'
import keto from '@assets/images/keto.png'
import glutenFree from '@assets/images/glutenFree.png'
import myRecipes from '@assets/images/myRecipes.png'

import logOut from '@assets/icons/logout.png'
import next from '@assets/icons/next.png'
import star from '@assets/icons/star.png'

import { Back } from '@components'

export const stackScreenOptions = {
  headerStyle: {
    backgroundColor: '#96fbc4',
    height: 50,
    borderBottomColor: '#96fbc4',
  },
  headerTitleStyle: {
    fontSize: 28,
    color: '#214151',
    fontFamily: 'sans-serif-light',
  },
  headerTitleAlign: 'center',
  headerBackImage: () => <Back />,
}

export const recipeScreenOptions = {
  headerTitle: '',
  headerTransparent: true,
  headerBackImage: () => <Back recipe />,
}

export const tabOptions = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: '#eff7e1',
  },
}

export const passwordRegex =
  /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[A-Za-z\d@$!%*#?&]{8,}$/

// number of recipes to be fetched
export const recipesNumber = 50

export const navIcons = {
  Main: [tray, greyTray], //active , non-active
  Search: [search, greySearch],
  Favourite: [heart, greyHeart],
  User: [user, greyUser],
}

export const iconsSizes = {
  Main: 40,
  Search: 30,
  Favourite: 32,
  User: 31,
}

export const userDetails = [
  {
    name: 'Edit Profile',
    img: next,
    size: 30,
    action: 'profile',
  },
  {
    name: 'My Recipes',
    img: myRecipes,
    size: 35,
    action: 'recipes',
  },
  {
    name: 'Rate Us',
    img: star,
    size: 32,
    action: 'rate',
  },
  {
    name: 'Log Out',
    img: logOut,
    size: 30,
    action: 'logout',
  },
]

export const dietCategories = [
  {
    name: 'Vegan',
    image: vegan,
    color: '#adce74',
    imgSize: 120,
  },
  {
    name: 'Gluten Free',
    image: glutenFree,
    color: '#f2d974',
    imgSize: 120,
  },
  {
    name: 'Ketogenic',
    image: keto,
    color: '#ecb390',
    imgSize: 120,
  },
  {
    name: 'Vegetarian',
    image: vegetarian,
    color: '#bedbbb',
    imgSize: 120,
  },
]

export const mainCategories = [
  {
    name: 'Breakfast',
    color: '#a3ddcb',
    image: breakfastPhoto,
    imgSize: 90,
  },
  {
    name: 'Dinner',
    color: '#e6b566',
    image: dinnerPhoto,
    imgSize: 90,
  },
  {
    name: 'Salads',
    color: '#e8e9a1',
    image: saladPhoto,
    imgSize: 95,
  },
  {
    name: 'Snacks',
    color: '#bbbfca',
    image: snacksPhoto,
    imgSize: 90,
  },
  {
    name: 'Desserts',
    color: '#e5707e',
    image: dessertsPhoto,
    imgSize: 90,
  },
  {
    name: 'Drinks',
    color: '#e4e978',
    image: drinksPhoto,
    imgSize: 90,
  },
]

export const dishTypes = [
  'Breakfast',
  'Dinner',
  'Salad',
  'Snack',
  'Dessert',
  'Drink',
]

export const RECIPES_TYPES = [
  'breakfast',
  'dinner',
  'salad',
  'snack',
  'drink',
  'dessert',
]

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
    imgSize: 100,
  },
  {
    name: '30 Minutes',
    color: '#70af85',
    image: half,
    imgSize: 100,
  },
  {
    name: '45 Minutes',
    color: '#e6b566',
    image: threeQuarters,
    imgSize: 90,
  },
  {
    name: '60 Minutes',
    color: '#aee1e1 ',
    image: hour,
    imgSize: 100,
  },
]

export const caloriesCategories = [
  {
    name: 'Under 250',
    color: '#6a2c70',
    image: quarter,
    imgSize: 0,
  },
  {
    name: '250 to 500',
    color: '#f08a5d',
    image: half,
    imgSize: 0,
  },
  {
    name: '500 to 750',
    color: '#007965',
    image: threeQuarters,
    imgSize: 0,
  },
  {
    name: '750 to 1000',
    color: '#b83b5e',
    image: hour,
    imgSize: 0,
  },
]
