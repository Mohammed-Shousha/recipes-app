import { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const initData = {
  name: '',
  email: '',
  password: '',
  image: '',
  favRecipes: null,
  recipes: null,
}

const RecipesContext = createContext()
const DataContext = createContext()

export const useDataContext = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export const useRecipesContext = () => {
  const context = useContext(RecipesContext)
  if (!context) {
    throw new Error('useRecipes must be used within a RecipesProvider')
  }
  return context
}

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

  useEffect(() => {
    //store saved data to state
    AsyncStorage.getItem('Data').then((jsonData) => {
      if (jsonData) {
        setUserData(JSON.parse(jsonData)) //json 'string' to object
      }
    })
    AsyncStorage.getItem('isSignedIn').then((isSignedIn) => {
      if (isSignedIn) {
        setIsSignedIn(isSignedIn === 'true') //string to boolean
      }
    })
  }, [])

  useEffect(() => {
    //store state to saved data
    const jsonData = JSON.stringify(userData) //object to json 'string'
    if (userData !== initData) {
      AsyncStorage.setItem('Data', jsonData)
    }
    AsyncStorage.setItem('isSignedIn', `${isSignedIn}`) //boolean to string
  }, [userData, isSignedIn])

  return (
    <DataContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
        userData,
        setUserData,
        loading,
        setLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
