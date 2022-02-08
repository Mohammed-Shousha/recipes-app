import React, { useContext, useRef, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { ANDROID_CLIENT_ID } from '@env'
import * as Google from "expo-google-app-auth"
import { Container } from '../../Components/Containers'
import { ErrorText } from '../../Components/Texts'
import { FormInput } from '../../Components/Inputs'
import { ButtonText, FormButton } from '../../Components/Buttons'
import { Icon } from '../../Components/Images'
import { DataContext } from '../../Data/Context'
import { passwordRegex } from '../../Data/Database'
import googleIcon from '../../Data/images/google-icon.png'


const Register = ({ navigation }) => {

   const { setIsSignedIn, setUserData } = useContext(DataContext)

   const [active, setActive] = useState(null)
   const [registerError, setRegisterError] = useState(null)
   const [loading, setLoading] = useState(false)

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
            setRegisterError(Register.message)
            setTimeout(() => setRegisterError(null), 3000)
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
                  Register({
                     variables: {
                        name,
                        email: email.trim(),
                        password,
                     }
                  })
               }}
            >
               {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                  <>
                     <FormInput
                        placeholder='Name'
                        value={values.name}
                        autoFocus={false}
                        onChangeText={handleChange('name')}
                        onFocus={() => setActive('name')}
                        onBlur={() => setActive(false)}
                        onBlur={handleBlur('name')}
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
                        onBlur={() => setActive(false)}
                        onBlur={handleBlur('email')}
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
                        onBlur={() => setActive(false)}
                        onBlur={handleBlur('password')}
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
                        onBlur={() => setActive(false)}
                        onBlur={handleBlur('confirmPassword')}
                        active={active === 'confirmPassword' ? true : false}
                        returnKeyType='done'
                        ref={confirmPasswordRef}
                     />
                     {errors.confirmPassword && touched.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
                     {registerError && <ErrorText>{registerError}</ErrorText>}
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
                           Register
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