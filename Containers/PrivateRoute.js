import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-native'
import { DataContext } from '../Data/Context'


const PrivateRoute = ({ children }) => {

   const { isSignedIn } = useContext(DataContext)

   return (
      <Route>
         {isSignedIn ?
            children
            :
            <Redirect to='/profile' />
         }
      </Route>
   )
}

export default PrivateRoute