import { useEffect, useRef, useState } from 'react'
// import { Platform } from 'react-native'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from '@env'
import * as WebBrowser from 'expo-web-browser'
import { useAuthRequest } from 'expo-auth-session/providers/google'
import { ErrorText } from '@components/styles/Texts.styles'
import { FormInput } from '@components/styles/Inputs.styles'
import { useDataContext } from '@root/Context'

import { googleIcon } from '@assets/icons'

import useGoogleAuth from '@utils/hooks/useGoogleAuth'
import { HANDLE_SIGN_IN, HANDLE_GOOGLE_AUTH } from '@utils/graphql/mutations'
import { GOOGLE_API_URL } from '@utils/constants'

import { LoadingDisplay, Button } from '@components'

WebBrowser.maybeCompleteAuthSession()
// const useProxy = Platform.select({ web: false, default: false })

export const SignIn = ({ navigation }) => {
  const { authenticateUser } = useDataContext()

  const [active, setActive] = useState(null)
  const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const passwordRef = useRef()

  const [SignIn] = useMutation(HANDLE_SIGN_IN, {
    onCompleted({ SignIn }) {
      if (SignIn.id) {
        const { name, email, favRecipes, recipes, image, password } = SignIn

        authenticateUser({
          name,
          email,
          password,
          image,
          favRecipes,
          userRecipes: recipes,
        })

        navigation.navigate('User')
      } else if (SignIn.message) {
        setDisabled(false)
        setError(SignIn.message)
        setTimeout(() => setError(null), 3000)
      }
    },
  })

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

        navigation.navigate('User')
      }
    },
  })

  const [request, response, promptAsync] = useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID,
  })

  const getUserData = async (accessToken) => {
    const response = await fetch(GOOGLE_API_URL(accessToken))
    const result = await response.json()
    const { email, name, picture } = result
    GoogleAuth({
      variables: {
        email,
        name,
        image: picture,
      },
    })
  }

  // const handleGoogleAuth = () => {
  //   promptAsync({ useProxy, showInRecents: true })
  //   setLoading(true)
  // }

  const { handleGoogleAuth, loading } = useGoogleAuth()

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (response?.type === 'success') {
        const { authentication } = response
        getUserData(authentication.accessToken)
      }
    }
    return () => {
      isMounted = false
    }
  }, [response])

  if (loading) return <LoadingDisplay />

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().trim().email('Wrong Email').required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={({ email, password }) => {
        setDisabled(true)
        SignIn({
          variables: {
            email: email.trim(),
            password,
          },
        })
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <>
          <FormInput
            placeholder="Email"
            value={values.email}
            autoFocus={false}
            onChangeText={handleChange('email')}
            onFocus={() => setActive('email')}
            onBlur={() => {
              setActive(false)
              handleBlur('email')
            }}
            active={active === 'email'}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          {errors.email && touched.email && (
            <ErrorText>{errors.email}</ErrorText>
          )}
          <FormInput
            placeholder="Password"
            value={values.password}
            secureTextEntry
            onChangeText={handleChange('password')}
            onFocus={() => setActive('password')}
            onBlur={() => {
              setActive(false)
              handleBlur('password')
            }}
            active={active === 'password'}
            returnKeyType="done"
            ref={passwordRef}
          />
          {errors.password && touched.password && (
            <ErrorText>{errors.password}</ErrorText>
          )}
          {error && <ErrorText>{error}</ErrorText>}

          <Button
            onPress={handleSubmit}
            style={{ width: '70%', fontSize: '24px' }}
            disabled={disabled}
            loading={disabled}
          >
            Sign In
          </Button>
          <Button
            onPress={handleGoogleAuth}
            icon={googleIcon}
            style={{ width: '70%', iconSize: '28' }}
            disabled={!request}
            secondary
          />
        </>
      )}
    </Formik>
  )
}
