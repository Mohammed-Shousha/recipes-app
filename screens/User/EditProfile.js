import { useContext, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { ActivityIndicator } from 'react-native'

import {
  Container,
  RowContainer,
  LoadingContainer,
} from '@components/styles/Containers.styles.'

import {
  EditUserImage,
  Icon,
  UserImage,
} from '@components/styles/Images.styles'
import { ErrorText, ProfileText, Text } from '@components/styles/Texts.styles'
import { FormInput } from '@components/styles/Inputs.styles'

import { DataContext } from '@root/Context'

import { uploadImage } from '@utils/helpers'

import user from '@assets/images/chef.png'
import edit from '@assets/icons/edit.png'

import { HANDLE_CHANGING_DATA } from '@utils/graphql/mutations'
import { Button } from '@components'

export const EditProfile = ({ navigation }) => {
  const {
    userData: { name, email, image, password },
    setUserData,
  } = useContext(DataContext)

  const [userImage, setUserImage] = useState(image)
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(false)

  const activate = () => {
    setActive(true)
  }

  const deactivate = () => {
    setActive(false)
  }

  const handleChangePassword = () => {
    navigation.navigate('Change Password')
  }

  const [ChangeData] = useMutation(HANDLE_CHANGING_DATA, {
    onCompleted({ ChangeData }) {
      if (ChangeData.id) {
        const { name, email, image, password } = ChangeData
        setUserData((prevUserData) => ({
          ...prevUserData,
          email,
          name,
          image,
          password,
        }))
        navigation.navigate('User')
      } else {
        alert(ChangeData.message)
      }
    },
  })

  const handleFormSubmit = ({ name, email }) => {
    setLoading(true)
    // ChangeData({
    //   variables: {
    //     email,
    //     name,
    //     image: userImage,
    //   },
    // })
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return (
    <Container>
      <RowContainer width="120px" noPadding center>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="green" size="small" />
          </LoadingContainer>
        ) : (
          <>
            <UserImage
              source={
                userImage ? { uri: userImage } : image ? { uri: image } : user
              }
            />
            <EditUserImage
              onPress={() => uploadImage(setLoading, setUserImage)}
            >
              <Icon source={edit} size="15" />
            </EditUserImage>
          </>
        )}
      </RowContainer>
      <Formik
        initialValues={{
          name,
          email,
        }}
        validationSchema={Yup.object({
          name: Yup.string().min(2, 'Too Short'),
          email: Yup.string(),
        })}
        onSubmit={handleFormSubmit}
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
            <ProfileText size="28">Name</ProfileText>
            <FormInput
              value={values.name}
              onChangeText={handleChange('name')}
              onFocus={activate}
              onBlur={deactivate}
              active={active}
            />
            {errors.name && touched.name && (
              <ErrorText>{errors.name}</ErrorText>
            )}

            <ProfileText size="28">Email</ProfileText>
            <FormInput value={values.email} editable={false} />
            <Text center size="15">
              you can't change your email
            </Text>

            {password && (
              <Button onPress={handleChangePassword}>Change Password</Button>
            )}
            <Button
              onPress={handleSubmit}
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              Save
            </Button>
          </>
        )}
      </Formik>
    </Container>
  )
}
