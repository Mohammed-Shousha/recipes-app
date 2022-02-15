import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const initData = {
   name: '',
   email: '',
   password: '',
   image: '',
   favRecipes: null,
   recipes: []
}

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
   const [userData, setUserData] = useState(initData)
   const [loading, setLoading] = useState(false)

   useEffect(() => { //store saved data to state
      AsyncStorage.getItem('Data').then((jsonData) => {
         if (jsonData) {
            setUserData(JSON.parse(jsonData)) //json 'string' to object
         }
      })
      AsyncStorage.getItem('isSignedIn').then((isSignedIn) => {
         if (isSignedIn) {
            setIsSignedIn((isSignedIn === 'true')) //string to boolean
         }
      })
   }, [])

   useEffect(() => { //store state to saved data
      const jsonData = JSON.stringify(userData) //object to json 'string'
      if (userData !== initData) {
         AsyncStorage.setItem('Data', jsonData)
      }
      AsyncStorage.setItem('isSignedIn', `${isSignedIn}`) //boolean to string
   }, [userData, isSignedIn])


   return (
      <DataContext.Provider value={{ isSignedIn, setIsSignedIn, userData, setUserData, loading, setLoading }}>
         {children}
      </DataContext.Provider>
   )
}