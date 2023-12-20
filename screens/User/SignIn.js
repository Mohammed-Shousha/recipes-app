import { useRef, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { ErrorText } from '@components/styles/Texts.styles'
import { FormInput } from '@components/styles/Inputs.styles'

import { googleIcon } from '@assets/icons'

import useGoogleAuth from '@utils/hooks/useGoogleAuth'
import useUserMutations from '@utils/hooks/useUserMutations'

import { LoadingDisplay, Button } from '@components'

export const SignIn = () => {
  const { signIn, error } = useUserMutations()

  const [active, setActive] = useState(null)

  const passwordRef = useRef()

  const { handleGoogleAuth, loading } = useGoogleAuth()

  if (loading) return <LoadingDisplay />

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().trim().email('Wrong Email').required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={async ({ email, password }) => {
        await signIn({
          variables: {
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
            placeholder="Email"
            value={values.email}
            autoFocus={false}
            onChangeText={handleChange('email')}
            onFocus={() => setActive('email')}
            onBlur={() => {
              setActive(false)
              handleBlur('email')
            }}
            active={active === 'email'}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
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
            returnKeyType="done"
            ref={passwordRef}
          />
          {errors.password && touched.password && (
            <ErrorText>{errors.password}</ErrorText>
          )}
          {error && <ErrorText>{error}</ErrorText>}

          <Button
            onPress={handleSubmit}
            style={{ width: '70%', fontSize: '24px' }}
            disabled={isSubmitting}
          >
            Sign In
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
