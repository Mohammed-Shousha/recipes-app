import { useRef, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { ErrorText } from '@components/styles/Texts.styles'
import { FormInput } from '@components/styles/Inputs.styles'

import { googleIcon } from '@assets/icons'

import { useUserMutations, useGoogleAuth } from '@hooks'

import { passwordRegex } from '@utils/database'

import { LoadingDisplay, Button } from '@components'

export const Register = () => {
  const { register, error } = useUserMutations()
  const { handleGoogleAuth, loading } = useGoogleAuth()

  const [active, setActive] = useState(null)

  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

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
      onSubmit={async ({ name, email, password }) => {
        await register({
          variables: {
            name: name.trim(),
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
        isSubmitting,
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
          {error && <ErrorText>{error}</ErrorText>}

          <Button onPress={handleSubmit} disabled={isSubmitting}>
            Register
          </Button>
          <Button
            onPress={handleGoogleAuth}
            icon={googleIcon}
            style={{ width: '70%', iconSize: '28' }}
            secondary
          />
        </>
      )}
    </Formik>
  )
}
