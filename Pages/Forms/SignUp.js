import React, { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Container } from '../../Components/Containers'
import { ErrorText, Title } from '../../Components/Texts'
import { FormInput } from '../../Components/Inputs'
import { ButtonText, FormButton } from '../../Components/Buttons'
import { PressableIcon, Icon } from '../../Components/Images'
import { DataContext } from '../../Data/Context'
import xImg from '../../Data/images/x.png'


const SingUp = () => {

   const { setIsSignedIn } = useContext(DataContext)
   const [active, setActive] = useState()
   const history = useHistory()
   const emailRef = useRef()
   const passwordRef = useRef()
   const confirmPasswordRef = useRef()


   return (
      <Container>
         <PressableIcon
            back
            onPress={() => history.goBack()}
         >
            <Icon
               source={xImg}
               size='20'
            />
         </PressableIcon>
         <Title>Sign Up</Title>
         <Formik
            initialValues={{
               name: '',
               email: '',
               password: '',
            }}
            validationSchema={Yup.object({
               name: Yup.string()
                  .min(2, 'Too Short')
                  .required('Required'),
               email: Yup.string()
                  .email('Wrong Email')
                  .required('Required'),
               password: Yup.string()
                  .required('Required'),
               confirmPassword: Yup.string()
                  .required('Required')
                  .oneOf([Yup.ref('password'), null], 'Passwords must match')
            })}
            onSubmit={({ name, email, password, confirmPassword}) => {
               setIsSignedIn(true)
               history.push('/user')
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
                     onSubmitEditing ={() => emailRef.current.focus()}
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