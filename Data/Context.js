import React, { createContext, useState } from 'react'

export const RecipesContext = createContext()
export const DataContext = createContext()

export const RecipesProvider = ({ children }) => {

   const [recipes, setRecipes] = useState([])
   const [favRecipes, setFavRecipes] = useState([])

   return (
      <RecipesContext.Provider value={{ recipes, setRecipes, favRecipes, setFavRecipes }}>
         {children}
      </RecipesContext.Provider>
   )
}

export const DataProvider = ({ children }) => {

   const [isSignedIn, setIsSignedIn] = useState(true)

   return (
      <DataContext.Provider value={{ isSignedIn, setIsSignedIn }}>
         {children}
      </DataContext.Provider>
   )
}