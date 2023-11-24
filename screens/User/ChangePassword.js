import { useContext, useState, useRef } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'

import { Container } from '@components/styles/Containers.styles.'
import { ErrorText } from '@components/styles/Texts.styles'
import { FormInput } from '@components/styles/Inputs.styles'

import { DataContext } from '@root/Context'

import { passwordRegex } from '@utils/database'
import { HANDLE_CHANGING_PASSWORD } from '@utils/graphql/mutations'

import { Button } from '@components'

export const ChangePassword = ({ navigation }) => {
  const { userData } = useContext(DataContext)
  const { email } = userData

  const [passwordError, setPasswordError] = useState(null)
  const [active, setActive] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const passwordRef = useRef()
  const newPasswordRef = useRef()
  const confirmPasswordRef = useRef()

  const [ChangePassword] = useMutation(HANDLE_CHANGING_PASSWORD, {
    onCompleted({ ChangePassword }) {
      if (ChangePassword.name) {
        navigation.navigate('Edit Profile')
      } else if (ChangePassword.message) {
        setDisabled(false)
        setPasswordError(ChangePassword.message)
        setTimeout(() => setPasswordError(null), 3000)
      }
    },
  })

  const activateInput = (input) => {
    setActive(input)
  }

  const deactivateInput = () => {
    setActive(null)
  }

  return (
    <Container>
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
        onSubmit={({ password, newPassword }) => {
          setDisabled(true)
          ChangePassword({
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
          handleBlur,
          values,
          errors,
          touched,
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
            {passwordError && <ErrorText>{passwordError}</ErrorText>}

            <Button
              onPress={handleSubmit}
              disabled={disabled}
              loading={disabled}
            >
              Save
            </Button>
          </>
        )}
      </Formik>
    </Container>
  )
}

export default ChangePassword
