import React, { createContext, useState } from 'react'

export const RecipesContext = createContext()
export const DataContext = createContext()

export const RecipesProvider = ({ children }) => {

   const [recipes, setRecipes] = useState([])

   return (
      <RecipesContext.Provider value={{ recipes, setRecipes }}>
         {children}
      </RecipesContext.Provider>
   )
}

export const DataProvider = ({ children }) => {

   const [isSignedIn, setIsSignedIn] = useState(false)
   const [userData, setUserData] = useState({
      name: '',
      email: '',
      password:'',
      image: '',
      favRecipes: null,
      recipes: []
   })
   const [loading, setLoading] = useState(false)


   return (
      <DataContext.Provider value={{ isSignedIn, setIsSignedIn, userData, setUserData, loading, setLoading }}>
         {children}
      </DataContext.Provider>
   )
}