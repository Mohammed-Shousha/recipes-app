import { createContext, useReducer, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DataContext = createContext()

export const useDataContext = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider')
  }
  return context
}

const initialState = {
  name: '',
  email: '',
  password: '',
  image: '',
  favRecipes: null,
  userRecipes: null,
  isSignedIn: false,
  recipes: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAV_RECIPES':
      return {
        ...state,
        favRecipes: action.payload,
      }

    case 'SET_USER_RECIPES':
      return {
        ...state,
        userRecipes: action.payload,
      }

    case 'SET_RECIPES':
      return {
        ...state,
        recipes: action.payload,
      }

    case 'SET_USER_DATA':
      return {
        ...state,
        ...action.payload,
      }

    case 'AUTHENTICATE_USER':
      return {
        ...state,
        ...action.payload,
        isSignedIn: true,
      }

    case 'LOG_OUT':
      return initialState

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setUserData = (userData) => {
    dispatch({ type: 'SET_USER_DATA', payload: userData })
  }

  const setRecipes = (recipes) => {
    dispatch({ type: 'SET_RECIPES', payload: recipes })
  }

  const setFavRecipes = (favRecipes) => {
    dispatch({ type: 'SET_FAV_RECIPES', payload: favRecipes })
  }

  const setUserRecipes = (userRecipes) => {
    dispatch({ type: 'SET_USER_RECIPES', payload: userRecipes })
  }

  const authenticateUser = (userData) => {
    dispatch({ type: 'AUTHENTICATE_USER', payload: userData })
  }

  const logOut = () => {
    dispatch({ type: 'LOG_OUT' })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await AsyncStorage.getItem('StateData')
        if (jsonData) {
          setUserData(JSON.parse(jsonData))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const saveStateToStorage = async () => {
      try {
        const jsonData = JSON.stringify(state)
        await AsyncStorage.setItem('StateData', jsonData)
      } catch (error) {
        console.error('Error saving state to storage:', error)
      }
    }

    saveStateToStorage()
  }, [state])

  return (
    <DataContext.Provider
      value={{
        setUserData,
        setRecipes,
        setFavRecipes,
        setUserRecipes,
        authenticateUser,
        logOut,
        ...state,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
