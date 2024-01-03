import { Formik } from 'formik'
import { ActivityIndicator } from 'react-native'

import {
  RowContainer,
  LoadingContainer,
} from '@components/styles/Containers.styles'
import {
  EditUserImage,
  Icon,
  UserImage,
} from '@components/styles/Images.styles'
import {
  ErrorText,
  ProfileText,
  StyledText,
} from '@components/styles/Texts.styles'

import { editProfileSchema } from '@utils/validationSchemas'

import { useDataState } from '@context'

import { useImageUploader, useUserMutations } from '@hooks'

import user from '@assets/images/chef.png'
import edit from '@assets/icons/edit.png'

import { Button, FormInput } from '@components'

export const EditProfile = ({ navigation }) => {
  const { name, email, image, password } = useDataState()

  const { changeData } = useUserMutations()

  const { loading, image: userImage, uploadImage } = useImageUploader(image)

  const handleChangePassword = () => {
    navigation.navigate('Change Password')
  }

  return (
    <>
      <RowContainer style={{ width: 'auto' }}>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator color="green" size="small" />
          </LoadingContainer>
        ) : (
          <>
            <UserImage source={userImage ? { uri: userImage } : user} />
            <EditUserImage onPress={uploadImage}>
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
        validationSchema={editProfileSchema}
        onSubmit={async ({ name, email }) => {
          await changeData({
            variables: {
              email,
              name,
              image: userImage,
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
            <ProfileText size="28">Name</ProfileText>
            <FormInput
              value={values.name}
              onChangeText={handleChange('name')}
            />
            {errors.name && touched.name && (
              <ErrorText>{errors.name}</ErrorText>
            )}

            <ProfileText size="28">Email</ProfileText>
            <FormInput value={values.email} editable={false} />
            <StyledText center size="15">
              you can't change your email
            </StyledText>

            {password && (
              <Button onPress={handleChangePassword}>Change Password</Button>
            )}
            <Button onPress={handleSubmit} disabled={isSubmitting}>
              Save
            </Button>
          </>
        )}
      </Formik>
    </>
  )
}
