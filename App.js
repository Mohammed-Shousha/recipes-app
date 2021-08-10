import React, { useContext } from 'react'
import { StatusBar } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Main from './Pages/Main/Main'
import Search from './Pages/Search/Search'
import ByIngredients from './Pages/Search/ByIngredients'
import ByDiet from './Pages/Search/ByDiet'
import ByTime from './Pages/Search/ByTime'
import ByCalories from './Pages/Search/ByCalories'
import RecipePage from './Pages/RecipePage/RecipePage'
import UserRecipePage from './Pages/UserRecipePage/UserRecipePage'
import Favourite from './Pages/Favourite/Favourite'
import User from './Pages/User/User'
import UserRecipes from './Pages/User/UserRecipes'
import EditProfile from './Pages/User/EditProfile'
import AddRecipe from './Pages/User/AddRecipe'
import Profile from './Pages/Profile/Profile'
import SignIn from './Pages/Forms/SignIn'
import SignUp from './Pages/Forms/SignUp'
import { Icon } from './Components/Images'
import Recipes from './Containers/Recipes'
import { DataProvider, RecipesProvider, DataContext } from './Data/Context'
import {
   ApolloClient,
   InMemoryCache,
   ApolloProvider,
   createHttpLink
} from "@apollo/client"
import { NavIcons, IconsSizes } from './Data/Database'
import Back from './Components/Back';


// const link = createHttpLink({
   //    uri: "http://192.168.1.2:5000/graphql",
   //    credentials: 'include'
   // })
   
const client = new ApolloClient({
   uri: "http://192.168.1.19:5000/graphql",
   cache: new InMemoryCache(),
})

const Tab = createBottomTabNavigator()

const screenOptions = {
   headerStyle: {
      backgroundColor: '#96fbc4',
      height: 50,
      borderBottomColor: '#96fbc4',
   },
   headerTitleStyle: {
      fontSize: 30,
      color: '#214151',
      fontFamily: 'sans-serif-light',
   },
   headerTitleAlign: 'center',
   headerBackImage: ()=> <Back/> ,
}

const recipeOptions = {
   headerTitle: '',
   headerTransparent: true,
   headerBackImage: () => <Back recipe /> 
}

const MainStack = createStackNavigator()
const MainStackScreen = () => (
   <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen name="Main" component={Main} />
      <MainStack.Screen name="Recipes" component={Recipes} />
      <MainStack.Screen name="Recipe" component={RecipePage} options={recipeOptions} />
   </MainStack.Navigator>
)

const SearchStack = createStackNavigator()
const SearchStackScreen = () => (
   <SearchStack.Navigator screenOptions={screenOptions}>
      <SearchStack.Screen name='Search' component={Search} />
      <SearchStack.Screen name='Ingredients' component={ByIngredients} />
      <SearchStack.Screen name="Recipes" component={Recipes} />
      <SearchStack.Screen name='Time' component={ByTime} />
      <SearchStack.Screen name='Diet' component={ByDiet} />
      <SearchStack.Screen name='Calories' component={ByCalories} />
      <SearchStack.Screen name='Search Recipes' component={Recipes} options={{ headerTitle: 'Recipes'}}/>
      <SearchStack.Screen name='Search Recipe' component={RecipePage} options={recipeOptions}/>
   </SearchStack.Navigator>
)

const FavouriteStack = createStackNavigator()
const FavouriteStackScreen = () => {
   const { isSignedIn } = useContext(DataContext)
   return (
      <FavouriteStack.Navigator screenOptions={screenOptions}>
         {isSignedIn ?
         <>
            <FavouriteStack.Screen name='Favorite Recipes' component={Favourite} />
               <FavouriteStack.Screen name="FavRecipe" component={RecipePage} options={recipeOptions} />
         </>
            :
            <>
               <FavouriteStack.Screen name="Profile" component={Profile} />
               <FavouriteStack.Screen name="SignIn" component={SignIn} />
               <FavouriteStack.Screen name="SignUp" component={SignUp} />
            </>
         }
      </FavouriteStack.Navigator>
   )
}

const UserStack = createStackNavigator()
const UserStackScreen = () => {
   const { isSignedIn } = useContext(DataContext)
   return (
      <UserStack.Navigator screenOptions={screenOptions}>
         {isSignedIn ?
            <>
               <UserStack.Screen name='User' component={User} />
               <UserStack.Screen name='Edit Profile' component={EditProfile} />
               <UserStack.Screen name='My Recipes' component={UserRecipes} />
               <UserStack.Screen name='Add Recipe' component={AddRecipe} />
               <UserStack.Screen name="User Recipes" component={UserRecipes} />
               <UserStack.Screen name="User Recipe" component={UserRecipePage} options={recipeOptions} />
            </>
            :
            <>
               <UserStack.Screen name='Profile' component={Profile} />
               <UserStack.Screen name="SignIn" component={SignIn} />
               <UserStack.Screen name="SignUp" component={SignUp} />
            </>
         }
      </UserStack.Navigator>
   )
}

const App = () => (
   <ApolloProvider client={client}>
      <RecipesProvider>
         <DataProvider>
            <NavigationContainer>
               <Tab.Navigator initialRouteName="Main" tabBarOptions={{ showLabel: false, style: { backgroundColor: '#eff7e1', justifyContent: 'space-between' } }}
                  screenOptions={({ route }) => ({
                     tabBarIcon: ({ focused }) => {

                        const iconName = focused ? NavIcons[route.name][0] : NavIcons[route.name][1]
                        const size = IconsSizes[route.name]
                        return <Icon source={iconName} size={size}/>
                     }
                  })}
               >
                  <Tab.Screen name="Main" component={MainStackScreen} />
                  <Tab.Screen name="Search" component={SearchStackScreen} />
                  <Tab.Screen name='Favourite' component={FavouriteStackScreen} />
                  <Tab.Screen name="User" component={UserStackScreen} />
               </Tab.Navigator>
               <StatusBar hidden={true} />
            </NavigationContainer>
         </DataProvider>
      </RecipesProvider>
   </ApolloProvider>
)

export default App