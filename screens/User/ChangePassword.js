import { useRef } from 'react'
import { Formik } from 'formik'

import { ErrorText } from '@components/styles/Texts.styles'

import { useDataState } from '@context'

import { useUserMutations } from '@hooks'

import { Button, FormInput } from '@components'

import { changePasswordSchema } from '@utils/validationSchemas'

export const ChangePassword = () => {
  const { email } = useDataState()

  const { changePassword, error } = useUserMutations()

  const newPasswordRef = useRef()
  const confirmPasswordRef = useRef()

  return (
    <Formik
      initialValues={{
        password: '',
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={changePasswordSchema}
      onSubmit={async ({ password, newPassword }) => {
        await changePassword({
          variables: {
            email,
            password,
            newPassword,
          },
        })
      }}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <>
          <FormInput
            placeholder="Current Password"
            value={values.password}
            secureTextEntry
            onChangeText={handleChange('password')}
            returnKeyType="next"
            onSubmitEditing={() => newPasswordRef.current.focus()}
          />
          {errors.password && touched.password && (
            <ErrorText>{errors.password}</ErrorText>
          )}

          <FormInput
            placeholder="New Password"
            value={values.newPassword}
            secureTextEntry
            onChangeText={handleChange('newPassword')}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            ref={newPasswordRef}
          />
          {errors.newPassword && touched.newPassword && (
            <ErrorText>{errors.newPassword}</ErrorText>
          )}

          <FormInput
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            secureTextEntry
            returnKeyType="done"
            ref={confirmPasswordRef}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <ErrorText>{errors.confirmPassword}</ErrorText>
          )}
          {error && <ErrorText>{error}</ErrorText>}

          <Button onPress={handleSubmit} disabled={isSubmitting}>
            Save
          </Button>
        </>
      )}
    </Formik>
  )
}

export default ChangePassword
