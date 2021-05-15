import React from 'react'
import { StatusBar } from 'react-native'
import { NativeRouter, Route, Switch } from 'react-router-native'
import Main from './Pages/Main/Main'
import Search from './Pages/Search/Search'
import RecipePage from './Pages/RecipePage/RecipePage'
import UserRecipePage from './Pages/UserRecipePage/UserRecipePage'
import Favourite from './Pages/Favourite/Favourite'
import User from './Pages/User/User'
import EditProfile from './Pages/User/EditProfile'
import UserRecipes from './Pages/User/UserRecipes'
import AddRecipe from './Pages/User/AddRecipe'
import Profile from './Pages/Profile/Profile'
import SignIn from './Pages/Forms/SignIn'
import SignUp from './Pages/Forms/SignUp'
import Nav from './Containers/Nav'
import PrivateRoute from './Containers/PrivateRoute'
import { Title } from './Components/Texts'
import { DataProvider, RecipesProvider } from './Data/Context'
import {
   ApolloClient,
   InMemoryCache,
   ApolloProvider,
   createHttpLink
} from "@apollo/client"

const link = createHttpLink({
   uri: "http://192.168.1.2:5000/graphql",
   credentials: 'include'
});

const client = new ApolloClient({
   uri: "http://192.168.1.2:5000/graphql",
   cache: new InMemoryCache(),
})

const App = () => (
   <ApolloProvider client={client}>
      <RecipesProvider>
         <DataProvider>
            <NativeRouter>
               <Switch>
                  <PrivateRoute path='/user'>
                     <User />
                  </PrivateRoute>
                  <PrivateRoute path='/editprofile'>
                     <EditProfile />
                  </PrivateRoute>
                  <Route path='/userrecipes/:id'>
                     <UserRecipePage />
                  </Route>
                  <PrivateRoute path='/userrecipes'>
                     <UserRecipes />
                  </PrivateRoute>
                  <PrivateRoute path='/addrecipe'>
                     <AddRecipe />
                  </PrivateRoute>
                  <Route path='/signin'>
                     <SignIn />
                  </Route>
                  <Route path='/signup'>
                     <SignUp />
                  </Route>
                  <Route path='/profile'>
                     <Profile />
                  </Route>
                  <PrivateRoute path='/favourite'>
                     <Favourite />
                  </PrivateRoute>
                  <Route path='/search'>
                     <Search />
                  </Route>
                  <Route path='/recipes/:id'>
                     <RecipePage />
                  </Route>
                  <Route path='/'>
                     <Main />
                  </Route>
                  <Route path='*'>
                     <Title> Under Construction</Title>
                  </Route>
               </Switch>
               <Nav />
               <StatusBar hidden={true} />
            </NativeRouter>
         </DataProvider>
      </RecipesProvider>
   </ApolloProvider>
)

export default App