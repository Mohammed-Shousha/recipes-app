import React, { useContext, useState, useRef } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { Container } from '../../Components/Containers'
import { ErrorText } from '../../Components/Texts'
import { ButtonText, StyledButton } from '../../Components/Buttons'
import { FormInput } from '../../Components/Inputs'
import { passwordRegex } from '../../Data/Database'
import { DataContext } from '../../Data/Context'


const ChangePassword = ({ navigation }) => {

   const { userData } = useContext(DataContext)
   const { email } = userData

   const [passwordError, setPasswordError] = useState(null)
   const [active, setActive] = useState(null)
   const [disabled, setDisabled] = useState(false)

   const passwordRef = useRef()
   const newPasswordRef = useRef()
   const confirmPasswordRef = useRef()

   const HANDLE_CHANGING_PASSWORD = gql`
      mutation ChangePassword($email: String!, $password: String!, $newPassword: String!){
         ChangePassword(email: $email, password: $password, newPassword: $newPassword){
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

   const [ChangePassword] = useMutation(HANDLE_CHANGING_PASSWORD, {
      onCompleted({ ChangePassword }) {
         if (ChangePassword.name) {
            navigation.navigate('Edit Profile')
         } else if (ChangePassword.message) {
            setDisabled(false)
            setPasswordError(ChangePassword.message)
            setTimeout(() => setPasswordError(null), 3000)
         }
      }
   })

   return (
      <Container>
         <Formik
            initialValues={{
               password: '',
               newPassword: '',
               confirmPassword: '',
            }}
            validationSchema={Yup.object({
               password: Yup.string()
                  .required('Required'),
               newPassword: Yup.string()
                  .required('Required')
                  .matches(passwordRegex, 'Password must contain at least one letter, at least one number, and be longer than 8 charaters'),
               confirmPassword: Yup.string()
                  .required('Required')
                  .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            })}
            onSubmit={({ password, newPassword }) => {
               setDisabled(true)
               ChangePassword({
                  variables: {
                     email,
                     password,
                     newPassword
                  }
               })
            }}
         >
            {({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (
               <>
                  <FormInput
                     placeholder='Current Password'
                     value={values.password}
                     onChangeText={handleChange('password')}
                     secureTextEntry={true}
                     onFocus={() => setActive('password')}
                     onBlur={() => {
                        setActive(false)
                        handleBlur('password')
                     }}
                     active={active === 'password' ? true : false}
                     returnKeyType='next'
                     onSubmitEditing={() => newPasswordRef.current.focus()}
                     ref={passwordRef}
                  />
                  {errors.password && touched.password && <ErrorText>{errors.password}</ErrorText>}
                  <FormInput
                     placeholder='New Password'
                     value={values.newPassword}
                     onChangeText={handleChange('newPassword')}
                     secureTextEntry={true}
                     onFocus={() => setActive('newPassword')}
                     onBlur={() => {
                        setActive(false)
                        handleBlur('newPassword')
                     }}
                     active={active === 'newPassword' ? true : false}
                     returnKeyType='next'
                     onSubmitEditing={() => confirmPasswordRef.current.focus()}
                     ref={newPasswordRef}
                  />
                  {errors.newPassword && touched.newPassword && <ErrorText>{errors.newPassword}</ErrorText>}
                  <FormInput
                     placeholder='Confirm Password'
                     value={values.confirmPassword}
                     onChangeText={handleChange('confirmPassword')}
                     secureTextEntry={true}
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
                  {passwordError && <ErrorText>{passwordError}</ErrorText>}
                  <StyledButton
                     width='70%'
                     onPress={handleSubmit}
                     disabled={disabled}
                     rev={disabled}
                  >
                     <ButtonText
                        size='28px'
                        rev={disabled}
                     >
                        Save
                     </ButtonText>
                  </StyledButton>
               </>
            )}
         </Formik>
      </Container>
   )
}

export default ChangePassword