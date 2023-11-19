import { useContext, useEffect, useState } from 'react'
import { StatusBar, I18nManager } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import * as Network from 'expo-network'
import {
  Main,
  Search,
  IngredientsSearch,
  DietSearch,
  TimeSearch,
  CaloriesSearch,
  Recipe,
  UserRecipe,
  Favourite,
  User,
  UserRecipes,
  EditProfile,
  ChangePassword,
  AddRecipe,
  EditRecipe,
  Profile,
  SignIn,
  Register,
} from '@screens'

import Recipes from '@root/screens/Recipes/Recipes'
import { Icon } from '@components/styles/Images.styles'

import { DataProvider, RecipesProvider, DataContext } from '@root/Context'

import {
  navIcons,
  iconsSizes,
  tabOptions,
  stackScreenOptions,
  recipeScreenOptions,
} from '@root/utils/database'

import noConnection from '@assets/images/noConnection.png'
import { ErrorDisplay } from '@components'

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
      component={Recipe}
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
    <SearchStack.Screen name="Ingredients" component={IngredientsSearch} />
    <SearchStack.Screen name="Recipes" component={Recipes} />
    <SearchStack.Screen name="Time" component={TimeSearch} />
    <SearchStack.Screen name="Diet" component={DietSearch} />
    <SearchStack.Screen name="Calories" component={CaloriesSearch} />
    <SearchStack.Screen
      name="Search Recipe"
      component={Recipe}
      options={recipeScreenOptions}
    />
    <SearchStack.Screen
      name="Recipe"
      component={Recipe}
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
            name="Favourite Recipes"
            component={Favourite}
          />
          <FavouriteStack.Screen
            name="Recipe"
            component={Recipe}
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
            component={UserRecipe}
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

  return connected ? (
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
                    ? navIcons[routeName][0]
                    : navIcons[routeName][1]
                  const size = iconsSizes[routeName]
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
            <StatusBar hidden />
          </NavigationContainer>
        </DataProvider>
      </RecipesProvider>
    </ApolloProvider>
  ) : (
    <ErrorDisplay
      message="You are not connected to the internet, check your connection and try again."
      icon={noConnection}
    />
  )
}
export default App
