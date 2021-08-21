import React, { useContext, useRef, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { Container } from '../../Components/Containers'
import { ErrorText } from '../../Components/Texts'
import { FormInput } from '../../Components/Inputs'
import { ButtonText, FormButton } from '../../Components/Buttons'
import { DataContext } from '../../Data/Context'


const SignIn = ({ navigation }) => {

   const { setIsSignedIn, setUserData, setUserImage } = useContext(DataContext)

   const [active, setActive] = useState(null)
   const [signInError, setSignInError] = useState(null)

   const passwordRef = useRef()
   

   const HANDLE_SIGN_IN = gql`
      mutation SignIn($email: String!, $password: String!){
         SignIn(email: $email, password: $password){
            ... on User{
               id
               name
               email
               fav_recipes{
                  id
                  title
                  image
               }
               recipes{
                  title
                  time
                  type
                  ingredients
                  directions
                  image
               }
               image
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
            const { name, email, fav_recipes, recipes, image } = SignIn
            setIsSignedIn(true)
            navigation.navigate('User')
            setUserData({
               name,
               email,
               favRecipes: fav_recipes,
               recipes
            })
            setUserImage(image)

         } else if (SignIn.message) {
            setSignInError(SignIn.message)
            setTimeout(() => setSignInError(null), 3000)
         }
      }
   })


   return (
      <Container>
         <Formik
            initialValues={{
               email: '',
               password: '',
            }}
            validationSchema={Yup.object({
               email: Yup.string()
                  .email('Wrong Email')
                  .required('Required'),
               password: Yup.string()
                  .required('Required')
            })}
            onSubmit={({ email, password }) => {
               SignIn({
                  variables: {
                     email,
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
                     autoFocus={true}
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
                  >
                     <ButtonText size='25px'>
                        Sign In
                     </ButtonText>
                  </FormButton>
               </>
            )}
         </Formik>
      </Container>
   )
}

export default SignIn