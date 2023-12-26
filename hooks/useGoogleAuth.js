import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { useMutation } from '@apollo/client'
import { useAuthRequest } from 'expo-auth-session/providers/google'
import { useNavigation } from '@react-navigation/native'
import * as WebBrowser from 'expo-web-browser'

import { useDataContext } from '@context'

import { HANDLE_GOOGLE_AUTH } from '@utils/graphql/mutations'
import { GOOGLE_API_URL } from '@utils/constants'

import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from '@env'

WebBrowser.maybeCompleteAuthSession()
const useProxy = Platform.select({ web: false, default: false })

export const useGoogleAuth = () => {
  const { authenticateUser } = useDataContext()
  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)

  const [GoogleAuth] = useMutation(HANDLE_GOOGLE_AUTH, {
    onCompleted({ GoogleAuth }) {
      if (GoogleAuth.id) {
        const { name, email, favRecipes, recipes, image, password } = GoogleAuth

        authenticateUser({
          name,
          email,
          password,
          image,
          favRecipes,
          userRecipes: recipes,
        })
      }

      navigation.navigate('User')
    },
  })

  const [request, response, promptAsync] = useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID,
  })

  useEffect(() => {
    const getUserData = async () => {
      if (response?.type === 'success') {
        const { authentication } = response
        const res = await fetch(GOOGLE_API_URL(authentication.accessToken))
        const result = await res.json()
        const { email, name, picture } = result
        await GoogleAuth({
          variables: {
            email,
            name,
            image: picture,
          },
        })
        setLoading(false)
      }
    }

    getUserData()
  }, [response])

  const handleGoogleAuth = () => {
    setLoading(true)
    promptAsync({ useProxy, showInRecents: true })
  }

  return { handleGoogleAuth, loading }
}
