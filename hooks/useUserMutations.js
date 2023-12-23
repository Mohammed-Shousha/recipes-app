import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'

import { useDataContext } from '@context'

import {
  HANDLE_SIGN_IN,
  HANDLE_REGISTER,
  HANDLE_CHANGING_DATA,
  HANDLE_CHANGING_PASSWORD,
} from '@utils/graphql/mutations'

export const useUserMutations = () => {
  const { authenticateUser, setUserData } = useDataContext()
  const navigation = useNavigation()

  const [error, setError] = useState(null)

  const handleCompleted = (
    mutationResponse,
    updateUserFunction,
    navigateTo = 'User'
  ) => {
    if (mutationResponse.id) {
      const {
        name,
        email,
        password,
        image,
        favRecipes,
        recipes: userRecipes,
      } = mutationResponse

      updateUserFunction?.({
        name,
        email,
        password,
        image,
        favRecipes,
        userRecipes,
      })

      navigation.navigate(navigateTo)
    } else if (mutationResponse.message) {
      setError(mutationResponse.message)
      setTimeout(() => setError(null), 3000)
    }
  }

  const [signIn] = useMutation(HANDLE_SIGN_IN, {
    onCompleted({ SignIn }) {
      handleCompleted(SignIn, authenticateUser)
    },
  })

  const [register] = useMutation(HANDLE_REGISTER, {
    onCompleted({ Register }) {
      handleCompleted(Register, authenticateUser)
    },
  })

  const [changeData] = useMutation(HANDLE_CHANGING_DATA, {
    onCompleted({ ChangeData }) {
      handleCompleted(ChangeData, setUserData)
    },
  })

  const [changePassword] = useMutation(HANDLE_CHANGING_PASSWORD, {
    onCompleted({ ChangePassword }) {
      handleCompleted(ChangePassword, undefined, 'Edit Profile')
    },
  })

  return {
    signIn,
    register,
    changeData,
    changePassword,
    error,
  }
}
