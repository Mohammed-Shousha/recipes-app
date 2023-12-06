import { useEffect, useState } from 'react'
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
  Recipes,
  UserRecipe,
  Favourite,
  User,
  UserRecipes,
  EditProfile,
  ChangePassword,
  RecipeForm,
  Profile,
  SignIn,
  Register,
} from '@screens'

import { Icon } from '@components/styles/Images.styles'

import { DataProvider, RecipesProvider, useDataContext } from '@root/Context'

import {
  navIcons,
  iconsSizes,
  tabOptions,
  stackScreenOptions,
  recipeScreenOptions,
} from '@utils/database'

import noConnection from '@assets/images/noConnection.png'
import { ErrorDisplay } from '@components'

import { BACKEND_URL } from '@utils/constants'
import { Container } from '@components/styles/Containers.styles'

I18nManager.forceRTL(false)
I18nManager.allowRTL(false)

const client = new ApolloClient({
  uri: BACKEND_URL,
  //   uri: "http://192.168.1.18:7000/graphql",
  cache: new InMemoryCache(),
})

const withContainer = (Component) => (props) => (
  <Container>
    <Component {...props} />
  </Container>
)

const Tab = createBottomTabNavigator()

const MainStack = createStackNavigator()
const MainStackScreen = () => (
  <MainStack.Navigator screenOptions={stackScreenOptions}>
    <MainStack.Screen name="Main" component={withContainer(Main)} />
    <MainStack.Screen name="Recipes" component={withContainer(Recipes)} />
    <MainStack.Screen
      name="Recipe"
      component={withContainer(Recipe)}
      options={recipeScreenOptions}
    />
    <MainStack.Screen name="Sign In" component={withContainer(SignIn)} />
    <MainStack.Screen name="Register" component={withContainer(Register)} />
  </MainStack.Navigator>
)

const SearchStack = createStackNavigator()
const SearchStackScreen = () => (
  <SearchStack.Navigator screenOptions={stackScreenOptions}>
    <SearchStack.Screen name="Search" component={withContainer(Search)} />
    <SearchStack.Screen name="Ingredients" component={IngredientsSearch} />
    <SearchStack.Screen name="Recipes" component={withContainer(Recipes)} />
    <SearchStack.Screen name="Time" component={withContainer(TimeSearch)} />
    <SearchStack.Screen name="Diet" component={withContainer(DietSearch)} />
    <SearchStack.Screen
      name="Calories"
      component={withContainer(CaloriesSearch)}
    />
    <SearchStack.Screen
      name="Recipe"
      component={withContainer(Recipe)}
      options={recipeScreenOptions}
    />
  </SearchStack.Navigator>
)

const FavouriteStack = createStackNavigator()
const FavouriteStackScreen = () => {
  const { isSignedIn } = useDataContext()
  return (
    <FavouriteStack.Navigator screenOptions={stackScreenOptions}>
      {isSignedIn ? (
        <>
          <FavouriteStack.Screen
            name="Favourite Recipes"
            component={withContainer(Favourite)}
          />
          <FavouriteStack.Screen
            name="Recipe"
            component={withContainer(Recipe)}
            options={recipeScreenOptions}
          />
        </>
      ) : (
        <>
          <FavouriteStack.Screen
            name="Profile"
            component={withContainer(Profile)}
          />
          <FavouriteStack.Screen
            name="Sign In"
            component={withContainer(SignIn)}
          />
          <FavouriteStack.Screen
            name="Register"
            component={withContainer(Register)}
          />
        </>
      )}
    </FavouriteStack.Navigator>
  )
}

const UserStack = createStackNavigator()
const UserStackScreen = () => {
  const { isSignedIn } = useDataContext()
  return (
    <UserStack.Navigator screenOptions={stackScreenOptions}>
      {isSignedIn ? (
        <>
          <UserStack.Screen name="User" component={withContainer(User)} />
          <UserStack.Screen
            name="Edit Profile"
            component={withContainer(EditProfile)}
          />
          <UserStack.Screen
            name="Change Password"
            component={withContainer(ChangePassword)}
          />
          <UserStack.Screen
            name="Add Recipe"
            component={withContainer(RecipeForm)}
          />
          <UserStack.Screen
            name="Edit Recipe"
            component={withContainer(RecipeForm)}
          />
          <UserStack.Screen
            name="My Recipes"
            component={withContainer(UserRecipes)}
          />
          <UserStack.Screen
            name="User Recipe"
            component={withContainer(UserRecipe)}
            options={recipeScreenOptions}
          />
        </>
      ) : (
        <>
          <UserStack.Screen name="Profile" component={withContainer(Profile)} />
          <UserStack.Screen name="Sign In" component={withContainer(SignIn)} />
          <UserStack.Screen
            name="Register"
            component={withContainer(Register)}
          />
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

  if (!connected) {
    return withContainer(ErrorDisplay)({
      message:
        'You are not connected to the internet, check your connection and try again.',
      icon: noConnection,
    })
  }

  return (
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
  )
}
export default App
