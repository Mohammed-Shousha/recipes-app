import { useState, useRef } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { ErrorText } from '@components/styles/Texts.styles'
import { FormInput } from '@components/styles/Inputs.styles'

import { useDataContext } from '@root/Context'

import { passwordRegex } from '@utils/database'
import useUserMutations from '@utils/hooks/useUserMutations'

import { Button } from '@components'

export const ChangePassword = () => {
  const { email } = useDataContext()

  const { changePassword, error } = useUserMutations()

  const [active, setActive] = useState(null)

  const passwordRef = useRef()
  const newPasswordRef = useRef()
  const confirmPasswordRef = useRef()

  const activateInput = (input) => setActive(input)

  const deactivateInput = () => setActive(null)

  return (
    <Formik
      initialValues={{
        password: '',
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object({
        password: Yup.string().required('Required'),
        newPassword: Yup.string()
          .required('Required')
          .matches(
            passwordRegex,
            'Password must contain at least one letter, at least one number, and be longer than 8 charaters'
          ),
        confirmPassword: Yup.string()
          .required('Required')
          .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
      })}
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
            onFocus={() => activateInput('password')}
            onBlur={deactivateInput}
            active={active === 'password'}
            returnKeyType="next"
            onSubmitEditing={() => newPasswordRef.current.focus()}
            ref={passwordRef}
          />
          {errors.password && touched.password && (
            <ErrorText>{errors.password}</ErrorText>
          )}
          <FormInput
            placeholder="New Password"
            value={values.newPassword}
            secureTextEntry
            onChangeText={handleChange('newPassword')}
            onFocus={() => activateInput('newPassword')}
            onBlur={deactivateInput}
            active={active === 'newPassword'}
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
            onFocus={() => activateInput('confirmPassword')}
            onBlur={deactivateInput}
            active={active === 'confirmPassword'}
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
