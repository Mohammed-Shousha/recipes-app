import React, { useContext, useState, useRef } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { launchImageLibrary } from 'react-native-image-picker'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { Container, RowContainer, ModalContainer } from '../../Components/Containers'
import { EditUserImage, Icon, UserImage, Exit } from '../../Components/Images'
import user from '../../Data/images/chef.png'
import edit from '../../Data/images/edit.png'
import { ErrorText, ProfileText, Text } from '../../Components/Texts'
import { ButtonText, StyledButton } from '../../Components/Buttons'
import { FormInput } from '../../Components/Inputs'
import { DataContext } from '../../Data/Context'
import xImg from '../../Data/images/x.png'
import { passwordRegex } from '../../Data/Database'


const EditProfile = ({ navigation }) => {

   const { userImage, setUserImage } = useContext(DataContext)
   const { userData, setUserData } = useContext(DataContext)
   const { email } = userData


   const HANDLE_UPLOADING_IMAGE = gql`
      mutation UploadImage($email: String!, $image: String!){
         UploadImage(email: $email, image: $image){
            id
            email
            image
         }
      }
	`

   const [UploadImage] = useMutation(HANDLE_UPLOADING_IMAGE, {
      onCompleted({ UploadImage }) {
         if (UploadImage.id) {
            //edit image entry in userData
         }
      }
   })


   let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (permissionResult.granted === false) {
         alert("Permission to access camera roll is required!")
         return
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync({ base64: true })

      let base64Img = `data:image/jpg;base64,${pickerResult.base64}`

      let data = {
         file: base64Img,
         upload_preset: 'recipes_preset'
      }

      const response = await fetch("https://api.cloudinary.com/v1_1/dn8thrc9l/image/upload", {
         method: "POST",
         body: JSON.stringify(data),
         headers: {
            'content-type': 'application/json'
         }
      })

      const { secure_url } = await response.json()
      setUserImage(secure_url)
   }


   const HANDLE_CHANGING_DATA = gql`
      mutation ChangeData($email: String!, $name: String!){
         ChangeData(email: $email, name: $name){
            ... on User{
               id
               name
               email
            }
            ... on Error{
               message
            }
         }
      }
	`

   const [ChangeData] = useMutation(HANDLE_CHANGING_DATA, {
      onCompleted({ ChangeData }) {
         const { id, name, email } = ChangeData
         if (id) {
            setUserData({
               name,
               email
            })
            navigation.navigate('User')
         } else {
            alert(ChangeData.message)
         }
      }
   })


   return (
      <Container>
         <RowContainer
            width='120px'
            noPadding
            center
         >
            <UserImage
               source={userImage ? { uri: userImage } : user}
            />
            <EditUserImage onPress={openImagePickerAsync}>
               <Icon
                  source={edit}
                  size='15'
               />
            </EditUserImage>
         </RowContainer>
         <Formik
            initialValues={{
               name: userData.name,
               email: userData.email,
            }}
            validationSchema={Yup.object({
               name: Yup.string()
                  .min(2, 'Too Short'),
               email: Yup.string()
            })}
            onSubmit={({ name, email }) => {
               ChangeData({
                  variables: {
                     name,
                     email: userData.email
                  }
               })
               UploadImage({
                  variables: {
                     email,
                     image: userImage
                  }
               })
            }}
         >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
               <>
                  <ProfileText size='28'>
                     Name
                  </ProfileText>
                  <FormInput
                     value={values.name}
                     onChangeText={handleChange('name')}
                  />
                  {errors.name && touched.name && <ErrorText>{errors.name}</ErrorText>}
                  <ProfileText size='28'>
                     Email
                  </ProfileText>
                  <FormInput
                     value={values.email}
                     editable={false}
                  />
                  <Text center size='15'>
                     you can't change your email
                  </Text>

                  <StyledButton
                     width='65%'
                     onPress={() => navigation.navigate('Change Password')}
                  >
                     <ButtonText size='28px' >
                        Change Password
                     </ButtonText>
                  </StyledButton>
                  <StyledButton
                     width='80%'
                     onPress={handleSubmit}
                  >
                     <ButtonText size='28px' >
                        Save
                     </ButtonText>
                  </StyledButton>
               </>
            )}
         </Formik>
      </Container>
   )
}

export default EditProfile