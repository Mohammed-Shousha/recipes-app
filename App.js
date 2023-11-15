import React, { useContext, useEffect, useState } from 'react'
import { StatusBar, I18nManager } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import * as Network from 'expo-network'
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
import ChangePassword from './Pages/User/ChangePassword'
import AddRecipe from './Pages/User/AddRecipe'
import EditRecipe from './Pages/User/EditRecipe'
import Profile from './Pages/Profile/Profile'
import SignIn from './Pages/Forms/SignIn'
import Register from './Pages/Forms/Register'
import Recipes from './Containers/Recipes'
import { Icon } from './Components/Images'
import { Container } from './Components/Containers'
import { Title } from './Components/Texts'
import { DataProvider, RecipesProvider, DataContext } from './Data/Context'
import {
  NavIcons,
  IconsSizes,
  tabOptions,
  stackScreenOptions,
  recipeScreenOptions,
} from './Data/Database'
import noConnection from './Data/images/noConnection.png'

I18nManager.forceRTL(false)
I18nManager.allowRTL(false)

const client = new ApolloClient({
  uri: 'https://recipes-app-backend-plxd.onrender.com/graphql',
  //   uri: "http://192.168.1.18:7000/graphql",
  cache: new InMemoryCache(),
})

const Tab = createBottomTabNavigator()

const MainStack = createStackNavigator()
const MainStackScreen = () => (
  <MainStack.Navigator screenOptions={stackScreenOptions}>
    <MainStack.Screen name="Main" component={Main} />
    <MainStack.Screen name="Recipes" component={Recipes} />
    <MainStack.Screen
      name="Recipe"
      component={RecipePage}
      options={recipeScreenOptions}
    />
    <MainStack.Screen
      name="Sign In"
      component={SignIn}
      // options={{ presentation: "modal" }}
    />
    <MainStack.Screen name="Register" component={Register} />
  </MainStack.Navigator>
)

const SearchStack = createStackNavigator()
const SearchStackScreen = () => (
  <SearchStack.Navigator screenOptions={stackScreenOptions}>
    <SearchStack.Screen name="Search" component={Search} />
    <SearchStack.Screen name="Ingredients" component={ByIngredients} />
    <SearchStack.Screen name="Recipes" component={Recipes} />
    <SearchStack.Screen name="Time" component={ByTime} />
    <SearchStack.Screen name="Diet" component={ByDiet} />
    <SearchStack.Screen name="Calories" component={ByCalories} />
    <SearchStack.Screen
      name="Search Recipes"
      component={Recipes}
      options={{ headerTitle: 'Recipes' }}
    />
    <SearchStack.Screen
      name="Search Recipe"
      component={RecipePage}
      options={recipeScreenOptions}
    />
    <SearchStack.Screen
      name="Recipe"
      component={RecipePage}
      options={recipeScreenOptions}
    />
  </SearchStack.Navigator>
)

const FavouriteStack = createStackNavigator()
const FavouriteStackScreen = () => {
  const { isSignedIn } = useContext(DataContext)
  return (
    <FavouriteStack.Navigator screenOptions={stackScreenOptions}>
      {isSignedIn ? (
        <>
          <FavouriteStack.Screen
            name="Favorite Recipes"
            component={Favourite}
          />
          <FavouriteStack.Screen
            name="FavRecipe"
            component={RecipePage}
            options={recipeScreenOptions}
          />
        </>
      ) : (
        <>
          <FavouriteStack.Screen name="Profile" component={Profile} />
          <FavouriteStack.Screen name="Sign In" component={SignIn} />
          <FavouriteStack.Screen name="Register" component={Register} />
        </>
      )}
    </FavouriteStack.Navigator>
  )
}

const UserStack = createStackNavigator()
const UserStackScreen = () => {
  const { isSignedIn } = useContext(DataContext)
  return (
    <UserStack.Navigator screenOptions={stackScreenOptions}>
      {isSignedIn ? (
        <>
          <UserStack.Screen name="User" component={User} />
          <UserStack.Screen name="Edit Profile" component={EditProfile} />
          <UserStack.Screen name="Change Password" component={ChangePassword} />
          <UserStack.Screen name="Add Recipe" component={AddRecipe} />
          <UserStack.Screen name="Edit Recipe" component={EditRecipe} />
          <UserStack.Screen name="My Recipes" component={UserRecipes} />
          <UserStack.Screen
            name="User Recipe"
            component={UserRecipePage}
            options={recipeScreenOptions}
          />
        </>
      ) : (
        <>
          <UserStack.Screen name="Profile" component={Profile} />
          <UserStack.Screen name="Sign In" component={SignIn} />
          <UserStack.Screen name="Register" component={Register} />
        </>
      )}
    </UserStack.Navigator>
  )
}

const App = () => {
  const [connected, setConnected] = useState(true)

  useEffect(() => {
    const getConnectionStatus = async () => {
      const result = await Network.getNetworkStateAsync()
      if (!result.isInternetReachable) {
        setConnected(false)
      }
    }
    getConnectionStatus()
  })

  return (
    <>
      {connected ? (
        <ApolloProvider client={client}>
          <RecipesProvider>
            <DataProvider>
              <NavigationContainer>
                <Tab.Navigator
                  initialRouteName="Main-Tab"
                  screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                      const routeName = route.name.split('-')[0]
                      const iconName = focused
                        ? NavIcons[routeName][0]
                        : NavIcons[routeName][1]
                      const size = IconsSizes[routeName]
                      return <Icon source={iconName} size={size} />
                    },
                    ...tabOptions,
                  })}
                >
                  <Tab.Screen name="Main-Tab" component={MainStackScreen} />
                  <Tab.Screen name="Search-Tab" component={SearchStackScreen} />
                  <Tab.Screen
                    name="Favourite-Tab"
                    component={FavouriteStackScreen}
                  />
                  <Tab.Screen name="User-Tab" component={UserStackScreen} />
                </Tab.Navigator>
                <StatusBar hidden={true} />
              </NavigationContainer>
            </DataProvider>
          </RecipesProvider>
        </ApolloProvider>
      ) : (
        <Container center>
          <Icon source={noConnection} size="100" />
          <Title>
            You are not connected to the internet, check your connection and try
            again.
          </Title>
        </Container>
      )}
    </>
  )
}
export default App
