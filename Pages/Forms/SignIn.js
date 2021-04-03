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


const SignIn = () => {

   const { setIsSignedIn } = useContext(DataContext)
   const [active, setActive] = useState()
   const history = useHistory()
   const passwordRef = useRef()


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
         <Title>Sign In</Title>
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
            onSubmit={({email, password}) =>{
               setIsSignedIn(true)
               history.push('/user')
            }}
         >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched }) => (
               <>
                  <FormInput
                     placeholder='Email'
                     value={values.email}
                     autoFocus={true}
                     onChangeText={handleChange('email')}
                     onFocus={() => setActive('email')}
                     onBlur={() => setActive(false)}
                     onBlur={handleBlur('email')}
                     active={active=== 'email'? true : false}
                     returnKeyType='next'
                     onSubmitEditing ={() => passwordRef.current.focus()}
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