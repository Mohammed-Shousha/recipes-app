import React, { useContext, useRef, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { Container } from '../../Components/Containers'
import { ErrorText } from '../../Components/Texts'
import { FormInput } from '../../Components/Inputs'
import { ButtonText, FormButton } from '../../Components/Buttons'
import { DataContext } from '../../Data/Context'
import { passwordRegex } from '../../Data/Database'


const SingUp = ({ navigation }) => {

   const { setIsSignedIn, setUserData } = useContext(DataContext)

   const [active, setActive] = useState(null)
   const [signUpError, setSignUpError] = useState(null)

   const emailRef = useRef()
   const passwordRef = useRef()
   const confirmPasswordRef = useRef()


   const HANDLE_SIGN_UP = gql`
      mutation SignUp($name: String! ,$email: String!, $password: String!){
         SignUp(name: $name, email: $email, password: $password){
            ... on User{
               id
               name
               email
            }
            ... on Error{
               message
            }
         }
      }
	`

   const [SignUp] = useMutation(HANDLE_SIGN_UP, {
      onCompleted({ SignUp }) {
         if (SignUp.id) {
            const { name, email } = SignUp
            setIsSignedIn(true)
            navigation.navigate('User')
            setUserData({
               name,
               email
            })
         } else if (SignUp.message) {
            setSignUpError(SignUp.message)
            setTimeout(() => setSignUpError(null), 3000)
         }
      }
   })

   return (
      <Container>
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
               email: Yup.string()
                  .email('Wrong Email')
                  .required('Required'),
               password: Yup.string()
                  .required('Required')
                  .matches(passwordRegex, 'Password must contain at least one letter, at least one number, and be longer than 8 charaters'),
               confirmPassword: Yup.string()
                  .required('Required')
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
            })}
            onSubmit={({ name, email, password, confirmPassword }) => {
               SignUp({
                  variables: {
                     name,
                     email,
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
                     autoFocus={true}
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
                  {signUpError && <ErrorText>{signUpError}</ErrorText>}
                  <FormButton
                     onPress={handleSubmit}
                     width='70%'
                  >
                     <ButtonText size='25px'>
                        Sign Up
                     </ButtonText>
                  </FormButton>
               </>
            )}
         </Formik>
      </Container>
   )
}

export default SingUp