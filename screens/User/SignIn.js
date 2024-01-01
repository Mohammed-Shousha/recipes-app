import { useRef } from 'react'
import { Formik } from 'formik'

import { ErrorText } from '@components/styles/Texts.styles'

import { googleIcon } from '@assets/icons'

import { signInSchema } from '@utils/validationSchemas'

import { useGoogleAuth, useUserMutations } from '@hooks'

import { LoadingDisplay, Button, FormInput } from '@components'

export const SignIn = () => {
  const { signIn, error } = useUserMutations()
  const { handleGoogleAuth, loading } = useGoogleAuth()

  const passwordRef = useRef()

  if (loading) return <LoadingDisplay />

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={signInSchema}
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
