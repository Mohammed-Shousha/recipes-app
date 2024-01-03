import { createContext, useReducer, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { setUserData } from './actions'

const DataContext = createContext()

export const useDataState = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useDataState must be used within a DataProvider')
  }
  return context.state
}

export const useDataDispatch = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useStateDispatch must be used within a DataProvider')
  }
  return context.dispatch
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
  searchRecipes: [],
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

    case 'SET_SEARCH_RECIPES':
      return {
        ...state,
        searchRecipes: action.payload,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await AsyncStorage.getItem('StateData')
        if (jsonData) {
          dispatch(setUserData(JSON.parse(jsonData)))
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
        dispatch,
        state,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
