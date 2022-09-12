import React, { useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Platform } from 'react-native'
import { gql, useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from '@env'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { Container } from '../../Components/Containers'
import { ErrorText } from '../../Components/Texts'
import { FormInput } from '../../Components/Inputs'
import { Icon } from '../../Components/Images'
import { ButtonText, FormButton } from '../../Components/Buttons'
import { DataContext } from '../../Data/Context'
import googleIcon from '../../Data/images/google-icon.png'


WebBrowser.maybeCompleteAuthSession()
const useProxy = Platform.select({ web: false, default: false })


const SignIn = ({ navigation }) => {

   const { setIsSignedIn, setUserData } = useContext(DataContext)

   const [active, setActive] = useState(null)
   const [signInError, setSignInError] = useState(null)
   const [loading, setLoading] = useState(false)
   const [disabled, setDisabled] = useState(false)

   const passwordRef = useRef()

   const HANDLE_SIGN_IN = gql`
      mutation SignIn($email: String!, $password: String!){
         SignIn(email: $email, password: $password){
            ... on User{
               id
               name
               email
               password
               image
               fav_recipes{
                  id
                  title
                  image
               }
               recipes{
                  id
                  title
                  time
                  type
                  ingredients
                  directions
                  image
               }
            }
            ... on Error{
               message
            }
         }
      }
	`

   const [SignIn] = useMutation(HANDLE_SIGN_IN, {
      onCompleted({ SignIn }) {
         if (SignIn.id) {
            const { name, email, fav_recipes, recipes, image, password } = SignIn
            setIsSignedIn(true)
            navigation.navigate('User')
            setUserData({
               name,
               email,
               password,
               image,
               favRecipes: fav_recipes,
               recipes
            })
         } else if (SignIn.message) {
            setDisabled(false)
            setSignInError(SignIn.message)
            setTimeout(() => setSignInError(null), 3000)
         }
      }
   })

   const HANDLE_GOOGLE_AUTH = gql`
      mutation GoogleAuth($email: String!, $name: String!, $image: String){
         GoogleAuth(email: $email, name: $name, image: $image){
            id
            name
            email
            image
            password
            fav_recipes{
               id
               title
               image
            }
            recipes{
               id
               title
               time
               type
               ingredients
               directions
               image
            }
         }
      }
   `

   const [GoogleAuth] = useMutation(HANDLE_GOOGLE_AUTH, {
      onCompleted({ GoogleAuth }) {
         if (GoogleAuth.id) {
            const { name, email, fav_recipes, recipes, image, password } = GoogleAuth
            setUserData({
               name,
               email,
               password,
               image,
               favRecipes: fav_recipes,
               recipes
            })
            setIsSignedIn(true)
            navigation.navigate("User")
         }
      }
   })

   const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: ANDROID_CLIENT_ID,
      expoClientId: EXPO_CLIENT_ID,
   })

   const getUserData = async (accessToken) => {
      const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`)
      const result = await response.json()
      const { email, name, picture } = result
      GoogleAuth({
         variables: {
            email,
            name,
            image: picture,
         }
      })
   }

   useEffect(() => {
      let isMounted = true
      if (isMounted) {
         if (response?.type === "success") {
            const { authentication } = response
            getUserData(authentication.accessToken)
         }
      }
      return () => {
         isMounted = false
      }
   }, [response])


   return (
      <Container>
         {loading ?
            <Container center>
               <ActivityIndicator color='green' size='large' />
            </Container>
            :
            <Formik
               initialValues={{
                  email: '',
                  password: '',
               }}
               validationSchema={Yup.object({
                  email: Yup.string().trim()
                     .email('Wrong Email')
                     .required('Required'),
                  password: Yup.string()
                     .required('Required')
               })}
               onSubmit={({ email, password }) => {
                  setDisabled(true)
                  SignIn({
                     variables: {
                        email: email.trim(),
                        password,
                     }
                  })
               }}
            >
               {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <>
                     <FormInput
                        placeholder='Email'
                        value={values.email}
                        autoFocus={false}
                        onChangeText={handleChange('email')}
                        onFocus={() => setActive('email')}
                        onBlur={() => {
                           setActive(false)
                           handleBlur('email')
                        }}
                        active={active === 'email' ? true : false}
                        returnKeyType='next'
                        onSubmitEditing={() => passwordRef.current.focus()}
                     />
                     {errors.email && touched.email && <ErrorText>{errors.email}</ErrorText>}
                     <FormInput
                        placeholder='Password'
                        value={values.password}
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        onFocus={() => setActive('password')}
                        onBlur={() => {
                           setActive(false)
                           handleBlur('password')
                        }}
                        active={active === 'password' ? true : false}
                        returnKeyType='done'
                        ref={passwordRef}
                     />
                     {errors.password && touched.password && <ErrorText>{errors.password}</ErrorText>}
                     {signInError && <ErrorText>{signInError}</ErrorText>}
                     <FormButton
                        onPress={handleSubmit}
                        width='70%'
                        disabled={disabled}
                        rev={disabled}
                     >
                        <ButtonText
                           size='25px'
                           rev={disabled}
                        >
                           Sign in
                        </ButtonText>
                     </FormButton>
                     <FormButton
                        onPress={() => {
                           promptAsync({ useProxy, showInRecents: true })
                           setLoading(true)
                        }}
                        disabled={!request}
                        width='70%'
                        rev
                     >
                        <Icon
                           source={googleIcon}
                           size='23'
                        />
                        <ButtonText
                           size='20px'
                           rev
                        >
                           Sign in with Google
                        </ButtonText>
                     </FormButton>
                  </>
               )}
            </Formik>
         }
      </Container>
   )
}

export default SignIn