import React from 'react'
import { StatusBar } from 'react-native'
import { NativeRouter, Route, Switch } from 'react-router-native'
import Main from './Pages/Main/Main'
import Search from './Pages/Search/Search'
import RecipePage from './Pages/RecipePage/RecipePage'
import Favourite from './Pages/Favourite/Favourite'
import User from './Pages/User/User'
import Profile from './Pages/Profile/Profile'
import SignIn from './Pages/Forms/SignIn'
import SignUp from './Pages/Forms/SignUp'
import Nav from './Containers/Nav'
import PrivateRoute from './Containers/PrivateRoute'
import { Title } from './Components/Texts'
import { DataProvider, RecipesProvider } from './Data/Context'

const App = () => (
   <RecipesProvider>
      <DataProvider>
         <NativeRouter>
            <Switch>
               <PrivateRoute path='/user'>
                  <User />
               </PrivateRoute>
               <Route path='/signin'>
                  <SignIn/>
               </Route>
               <Route path='/signup'>
                  <SignUp/>
               </Route>
               <Route path='/profile'>
                  <Profile/>
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
)

export default App