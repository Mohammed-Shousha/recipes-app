import React, { useContext, useRef, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ANDROID_CLIENT_ID } from '@env'
import { gql, useMutation } from '@apollo/client'
import * as Google from "expo-google-app-auth"
import { Container } from '../../Components/Containers'
import { ErrorText } from '../../Components/Texts'
import { FormInput } from '../../Components/Inputs'
import { Icon } from '../../Components/Images'
import { ButtonText, FormButton } from '../../Components/Buttons'
import { DataContext } from '../../Data/Context'
import googleIcon from '../../Data/images/google-icon.png'


const SignIn = ({ navigation }) => {

   const { setIsSignedIn, setUserData } = useContext(DataContext)

   const [active, setActive] = useState(null)
   const [signInError, setSignInError] = useState(null)
   const [loading, setLoading] = useState(false)

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
            setSignInError(SignIn.message)
            setTimeout(() => setSignInError(null), 3000)
         }
      }
   })

   const HANDLE_GOOGLE_SIGN_IN = gql`
      mutation GoogleSignIn($email: String!, $name: String!, $image: String){
         GoogleSignIn(email: $email, name: $name, image: $image){
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

   const [GoogleSignIn] = useMutation(HANDLE_GOOGLE_SIGN_IN, {
      onCompleted({ GoogleSignIn }) {
         if (GoogleSignIn.id) {
            const { name, email, fav_recipes, recipes, image, password } = GoogleSignIn
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

   const signInWithGoogle = async () => {
      try {
         const result = await Google.logInAsync({
            androidClientId: ANDROID_CLIENT_ID,
         })
         setLoading(true)

         if (result.type === "success") {
            const { email, name, photoUrl, id } = result.user
            GoogleSignIn({
               variables: {
                  email,
                  name,
                  image: photoUrl,
               }
            })

         }
      } catch (error) {
         setLoading(false)
         console.log(error)
      }
   }


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
                  SignIn({
                     variables: {
                        email: email.trim(),
                        password,
                     }
                  })
               }}
            >
               {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                  <>
                     <FormInput
                        placeholder='Email'
                        value={values.email}
                        autoFocus={false}
                        onChangeText={handleChange('email')}
                        onFocus={() => setActive('email')}
                        onBlur={() => setActive(false)}
                        onBlur={handleBlur('email')}
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
                        onBlur={() => setActive(false)}
                        onBlur={handleBlur('password')}
                        active={active === 'password' ? true : false}
                        returnKeyType='done'
                        ref={passwordRef}
                     />
                     {errors.password && touched.password && <ErrorText>{errors.password}</ErrorText>}
                     {signInError && <ErrorText>{signInError}</ErrorText>}
                     <FormButton
                        onPress={handleSubmit}
                        width='70%'
                        disabled={isSubmitting}
                        rev={isSubmitting}
                     >
                        <ButtonText
                           size='25px'
                           rev={isSubmitting}
                        >
                           Sign in
                        </ButtonText>
                     </FormButton>
                     <FormButton
                        onPress={signInWithGoogle}
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