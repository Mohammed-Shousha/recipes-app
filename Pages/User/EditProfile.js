import React, { useContext, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { ActivityIndicator } from 'react-native'
import { Container, RowContainer } from '../../Components/Containers'
import { EditUserImage, Icon, LoadingContainer, UserImage } from '../../Components/Images'
import user from '../../Data/images/chef.png'
import edit from '../../Data/images/edit.png'
import { ErrorText, ProfileText, Text } from '../../Components/Texts'
import { ButtonText, StyledButton } from '../../Components/Buttons'
import { FormInput } from '../../Components/Inputs'
import { DataContext } from '../../Data/Context'


const EditProfile = ({ navigation }) => {

   const { userData, setUserData } = useContext(DataContext)
   const { image } = userData

   const [userImage, setUserImage] = useState(image)
   const [loading, setLoading] = useState(false)


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

      setLoading(true)
      const response = await fetch("https://api.cloudinary.com/v1_1/dn8thrc9l/image/upload", {
         method: "POST",
         body: JSON.stringify(data),
         headers: {
            'content-type': 'application/json'
         }
      })

      const { secure_url } = await response.json()
      setUserImage(secure_url)
      setLoading(false)
   }


   const HANDLE_CHANGING_DATA = gql`
      mutation ChangeData($email: String!, $name: String!, $image:String!){
         ChangeData(email: $email, name: $name, image: $image){
            ... on User{
               id
               name
               email
               image
            }
            ... on Error{
               message
            }
         }
      }
	`

   const [ChangeData] = useMutation(HANDLE_CHANGING_DATA, {
      onCompleted({ ChangeData }) {
         if (ChangeData.id) {
            const { name, email, image } = ChangeData
            setUserData({
               ...userData,
               email,
               name,
               image
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
            {loading ?
               <LoadingContainer>
                  <ActivityIndicator color='green' size='small' />
               </LoadingContainer>
               :
               <UserImage
                  source={userImage ? { uri: userImage } : image ? { uri: image } : user}
               />
            }
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
                     email,
                     name,
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