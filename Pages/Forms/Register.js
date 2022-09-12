import React, { useContext, useRef, useState, useEffect } from 'react'
import { ActivityIndicator, Platform } from 'react-native'
import { gql, useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from '@env'
import { Container } from '../../Components/Containers'
import { ErrorText } from '../../Components/Texts'
import { FormInput } from '../../Components/Inputs'
import { ButtonText, FormButton } from '../../Components/Buttons'
import { Icon } from '../../Components/Images'
import { DataContext } from '../../Data/Context'
import { passwordRegex } from '../../Data/Database'
import googleIcon from '../../Data/images/google-icon.png'


WebBrowser.maybeCompleteAuthSession()
const useProxy = Platform.select({ web: false, default: false })


const Register = ({ navigation }) => {

   const { setIsSignedIn, setUserData } = useContext(DataContext)

   const [active, setActive] = useState(null)
   const [registerError, setRegisterError] = useState(null)
   const [loading, setLoading] = useState(false)
   const [disabled, setDisabled] = useState(false)

   const emailRef = useRef()
   const passwordRef = useRef()
   const confirmPasswordRef = useRef()

   const HANDLE_REGISTER = gql`
      mutation Register($name: String! ,$email: String!, $password: String!){
         Register(name: $name, email: $email, password: $password){
            ... on User{
               id
               name
               email
               password
            }
            ... on Error{
               message
            }
         }
      }
	`

   const [Register] = useMutation(HANDLE_REGISTER, {
      onCompleted({ Register }) {
         if (Register.id) {
            const { name, email, password } = Register
            setIsSignedIn(true)
            navigation.navigate('User')
            setUserData({
               name,
               email,
               password
            })
         } else if (Register.message) {
            setDisabled(false)
            setRegisterError(Register.message)
            setTimeout(() => setRegisterError(null), 3000)
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
            navigation.navigate('User')
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
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
               }}
               validationSchema={Yup.object({
                  name: Yup.string()
                     .min(2, 'Too Short')
                     .required('Required'),
                  email: Yup.string().trim()
                     .email('Wrong Email')
                     .required('Required'),
                  password: Yup.string()
                     .required('Required')
                     .matches(passwordRegex, 'Password must contain at least one letter, at least one number, and be longer than 8 charaters'),
                  confirmPassword: Yup.string()
                     .required('Required')
                     .oneOf([Yup.ref('password'), null], 'Passwords must match')
               })}
               onSubmit={({ name, email, password }) => {
                  setDisabled(true)
                  Register({
                     variables: {
                        name,
                        email: email.trim(),
                        password,
                     }
                  })
               }}
            >
               {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <>
                     <FormInput
                        placeholder='Name'
                        value={values.name}
                        autoFocus={false}
                        onChangeText={handleChange('name')}
                        onFocus={() => setActive('name')}
                        onBlur={() => {
                           setActive(false)
                           handleBlur('name')
                        }}
                        active={active === 'name' ? true : false}
                        returnKeyType='next'
                        onSubmitEditing={() => emailRef.current.focus()}
                     />
                     {errors.name && touched.name && <ErrorText>{errors.name}</ErrorText>}
                     <FormInput
                        placeholder='Email'
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onFocus={() => setActive('email')}
                        onBlur={() => {
                           setActive(false)
                           handleBlur('email')
                        }}
                        active={active === 'email' ? true : false}
                        returnKeyType='next'
                        onSubmitEditing={() => passwordRef.current.focus()}
                        ref={emailRef}
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
                        returnKeyType='next'
                        onSubmitEditing={() => confirmPasswordRef.current.focus()}
                        ref={passwordRef}
                     />
                     {errors.password && touched.password && <ErrorText>{errors.password}</ErrorText>}
                     <FormInput
                        placeholder='Confirm Password'
                        value={values.confirmPassword}
                        secureTextEntry={true}
                        onChangeText={handleChange('confirmPassword')}
                        onFocus={() => setActive('confirmPassword')}
                        onBlur={() => {
                           setActive(false)
                           handleBlur('confirmPassword')
                        }}
                        active={active === 'confirmPassword' ? true : false}
                        returnKeyType='done'
                        ref={confirmPasswordRef}
                     />
                     {errors.confirmPassword && touched.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
                     {registerError && <ErrorText>{registerError}</ErrorText>}
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
                           Register
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
                           Register with Google
                        </ButtonText>
                     </FormButton>
                  </>
               )}
            </Formik>
         }
      </Container>
   )
}

export default Register