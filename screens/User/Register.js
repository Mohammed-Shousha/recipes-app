import { useRef, useState, useEffect } from 'react'
import { Platform } from 'react-native'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from '@env'

import { ErrorText } from '@components/styles/Texts.styles'
import { FormInput } from '@components/styles/Inputs.styles'

import { useDataContext } from '@root/Context'

import { googleIcon } from '@assets/icons'

import { passwordRegex } from '@utils/database'
import { HANDLE_REGISTER, HANDLE_GOOGLE_AUTH } from '@utils/graphql/mutations'
import { GOOGLE_API_URL } from '@utils/constants'

import { LoadingDisplay, Button } from '@components'

WebBrowser.maybeCompleteAuthSession()
const useProxy = Platform.select({ web: false, default: false })

export const Register = ({ navigation }) => {
  const { setIsSignedIn, setUserData } = useDataContext()

  const [active, setActive] = useState(null)
  const [registerError, setRegisterError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const [Register] = useMutation(HANDLE_REGISTER, {
    onCompleted({ Register }) {
      if (Register.id) {
        const { name, email, password } = Register
        setIsSignedIn(true)
        navigation.navigate('User')
        setUserData({
          name,
          email,
          password,
        })
      } else if (Register.message) {
        setDisabled(false)
        setRegisterError(Register.message)
        setTimeout(() => setRegisterError(null), 3000)
      }
    },
  })

  const [GoogleAuth] = useMutation(HANDLE_GOOGLE_AUTH, {
    onCompleted({ GoogleAuth }) {
      if (GoogleAuth.id) {
        const { name, email, fav_recipes, recipes, image, password } =
          GoogleAuth
        setUserData({
          name,
          email,
          password,
          image,
          favRecipes: fav_recipes,
          recipes,
        })
        setIsSignedIn(true)
        navigation.navigate('User')
      }
    },
  })

  const [request, response, promptAsync] = Google.useAuthRequest({
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

  const handleGoogleAuth = () => {
    promptAsync({ useProxy, showInRecents: true })
    setLoading(true)
  }

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
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().min(2, 'Too Short').required('Required'),
        email: Yup.string().trim().email('Wrong Email').required('Required'),
        password: Yup.string()
          .required('Required')
          .matches(
            passwordRegex,
            'Password must contain at least one letter, at least one number, and be longer than 8 charaters'
          ),
        confirmPassword: Yup.string()
          .required('Required')
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      })}
      onSubmit={({ name, email, password }) => {
        setDisabled(true)
        Register({
          variables: {
            name,
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
            placeholder="Name"
            value={values.name}
            autoFocus={false}
            onChangeText={handleChange('name')}
            onFocus={() => setActive('name')}
            onBlur={() => {
              setActive(false)
              handleBlur('name')
            }}
            active={active === 'name'}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
          />
          {errors.name && touched.name && <ErrorText>{errors.name}</ErrorText>}
          <FormInput
            placeholder="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            onFocus={() => setActive('email')}
            onBlur={() => {
              setActive(false)
              handleBlur('email')
            }}
            active={active === 'email'}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            ref={emailRef}
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
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            ref={passwordRef}
          />
          {errors.password && touched.password && (
            <ErrorText>{errors.password}</ErrorText>
          )}
          <FormInput
            placeholder="Confirm Password"
            value={values.confirmPassword}
            secureTextEntry
            onChangeText={handleChange('confirmPassword')}
            onFocus={() => setActive('confirmPassword')}
            onBlur={() => {
              setActive(false)
              handleBlur('confirmPassword')
            }}
            active={active === 'confirmPassword'}
            returnKeyType="done"
            ref={confirmPasswordRef}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <ErrorText>{errors.confirmPassword}</ErrorText>
          )}
          {registerError && <ErrorText>{registerError}</ErrorText>}

          <Button onPress={handleSubmit} disabled={disabled} loading={disabled}>
            Register
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
